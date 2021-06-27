import React, { useEffect, ReactNode, useState } from 'react';
import { useTypedDispatch, useTypedSelector } from 'store';

import Header from 'components/Header';
import Chat from 'components/Chat';

import { handleAutoLogin } from 'store/user/thunkActions';
import apiClient from 'utils/apiClient';
import { Paginated } from '@feathersjs/feathers';
import { IUser, IChat } from 'types';
import { getRandomInteger } from 'utils';
import { setChatId, setCurrentChat } from 'store/core';
import { initPeer } from 'store/core/thunkActions';

export const MainLayout = (props: { children: ReactNode }) => {
  const dispatch = useTypedDispatch();

  const user = useTypedSelector((state) => state.user.user);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const init = async () => {
      // @ts-ignore
      await dispatch(handleAutoLogin());
      // await connectToOperator();
      setIsLoading(false);
    };
    init();
  }, [dispatch]);

  useEffect(() => {
    const connectToOperator = async () => {
      const chatResult: Paginated<IChat> = await apiClient.service('chats').find({
        query: {
          $limit: 1,
          clientId: user._id,
        },
      });
      if (chatResult.total > 0) {
        const chat = chatResult.data[0];
        console.log('chat', chat);

        dispatch(setChatId(chat._id));
        dispatch(setCurrentChat(chat));
        return;
      }

      const { data: idleOperators }: Paginated<IUser> = await apiClient.service('users').find({
        query: {
          role: {
            $in: ['operator', 'admin'],
            // 'operator'
          },
          // isOnline: true,
          // isBusy: false,
        },
      });
      console.log('operatotottoto', idleOperators);

      if (idleOperators.length === 0) return;

      // const randomInteger = getRandomInteger(0, idleOperators.length - 1);
      const randomInteger = getRandomInteger(0, idleOperators.length);
      const randomIdleOperator = idleOperators[randomInteger];
      console.log('conect', randomIdleOperator);

      try {
        const newChat: IChat = await apiClient.service('chats').create({
          clientId: user._id,
          operatorId: randomIdleOperator._id,
        });
        dispatch(setChatId(newChat._id));
        dispatch(setCurrentChat(newChat));
      } catch (e) {
        console.error('Error while creating chat', e);
      }
    };

    const doEverything = async () => {
      await connectToOperator();
      // @ts-ignore
      dispatch(initPeer());
    };
    if (user?._id) {
      doEverything();
    }
  }, [dispatch, user]);

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="main-layout">
      <Header />
      {props.children}

      <Chat />
    </div>
  );
};

export default MainLayout;

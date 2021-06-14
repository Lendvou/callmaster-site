import React, { useEffect, useState, useMemo, useRef } from 'react';
import ChatBox, { ChatFrame } from 'react-chat-plugin';
import apiClient from 'utils/apiClient';
import { useTypedSelector } from 'store';
import { IMessage } from 'types';
import { arrayHasItems } from 'utils';
import UploadFile from 'components/UploadFile';
import { setTimeout } from 'timers';
import Calls from 'components/Calls';

const Chat = () => {
  const chatRef = useRef<null>(null);

  const chatId = useTypedSelector((state) => state.core.chatId);
  const user = useTypedSelector((state) => state.user.user);
  const currentChat = useTypedSelector((state) => state.core.currentChat);

  const [messages, setMessages] = useState<IMessage[]>([]);

  const messagesList = useMemo(() => {
    return messages.map((item) => {
      const username =
        item.authorRole === 'operator' ? item.user.firstName + item.user.lastName : 'Вы';
      const userAvatarPath = item.user.avatar?.path;
      const photos = arrayHasItems(item.photos)
        ? item.photos.map((photo) => ({
            type: 'URL',
            title: <img src={photo.path} alt={photo.filename} className="chat__photo" />,
            payload: photo.path,
          }))
        : [];

      return {
        text: item.text,
        timestamp: new Date(item.createdAt).getTime(),
        type: 'text',
        author: {
          username,
          id: item.user._id,
          avatarUrl: userAvatarPath,
        },
        buttons: photos,
      };
    });
  }, [messages]);

  const sendMessage = async (mes: any) => {
    const data = {
      chatId,
      userId: user._id,
      text: mes,
      type: 'text',
      authorRole: 'client',
    };
    await apiClient.service('messages').create(data);
  };
  const uploadFile = async (photoId: string) => {
    console.log('uplaod file', photoId);

    const data = {
      chatId,
      userId: user._id,
      text: '',
      type: 'photo',
      authorRole: 'client',
      photosIds: [photoId],
    };
    await apiClient.service('messages').create(data);
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      // @ts-ignore
      chatRef?.current?.scrollToBottom?.();
    }, 500);
  };

  useEffect(() => {
    const receiveMessage = (message: IMessage) => {
      console.log('receive message', message);

      if (message.chatId === chatId) {
        const newMessages = messages.concat(message);
        setMessages(newMessages);
        scrollToBottom();
      }
    };

    apiClient.service('messages').on('created', receiveMessage);

    return () => {
      apiClient.service('messages').removeListener('created', receiveMessage);
    };
  }, [messages, chatId]);

  useEffect(() => {
    const fetchMessages = async () => {
      const query = {
        $limit: 100,
        $sort: { createdAt: 1 },
        chatId,
      };
      const result = await apiClient.service('messages').find({ query });
      console.log('fetch messages', result);

      setMessages(result.data);
      scrollToBottom();
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__left">
          {currentChat?.operator?.avatar?.path && (
            <img
              src={currentChat.operator.avatar.path}
              alt="avatar"
              className="chat__operator-avatar"
            />
          )}
          <span className="chat__name">
            {currentChat?.operator?.firstName} {currentChat?.operator?.lastName}
          </span>
        </div>

        <Calls />
        {/* <PhoneOutlined
          className={clsx('chat__phone', {
            'chat__phone--close': false,
          })}
          onClick={scrollToBottom}
          // onClick={currentCall ? () => currentCall.close() : onCallUser}
        /> */}
      </div>

      <ChatBox
        ref={chatRef}
        messages={messagesList}
        userId={user._id}
        onSendMessage={sendMessage}
        width={'400px'}
        height={'500px'}
      />

      <UploadFile
        className="chat__input-send"
        onUploadFile={uploadFile}
        // onClick={() => sendMessage()}
      />
    </div>
  );
};

export default Chat;

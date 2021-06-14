import React, { useRef, useEffect, useState } from 'react';
import { PhoneOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import Peer from 'peerjs';
import { useTypedSelector } from 'store';

import { objectHasProperties } from 'utils';

const Calls = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const chat = useTypedSelector((state) => state.core.currentChat);
  const peer = useTypedSelector((state) => state.core.peer);

  const [currentCall, setCurrentCall] = useState<Peer.MediaConnection | null>(null);
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false);

  const connectToUser = async () => {
    if (!chat.operatorId) return;
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    console.log('strem', stream);
    const call = peer.call(chat.operatorId, stream);
    call.on('stream', (userAudioStream) => {
      const audioEl = audioRef.current;
      addAudioStream(audioEl!, userAudioStream);
      setCurrentCall(call);
    });
  };

  const closeCall = () => {
    if (currentCall) {
      currentCall?.close();
      setCurrentCall(null);
      if (isModalOpened) {
        setIsModalOpened(false);
      }
    }
  };

  useEffect(() => {
    if (!objectHasProperties(peer)) return;

    const onPeerCall = async (call: Peer.MediaConnection) => {
      const response = window.confirm(
        `Оператор ${chat.operator?.firstName} ${chat.operator?.lastName} звонит вам, ответить?`
      );
      if (!response) return;

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      call.answer(stream);
      setCurrentCall(call);
      call.on('stream', (userAudioStream) => {
        const audioEl = audioRef.current;
        addAudioStream(audioEl!, userAudioStream);
      });
      call.on('close', () => {
        setCurrentCall(null);
      });
    };

    peer.on('call', onPeerCall);

    return () => {
      peer.off('call', onPeerCall);
    };
  }, [peer]);

  return (
    <div>
      <audio ref={audioRef} />

      <PhoneOutlined
        className={clsx('chat__phone', {
          'chat__phone--close': !!currentCall,
        })}
        onClick={!!currentCall ? closeCall : connectToUser}
      />
    </div>
  );
};

export default Calls;

function addAudioStream(audio: HTMLAudioElement, stream: MediaStream) {
  audio.srcObject = stream;
  audio.addEventListener('loadedmetadata', () => {
    audio.play();
  });
}

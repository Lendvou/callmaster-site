import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Peer from 'peerjs';
import { IChat } from 'types';

export interface ICoreState {
  peer: Peer;
  chatId: string | null;
  currentChat: Partial<IChat>;
}

const initialState: ICoreState = {
  peer: {} as Peer,
  chatId: null,
  currentChat: {},
};

const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    setPeer: (state, { payload }: PayloadAction<ICoreState['peer']>) => {
      state.peer = payload;
    },
    setChatId: (state, { payload }: PayloadAction<ICoreState['chatId']>) => {
      state.chatId = payload;
    },
    setCurrentChat: (state, { payload }: PayloadAction<ICoreState['currentChat']>) => {
      state.currentChat = payload;
    },
  },
});

export const { setPeer, setChatId, setCurrentChat } = coreSlice.actions;

export default coreSlice.reducer;

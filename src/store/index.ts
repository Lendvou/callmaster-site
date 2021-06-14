import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

import { RootState } from 'store/types';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    const serializableCheck = {
      // Ignore these action types
      ignoredActions: ['core/setPeer'],
    };
    return getDefaultMiddleware({ serializableCheck });
  },
});

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTypedDispatch: () => typeof store.dispatch = useDispatch;

export default store;

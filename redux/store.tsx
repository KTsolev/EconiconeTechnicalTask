import {configureStore} from '@reduxjs/toolkit';
import {todoSlice} from '../Screens/Todos/Todoslice/TodoSlice';
import logger from 'redux-logger';

const store = configureStore({
  reducer: {
    totosReducer: todoSlice.reducer,
  },
  middleware: [logger],
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

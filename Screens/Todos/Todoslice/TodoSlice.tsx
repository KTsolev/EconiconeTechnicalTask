import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TodoModel} from '../Models/TodoModel';
import {TodoState} from '../Models/TodoState';
import {isCompleted} from './TodoSelectors';

const initialState: TodoState = {
  todos: [
    new TodoModel('l28uy38p', 'Fix ability to display all tasks', false, false),
    new TodoModel(
      'l28uy38l',
      'Fix a layout, checkbox should be listed in a column',
      false,
      false,
    ),
    new TodoModel('l28uy38o', 'Fix ability to togle a task', true, false),
    new TodoModel('l28uy36m', 'Fix ability to delete task', true, false),
    new TodoModel(
      'l28uy39d',
      'Fix ability to count completed task',
      true,
      false,
    ),
  ],
  completed: 3,
};

export const todoSlice = createSlice({
  name: 'todod',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<any>) => {
      state.todos.push(action.payload);
      state.completed = state.todos.filter(isCompleted).length;
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(item => item.id !== action.payload);
      state.completed = state.todos.filter(isCompleted).length;
    },
    completeTodo: (state, action: PayloadAction<UserCompleteAction>) => {
      state.todos = state.todos.map(item => {
        if (item.id === action.payload.id) {
          item.completed = action.payload.value;
        }
        return item;
      });
      state.completed = state.todos.filter(isCompleted).length;
    },
    editTodo: (state, action: PayloadAction<any>) => {
      state.todos = state.todos.map(item => {
        if (item.id === action.payload.id) {
          item = {...item, ...action.payload};
        }
        return item;
      });
      state.completed = state.todos.filter(isCompleted).length;
    },
  },
});

export const {addTodo, removeTodo, completeTodo, editTodo} = todoSlice.actions;

export type UserCompleteAction = {
  id: string;
  value: boolean;
};

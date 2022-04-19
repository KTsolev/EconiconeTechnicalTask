import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TodoModel} from '../Models/TodoModel';
import {TodoState} from '../Models/TodoState';
import {isCompleted} from './TodoSelectors';

const initialState: TodoState = {
  todos: [
    new TodoModel(1, 'Fix ability to display all tasks', false, false),
    new TodoModel(
      2,
      'Fix a layout, checkbox should be listed in a column',
      false,
      false,
    ),
    new TodoModel(3, 'Fix ability to togle a task', true, false),
    new TodoModel(4, 'Fix ability to delete task', true, false),
    new TodoModel(5, 'Fix ability to count completed task', true, false),
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
    removeTodo: (state, action: PayloadAction<number>) => {
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
    // edit: (state, action: PayloadAction<number>) => {
    //     state.value -= 1;
    // },
  },
});

export const {addTodo, removeTodo, completeTodo} = todoSlice.actions;

export type UserCompleteAction = {
  id: number;
  value: boolean;
};

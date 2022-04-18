import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../redux/store';
import {TodoModel} from './Model/TodoModel';

export interface TodoState {
  todos: Array<TodoModel>;
  completed: number;
}

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
    add: (state, action: PayloadAction<any>) => {
      state.todos.push(action.payload);
      state.completed = state.todos.filter(isCompleted).length;
    },
    remove: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(item => item.id !== action.payload);
      state.completed = state.todos.filter(isCompleted).length;
    },
    complete: (state, action: PayloadAction<UserCompleteAction>) => {

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

export const {add, remove, complete} = todoSlice.actions;

export const getTodos = (state: RootState): TodoModel[] =>
  state.totosReducer.todos;
export const getDoneTodos = (state: RootState): TodoModel[] =>
  state.totosReducer.todos.filter(isCompleted);

const isCompleted = (item: TodoModel) => item.completed === true;

export type UserCompleteAction = {
  id: number;
  value: boolean;
};

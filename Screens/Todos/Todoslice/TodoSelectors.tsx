import {RootState} from '../../../redux/store';
import {TodoModel} from '../Models/TodoModel';

export const getTodos = (state: RootState): TodoModel[] =>
  state.totosReducer.todos;

export const getDoneTodos = (state: RootState): TodoModel[] =>
  state.totosReducer.todos.filter(isCompleted);

export const getNotDoneTodos = (state: RootState): TodoModel[] =>
  state.totosReducer.todos.filter(isNotCompleted);

export const isCompleted = (item: TodoModel) => item.completed === true;

export const isNotCompleted = (item: TodoModel) => item.completed === false;

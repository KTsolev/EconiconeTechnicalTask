import {TodoModel} from './TodoModel';

export interface TodoState {
  todos: Array<TodoModel>;
  completed: number;
}

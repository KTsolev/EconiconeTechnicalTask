import {TodoModel} from '../Screens/Todos/Models/TodoModel';

export const emptyState = {
  todos: [],
  completed: 0,
};

export const withOneTodo = {
  todos: [
    new TodoModel('l28uy38p', 'Fix ability to display all tasks', false, false),
  ],
  completed: 0,
};

export const withOneCompletedTodo = {
  todos: [
    new TodoModel('l28uy38p', 'Fix ability to display all tasks', true, false),
  ],
  completed: 1,
};

export const withOneEditedTodo = {
  todos: [new TodoModel('l28uy38p', 'sampleTask1', true, false)],
  completed: 1,
};

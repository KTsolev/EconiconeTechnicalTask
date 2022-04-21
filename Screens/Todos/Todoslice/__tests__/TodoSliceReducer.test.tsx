import {TodoModel} from '../../Models/TodoModel';
import {
  addTodo,
  completeTodo,
  editTodo,
  todoSlice,
  removeTodo,
} from '../TodoSlice';
import * as States from '../../../../__mocks__/todosStateMocks';

describe('Todo slice test', () => {
  it('should set handle addTodo', () => {
    let state = todoSlice.reducer(
      States.emptyState,
      addTodo(
        new TodoModel(
          'l28uy38p',
          'Fix ability to display all tasks',
          false,
          false,
        ),
      ),
    );
    expect(state).toEqual(States.withOneTodo);
  });
  it('should set handle completeTodo', () => {
    let state = todoSlice.reducer(
      States.withOneTodo,
      completeTodo({id: 'l28uy38p', value: true}),
    );
    expect(state).toEqual(States.withOneCompletedTodo);
  });
  it('should set handle removeTodo', () => {
    let state = todoSlice.reducer(States.withOneTodo, removeTodo('l28uy38p'));
    expect(state).toEqual(States.emptyState);
  });
  it('should set handle editTodo', () => {
    let state = todoSlice.reducer(
      States.withOneTodo,
      editTodo(new TodoModel('l28uy38p', 'sampleTask1', true, false)),
    );
    expect(state).toEqual(States.withOneEditedTodo);
  });
});

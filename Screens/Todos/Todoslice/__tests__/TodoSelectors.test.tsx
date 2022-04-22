import * as Selectors from '../TodoSelectors';
import {todos} from '../../../../__mocks__/todos.mock';
import {RootState} from '../../../../redux/store';

describe('Todos Selectors tests', () => {
  it('returns the items from a todo list', () => {
    const state = {
      todosReducer: {
        todos: todos,
        completed: 3,
      },
    };
    expect(Selectors.getTodos(state as unknown as RootState)).toEqual(todos);
  });
  it('returns the completed items from a todo list', () => {
    const state = {
      todosReducer: {
        todos: todos,
        completed: 3,
      },
    };

    expect(Selectors.getDoneTodos(state as unknown as RootState)).toEqual(
      todos.filter(Selectors.isCompleted),
    );
  });
  it('returns the not completed items from a todo list', () => {
    const state = {
      todosReducer: {
        todos: todos,
        completed: 3,
      },
    };
    expect(Selectors.getNotDoneTodos(state as unknown as RootState)).toEqual(
      todos.filter(Selectors.isNotCompleted),
    );
  });
});

import {addTodo, removeTodo, completeTodo, editTodo} from '../TodoSlice';
import configureMockStore, {MockStoreEnhanced} from 'redux-mock-store';
import {todos} from '../../../../__mocks__/todos.mock';
import {Middleware, Dispatch, AnyAction} from 'redux';

const middlewares: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined = [];
const mockStore = configureMockStore(middlewares);
const initialState = {
  todos: [],
  completed: 0,
};

let store: MockStoreEnhanced<any, {}>, action, expectedAction;

describe('todos actions tests', () => {
  beforeEach(() => {
    store = mockStore(initialState);
  });

  it('should dispatch addTodo', () => {
    store.dispatch(addTodo(todos[1]));
    action = store.getActions();
    expectedAction = [{type: 'todos/addTodo', payload: todos[1]}];
    expect(action).toEqual(expectedAction);
  });
  it('should dispatch removeTodo', () => {
    store.dispatch(removeTodo(todos[2].id));
    action = store.getActions();
    expectedAction = [{type: 'todos/removeTodo', payload: todos[2].id}];
    expect(action).toEqual(expectedAction);
  });
  it('should dispatch completeTodo', () => {
    store.dispatch(completeTodo({id: todos[4].id, value: true}));
    action = store.getActions();
    expectedAction = [
      {type: 'todos/completeTodo', payload: {id: todos[4].id, value: true}},
    ];
    expect(action).toEqual(expectedAction);
  });
  it('should dispatch editTodo', () => {
    store.dispatch(editTodo(todos[4].id));
    action = store.getActions();
    expectedAction = [{type: 'todos/editTodo', payload: todos[4].id}];
    expect(action).toEqual(expectedAction);
  });
});

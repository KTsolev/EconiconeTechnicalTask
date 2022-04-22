import React from 'react';
import {TodoList} from '../TodoList';
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react-native';
import {todos} from '../../../../__mocks__/todos.mock';
import * as redux from 'react-redux';

const mockDispatchFn = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector: any) => selector,
  useDispatch: () => mockDispatchFn,
}));

jest.mock('../../Todoslice/TodoSelectors.tsx', () => ({
  getTodos: jest.fn(),
  getDoneTodos: jest.fn(),
  getNotDoneTodos: jest.fn(),
}));

let spyOnUseSelector: jest.SpyInstance<
  unknown,
  [
    selector: (state: unknown) => unknown,
    equalityFn?: redux.EqualityFn<unknown> | undefined,
  ]
>;
let spyOnUseDispatch;
let mockDispatch;

describe('TodoList tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // Mock useSelector hook
    spyOnUseSelector = jest.spyOn(redux, 'useSelector');

    // Mock useDispatch hook
    spyOnUseDispatch = jest.spyOn(redux, 'useDispatch');
    // Mock dispatch function returned from useDispatch
    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render empty list', async () => {
    spyOnUseSelector.mockReturnValue([]);

    const tree = renderer.create(<TodoList />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render list with todos', async () => {
    spyOnUseSelector.mockReturnValue(todos);

    const tree = renderer.create(<TodoList />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should render list with completed todos', async () => {
    spyOnUseSelector.mockReturnValue(todos);

    const {getByTestId, toJSON} = render(<TodoList />);
    const button = getByTestId('done');
    fireEvent.press(button);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render list with not completed todos', async () => {
    spyOnUseSelector.mockReturnValue(todos);

    const {getByTestId, toJSON} = render(<TodoList />);
    const button = getByTestId('not-done');
    fireEvent.press(button);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render list with all todos', async () => {
    spyOnUseSelector.mockReturnValue(todos);

    const {getByTestId, toJSON} = render(<TodoList />);
    const button = getByTestId('all');
    fireEvent.press(button);
    expect(toJSON()).toMatchSnapshot();
  });

  it('should call toggleEditTask after edit of task', () => {
    spyOnUseSelector.mockReturnValue(todos);

    const {getAllByTestId, getByTestId, toJSON} = render(<TodoList />);

    const toggleEditButton = getAllByTestId('edit')[2];
    const input = getByTestId('input');
    const editbutton = getByTestId('createButton');

    fireEvent.press(toggleEditButton);
    fireEvent.changeText(input, 'sample task1');
    fireEvent.press(editbutton);
    expect(toJSON()).toMatchSnapshot();
  });
});

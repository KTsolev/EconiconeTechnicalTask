import React from 'react';
import {TodoItem} from '../TodoItem';
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react-native';
import {todos} from '../../../../../__mocks__/todos.mock';

const mockDispatchFn = jest.fn();
const mockToggleEditTask = jest.fn();

jest.mock('uniqid', () => () => '1911caln7e0l28wbt2j');

jest.mock('react-redux', () => ({
  useSelector: (selector: () => any) => selector(),
  useDispatch: () => mockDispatchFn,
}));

describe('AddNewItem tests', () => {
  it('should render component', async () => {
    const tree = renderer.create(
      <TodoItem
        key={2}
        item={todos[2]}
        index={2}
        isReadOnly={false}
        toggleEditTask={mockToggleEditTask}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('should handle case when item is null', async () => {
    const tree = renderer.create(
      <TodoItem
        key={2}
        item={null}
        index={2}
        isReadOnly={false}
        toggleEditTask={mockToggleEditTask}
      />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it('should handle complete task', async () => {
    const {getByTestId, toJSON} = render(
      <TodoItem
        key={2}
        item={todos[2]}
        index={2}
        isReadOnly={false}
        toggleEditTask={mockToggleEditTask}
      />,
    );
    const checkBox = getByTestId('complete');
    fireEvent(checkBox, 'onValueChange', {nativeEvent: {}});

    expect(toJSON()).toMatchSnapshot();
    expect(mockDispatchFn).toHaveBeenCalledWith({
      payload: {
        id: 'l28uy38o',
        value: {
          nativeEvent: {},
        },
      },
      type: 'todos/completeTodo',
    });
  });

  it('should handle delete task', async () => {
    const {getByTestId, toJSON} = render(
      <TodoItem
        key={2}
        item={todos[2]}
        index={2}
        isReadOnly={false}
        toggleEditTask={mockToggleEditTask}
      />,
    );
    const button = getByTestId('delete');
    fireEvent.press(button);

    expect(toJSON()).toMatchSnapshot();
    expect(mockDispatchFn).toHaveBeenCalledWith({
      payload: 'l28uy38o',
      type: 'todos/removeTodo',
    });
  });

  it('should handle edit task', async () => {
    const {getByTestId, toJSON} = render(
      <TodoItem
        key={2}
        item={todos[2]}
        index={2}
        isReadOnly={false}
        toggleEditTask={mockToggleEditTask}
      />,
    );
    const button = getByTestId('edit');
    fireEvent.press(button);

    expect(toJSON()).toMatchSnapshot();
    expect(mockToggleEditTask).toHaveBeenCalled();
  });

  it('should handle case readOnly task', async () => {
    const {toJSON} = render(
      <TodoItem
        key={2}
        item={todos[2]}
        index={2}
        isReadOnly={true}
        toggleEditTask={mockToggleEditTask}
      />,
    );

    expect(toJSON()).toMatchSnapshot();
  });

  it('should handle call mockToggleEditTask task', async () => {
    const {getByTestId, toJSON} = render(
      <TodoItem
        key={2}
        item={todos[2]}
        index={2}
        isReadOnly={true}
        toggleEditTask={mockToggleEditTask}
      />,
    );

    const input = getByTestId('input');
    const button = getByTestId('createButton');

    fireEvent.changeText(input, 'sampletask');
    fireEvent.press(button);

    expect(toJSON()).toMatchSnapshot();
    expect(mockToggleEditTask).toHaveBeenCalled();
  });
});

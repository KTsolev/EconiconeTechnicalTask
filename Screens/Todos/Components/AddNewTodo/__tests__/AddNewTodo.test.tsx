import React from 'react';
import {AddNewItem} from '../AddNewTodo';
import renderer from 'react-test-renderer';
import {fireEvent, render} from '@testing-library/react-native';
import {TodoModel} from '../../../Models/TodoModel';
import {todos} from '../../../../../__mocks__/todos.mock';

const mockDispatchFn = jest.fn();
const mockCloseEdit = jest.fn();

jest.mock('uniqid', () => () => '1911caln7e0l28wbt2j');

jest.mock('react-redux', () => ({
  useSelector: (selector: () => any) => selector(),
  useDispatch: () => mockDispatchFn,
}));

describe('AddNewItem tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render component', async () => {
    const tree = renderer.create(<AddNewItem />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should handle user input', async () => {
    const {getByTestId, toJSON} = render(<AddNewItem />);
    const input = getByTestId('input');
    fireEvent.changeText(input, 'sampleTask4');
    expect(toJSON()).toMatchSnapshot();
  });

  it('should handle error after incorrect user input', async () => {
    const {getByTestId, toJSON} = render(<AddNewItem />);
    const input = getByTestId('input');
    const button = getByTestId('createButton');

    fireEvent.changeText(input, '');
    fireEvent.press(button);
    expect(toJSON()).toMatchSnapshot();
    expect(mockDispatchFn).not.toHaveBeenCalled();
  });

  it('should handle check for errors after incorrect user input', async () => {
    const {getByTestId, toJSON} = render(<AddNewItem />);
    const input = getByTestId('input');
    fireEvent.changeText(input, '');
    fireEvent(input, 'onBlur', {nativeEvent: {}});

    expect(toJSON()).toMatchSnapshot();
    expect(mockDispatchFn).not.toHaveBeenCalled();
  });

  it('should handle check for errors after incorrect user input and then correct is given', async () => {
    const {getByTestId, toJSON} = render(<AddNewItem />);
    const input = getByTestId('input');
    fireEvent.changeText(input, '');
    fireEvent(input, 'onBlur', {nativeEvent: {}});
    fireEvent.changeText(input, 'samplee task 2');
    fireEvent(input, 'onBlur', {nativeEvent: {}});

    expect(toJSON()).toMatchSnapshot();
    expect(mockDispatchFn).not.toHaveBeenCalled();
  });

  it('should remove error due to incorrect user input, after correct one is given', async () => {
    const {getByTestId, toJSON} = render(<AddNewItem />);
    const input = getByTestId('input');
    const button = getByTestId('createButton');

    fireEvent.changeText(input, '');
    fireEvent.press(button);
    fireEvent.changeText(input, 'sampletask22');

    expect(toJSON()).toMatchSnapshot();
    expect(mockDispatchFn).not.toHaveBeenCalled();
  });

  it('should handle add new after correct user input', async () => {
    const {getByTestId, toJSON} = render(<AddNewItem />);
    const input = getByTestId('input');
    const button = getByTestId('createButton');

    fireEvent.changeText(input, 'sample task 1');
    fireEvent.press(button);
    expect(toJSON()).toMatchSnapshot();
    expect(mockDispatchFn).toHaveBeenCalledWith({
      payload: new TodoModel(
        '1911caln7e0l28wbt2j',
        'sample task 1',
        false,
        true,
      ),
      type: 'todos/addTodo',
    });
  });
});

describe('AddNewItem edit mode tests', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render component', async () => {
    const tree = renderer.create(
      <AddNewItem item={todos[2]} closeEditTask={mockCloseEdit} />,
    );
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should handle user input', async () => {
    const {getByTestId, toJSON} = render(
      <AddNewItem item={todos[2]} closeEditTask={mockCloseEdit} />,
    );
    const input = getByTestId('input');
    fireEvent.changeText(input, 'sampleTask4');
    expect(toJSON()).toMatchSnapshot();
  });

  it('should handle error after incorrect user input', async () => {
    const {getByTestId, toJSON} = render(
      <AddNewItem item={todos[2]} closeEditTask={mockCloseEdit} />,
    );
    const input = getByTestId('input');
    const button = getByTestId('createButton');

    fireEvent.changeText(input, '');
    fireEvent.press(button);
    expect(toJSON()).toMatchSnapshot();
    expect(mockDispatchFn).not.toHaveBeenCalled();
    expect(mockCloseEdit).not.toHaveBeenCalled();
  });

  it('should handle add new after correct user input', async () => {
    const {getByTestId, toJSON} = render(
      <AddNewItem item={todos[2]} closeEditTask={mockCloseEdit} />,
    );
    const input = getByTestId('input');
    const button = getByTestId('createButton');

    fireEvent.changeText(input, 'sample task 1');
    fireEvent.press(button);
    expect(toJSON()).toMatchSnapshot();
    expect(mockCloseEdit).toHaveBeenCalled();
    expect(mockDispatchFn).toHaveBeenCalledWith({
      payload: new TodoModel('l28uy38o', 'sample task 1', false, true),
      type: 'todos/editTodo',
    });
  });
});

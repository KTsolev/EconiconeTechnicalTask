import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {TodoModel} from '../../Models/TodoModel';
import {useDispatch, useSelector} from 'react-redux';
import {addTodo} from '../../Todoslice/TodoSlice';
import CheckBox from '@react-native-community/checkbox';
import {RootState} from '../../../../redux/store';
import {getTodos} from '../../Todoslice/TodoSelectors';
import {styles} from './styles';

export const AddNewItem: FunctionComponent<AddNewItemProps> = ({
  item,
}): JSX.Element => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [hasError, setHasErrors] = useState(false);
  const [todoName, setTodoName] = useState('');
  const [todoError, setTodoError] = useState('');

  const dispatch = useDispatch();
  const todos = useSelector<RootState, TodoModel[]>(getTodos);

  useEffect(() => {
    if (item !== null && item !== undefined) {
      setIsEdit(true);
      setIsCompleted(item.completed);
      setTodoName(item.title);
      item.isNew = false;
    } else {
      setIsEdit(false);
      setIsCompleted(false);
      setTodoName('');
    }
  }, [item]);

  const createNewOne = (): void => {
    if (todoName !== '') {
      setHasErrors(false);
      setTodoError('');
      dispatch(
        addTodo(new TodoModel(todos.length + 1, todoName, isCompleted, true)),
      );
    } else {
      setHasErrors(true);
      setTodoError('Name of task is mandatory!');
    }
  };

  const checkIfErrors = (): void => {
    if (todoName !== '') {
      setHasErrors(false);
      setTodoError('');
    } else {
      setHasErrors(true);
      setTodoError('Name of task is mandatory!');
    }
  };
  return (
    <View style={styles.container}>
      {isEdit ? (
        <CheckBox value={isCompleted} onValueChange={setIsCompleted} />
      ) : null}
      <View style={styles.inputHolder}>
        <TextInput
          style={[styles.input]}
          value={todoName}
          placeholder="Enter new task"
          onChangeText={setTodoName}
          onEndEditing={checkIfErrors}
          onBlur={checkIfErrors}
          keyboardType="numeric"
        />

        {hasError && <Text style={styles.errorText}>{todoError}</Text>}
      </View>
      <TouchableOpacity
        style={[styles.button, hasError ? styles.inActiveButton : null]}
        onPress={createNewOne}
        disabled={hasError}>
        <Text style={styles.buttonText}>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

type AddNewItemProps = {
  item?: TodoModel | null;
};

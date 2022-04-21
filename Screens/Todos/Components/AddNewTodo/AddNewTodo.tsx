import React, {FunctionComponent, useEffect, useState} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {TodoModel} from '../../Models/TodoModel';
import {useDispatch} from 'react-redux';
import {addTodo, editTodo} from '../../Todoslice/TodoSlice';
import CheckBox from '@react-native-community/checkbox';
import uniqid from 'uniqid';
import {styles} from './styles';
import * as Strings from './Strings';

export const AddNewItem: FunctionComponent<AddNewItemProps> = ({
  item,
  closeEditTask,
}): JSX.Element => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [hasError, setHasErrors] = useState(false);
  const [todoName, setTodoName] = useState('');
  const [todoError, setTodoError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (item !== null && item !== undefined) {
      setIsEdit(true);
      setTodoName(item.title);
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
      if (isEdit) {
        dispatch(
          editTodo(new TodoModel(item!.id, todoName, isCompleted, true)),
        );

        closeEditTask && closeEditTask();
      } else {
        dispatch(addTodo(new TodoModel(uniqid(), todoName, isCompleted, true)));
      }
    } else {
      setHasErrors(true);
      setTodoError(Strings.taskError);
    }
  };

  const checkIfErrors = (): void => {
    if (todoName !== '') {
      setHasErrors(false);
      setTodoError('');
    } else {
      setHasErrors(true);
      setTodoError(Strings.taskError);
    }
  };
  return (
    <View key={item?.id || 111} style={styles.container}>
      {isEdit ? (
        <CheckBox value={isCompleted} onValueChange={setIsCompleted} />
      ) : null}
      <View style={styles.inputHolder}>
        <TextInput
          style={[styles.input]}
          value={todoName}
          placeholder={Strings.inputPlaceHolder}
          onChangeText={setTodoName}
          onEndEditing={checkIfErrors}
          onBlur={checkIfErrors}
          keyboardType="default"
        />

        {hasError && <Text style={styles.errorText}>{todoError}</Text>}
      </View>
      <TouchableOpacity
        style={[styles.button, hasError ? styles.inActiveButton : null]}
        onPress={createNewOne}
        disabled={hasError}>
        <Text style={styles.buttonText}>
          {isEdit ? Strings.editTask : Strings.addTask}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

type AddNewItemProps = {
  item?: TodoModel | null;
  closeEditTask?: () => void;
};

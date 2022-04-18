import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Text} from 'react-native';
import {TodoModel} from '../Model/TodoModel';
import {useDispatch, useSelector} from 'react-redux';
import {add, getTodos} from '../TodoSlice';
import CheckBox from '@react-native-community/checkbox';
import {RootState} from '../../../redux/store';

export const AddNewItem = (): JSX.Element => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [todoName, setTodoName] = useState('');
  const dispatch = useDispatch();
  const todos = useSelector<RootState>(getTodos);

  const createNewOne = () => {
    if (todoName !== '') {
      dispatch(
        add(new TodoModel(todos.length + 1, todoName, isCompleted, true)),
      );
    }
  };

  return (
    <View>
      <CheckBox value={isCompleted} onValueChange={setIsCompleted} />
      <TextInput
        value={todoName}
        placeholder="Enter new task"
        onChangeText={setTodoName}
        keyboardType="numeric"
      />
      <TouchableOpacity onPress={createNewOne} disabled={todoName === ''}>
        <Text>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

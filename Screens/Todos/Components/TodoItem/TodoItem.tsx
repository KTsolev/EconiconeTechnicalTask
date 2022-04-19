import React, {FunctionComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TodoModel} from '../../Models/TodoModel';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch} from 'react-redux';
import {removeTodo, completeTodo} from '../../Todoslice/TodoSlice';
import {styles} from './styles';
import {AddNewItem} from '../AddNewTodo/AddNewTodo';

export const TodoItem: FunctionComponent<TodoItemProps> = ({
  item,
  isReadOnly,
}): JSX.Element | null => {
  const dispatch = useDispatch();

  const deleteItem = () => item && dispatch(removeTodo(item.id));
  const completeItem = (value: any) =>
    item && dispatch(completeTodo({id: item?.id, value}));

  if (!item) {
    return null;
  }

  if (!isReadOnly) {
    return (
      <View style={styles.container}>
        <CheckBox value={item.completed} onValueChange={completeItem} />
        <Text style={[styles.text, item.completed ? styles.completed : null]}>
          {item?.title}
        </Text>
        <TouchableOpacity style={styles.button} onPress={deleteItem}>
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <AddNewItem item={item} />
      </View>
    );
  }
};

type TodoItemProps = {
  item?: TodoModel | null;
  isReadOnly: boolean; // the paragraph is optional
};

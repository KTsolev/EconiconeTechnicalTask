import React, {FunctionComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TodoModel} from '../../Models/TodoModel';
import CheckBox from '@react-native-community/checkbox';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons/faXmark';
import {faPencil} from '@fortawesome/free-solid-svg-icons/faPencil';
import {useDispatch} from 'react-redux';
import {removeTodo, completeTodo} from '../../Todoslice/TodoSlice';
import {styles} from './styles';
import {AddNewItem} from '../AddNewTodo/AddNewTodo';

export const TodoItem: FunctionComponent<TodoItemProps> = ({
  item,
  index,
  isReadOnly,
  toggleEditTask,
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
        <CheckBox
          testID="complete"
          value={item.completed}
          onValueChange={completeItem}
        />
        <Text style={[styles.text, item.completed ? styles.completed : null]}>
          {item?.title}
        </Text>
        <TouchableOpacity
          testID="edit"
          style={[styles.button, styles.editButton]}
          onPress={() => toggleEditTask(index, !isReadOnly)}>
          <FontAwesomeIcon icon={faPencil} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          testID="delete"
          style={[styles.button, styles.deleteButton]}
          onPress={deleteItem}>
          <FontAwesomeIcon icon={faXmark} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <AddNewItem
          item={item}
          closeEditTask={() => toggleEditTask(index, !isReadOnly)}
        />
      </View>
    );
  }
};

type TodoItemProps = {
  item?: TodoModel | null;
  isReadOnly: boolean;
  index: number;
  toggleEditTask: (index: number, value: boolean) => void;
};

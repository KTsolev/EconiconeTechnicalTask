import React, {FunctionComponent} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {TodoModel} from '../Model/TodoModel';
import CheckBox from '@react-native-community/checkbox';
import {useDispatch} from 'react-redux';
import {remove, complete} from '../TodoSlice';


export const TodoItem: FunctionComponent<TodoItemProps> = ({
  item,
  isReadOnly,
}): JSX.Element => {
  const dispatch = useDispatch();

  const deleteItem = () => dispatch(remove(item?.id));
  const completeItem = (value: any) =>
    dispatch(complete({id: item?.id, value}));

  return (
    <View>
      <CheckBox value={item?.completed} onValueChange={completeItem} />
      <Text>{item?.title}</Text>
      <TouchableOpacity onPress={deleteItem}>
        <Text>X</Text>
      </TouchableOpacity>
    </View>
  );
};

type TodoItemProps = {
  item?: TodoModel | null;
  isReadOnly: boolean; // the paragraph is optional
};

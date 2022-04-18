import React from 'react';
import {View, FlatList, Text} from 'react-native';
import {getDoneTodos, getTodos} from './TodoSlice';
import {useSelector} from 'react-redux';
import {TodoItem} from './Components/TodoItem';
import {TodoModel} from './Model/TodoModel';
import {RootState} from '../../redux/store';
import {AddNewItem} from './Components/AddNewTodo';

export const TodoList = (): JSX.Element => {
  const todos = useSelector<RootState>(getTodos);
  const doneTodos = useSelector<RootState>(getDoneTodos);

  return (
    <View>
      <FlatList
        data={todos as TodoModel[]}
        ListHeaderComponent={() => <Text>Things Todo:</Text>}
        renderItem={({item}) => <TodoItem item={item} isReadOnly={false} />}
        ListFooterComponent={() => (
          <View>
            <Text>Done: {doneTodos.length}</Text>
            <AddNewItem />
          </View>
        )}
      />
    </View>
  );
};

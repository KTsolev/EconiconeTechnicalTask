import React, {useEffect, useState} from 'react';
import {View, FlatList, Text, TouchableOpacity} from 'react-native';
import {
  getDoneTodos,
  getNotDoneTodos,
  getTodos,
} from '../Todoslice/TodoSelectors';
import {useSelector} from 'react-redux';
import {TodoItem} from '../Components/TodoItem/TodoItem';
import {TodoModel} from '../Models/TodoModel';
import {RootState} from '../../../redux/store';
import {AddNewItem} from '../Components/AddNewTodo/AddNewTodo';
import {styles} from './style';
import {Separator} from '../Components/Separator/Separator';

export const TodoList = (): JSX.Element => {
  const todos = useSelector<RootState, TodoModel[]>(getTodos);
  const doneTodos = useSelector<RootState, TodoModel[]>(getDoneTodos);
  const notDoneTodos = useSelector<RootState, TodoModel[]>(getNotDoneTodos);
  const [filtered, setFiltered] = useState(todos);
  const [editTodos, setEditTodos] = useState(Array(todos.length).fill(false));

  useEffect(() => {
    setFiltered(todos);
  }, [todos]);

  const toggLeEditTask = (index: number, value: boolean): void => {
    editTodos[index] = value;
  };

  const filterBy = (by: string): void => {
    switch (by) {
      case 'done':
        setFiltered(doneTodos);
        break;
      case 'not-done':
        setFiltered(notDoneTodos);
        break;
      default:
        setFiltered(todos);
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => filterBy('done')}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => filterBy('not-done')}>
          <Text style={styles.buttonText}>Not Done</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => filterBy('all')}>
          <Text style={styles.buttonText}>All</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.text}>Things Todo:</Text>
      <Separator />
      <FlatList
        data={filtered}
        style={{maxHeight: 400}}
        renderItem={({item, index}) => (
          <TodoItem item={item} isReadOnly={editTodos[index]} />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
      <Text style={styles.text}>Done: {doneTodos.length}</Text>
      <Separator />
      <AddNewItem />
    </View>
  );
};

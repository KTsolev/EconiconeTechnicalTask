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
import * as Strings from './Strings';

export const TodoList = (): JSX.Element => {
  const todos = useSelector<RootState, TodoModel[]>(getTodos);
  const doneTodos = useSelector<RootState, TodoModel[]>(getDoneTodos);
  const notDoneTodos = useSelector<RootState, TodoModel[]>(getNotDoneTodos);
  const [filtered, setFiltered] = useState(todos);
  const [prevIndex, setPrevIndex] = useState(0);
  const [editTodos, setEditTodos] = useState(
    Array(filtered.length).fill(false),
  );

  useEffect(() => {
    setFiltered(todos);
  }, [todos]);

  const toggleEditTask = (index: number, value: boolean): void => {
    console.log('in toggel edit from list');
    editTodos[index] = value;
    editTodos[prevIndex] = false;
    setPrevIndex(index);
    setEditTodos([...editTodos, editTodos[index], editTodos[prevIndex]]);
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
      <View style={styles.header}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={styles.button}
            testID="done"
            onPress={() => filterBy('done')}>
            <Text style={styles.buttonText}>{Strings.done}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            testID="not-done"
            onPress={() => filterBy('not-done')}>
            <Text style={styles.buttonText}>{Strings.notDone}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            testID="all"
            onPress={() => filterBy('all')}>
            <Text style={styles.buttonText}>{Strings.all}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>{Strings.title1}</Text>
        <Separator />
      </View>
      <FlatList
        data={filtered}
        style={styles.flex1}
        ListEmptyComponent={() => (
          <Text style={styles.text}>{Strings.emptyList}</Text>
        )}
        renderItem={({item, index}) => (
          <TodoItem
            key={index}
            item={item}
            index={index}
            isReadOnly={editTodos[index]}
            toggleEditTask={toggleEditTask}
          />
        )}
        ItemSeparatorComponent={() => <Separator />}
      />
      <View style={styles.footer}>
        <Text style={styles.text}>
          {Strings.subtitle} {doneTodos.length}
        </Text>
        <Separator />
        <AddNewItem />
      </View>
    </View>
  );
};

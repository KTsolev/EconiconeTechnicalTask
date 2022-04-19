import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import store from './redux/store';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TodoList} from './Screens/Todos/TodoList/TodoList';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 2,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider store={store}>
        <TodoList />
      </Provider>
    </SafeAreaView>
  );
};

export default App;

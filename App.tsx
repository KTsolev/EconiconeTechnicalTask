import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Provider} from 'react-redux';
import store from './redux/store';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {TodoList} from './Screens/Todos/TodoList/TodoList';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BitCoinRates} from './Screens/BitCoinRates/BitCoinRates';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    flex: 2,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  let persistor = persistStore(store);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <KeyboardAwareScrollView nestedScrollEnabled={true}>
            <BitCoinRates />
            <TodoList />
          </KeyboardAwareScrollView>
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

export default App;

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginVertical: 4,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    flex: 0.8,
    fontSize: 16,
    paddingLeft: 4,
    color: '#282C34',
  },
  completed: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
  },
  button: {
    width: 20,
    height: 20,
    padding: 14,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C8C8C8',
  },
  buttonText: {
    width: 20,
    height: 20,
    textAlign: 'center',
    color: '#000',
  },
});

import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  flex1: {flex: 1},
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  header: {
    flex: 0.5,
    padding: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  footer: {
    flex: 0.5,
    padding: 10,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  filterContainer: {
    flex: 1,
    paddingVertical: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  text: {
    fontSize: 22,
    paddingVertical: 10,
    fontWeight: '600',
    textAlign: 'center',
    color: '#282C34',
    textTransform: 'uppercase',
  },
  button: {
    flex: 0.5,
    maxWidth: 184,
    height: 44,
    padding: 10,
    marginHorizontal: 4,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c90ff',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#fff',
  },
});

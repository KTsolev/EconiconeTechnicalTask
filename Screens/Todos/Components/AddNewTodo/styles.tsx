import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginVertical: 4,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputHolder: {
    flex: 0.82,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#888888',
  },
  text: {
    flex: 0.8,
    fontSize: 16,
    paddingLeft: 4,
    color: '#282C34',
  },
  input: {
    maxHeight: 120,
    minHeight: 40,
    color: '#888888',
    fontWeight: '600',
    padding: 10,
  },
  errorText: {
    position: 'absolute',
    top: 44,
    left: 45,
    color: '#ff2200',
    fontSize: 12,
  },
  inputError: {
    borderColor: '#ff2200',
  },
  button: {
    flex: 0.5,
    maxWidth: 184,
    maxHeight: 68,
    minHeight: 40,
    padding: 10,
    marginHorizontal: 4,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1c90ff',
  },
  inActiveButton: {
    backgroundColor: '#c8c8c8',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: '600',
    color: '#fff',
  },
});

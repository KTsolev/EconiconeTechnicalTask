import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
// In jest.config.js add (if you haven't already)
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

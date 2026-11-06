// Jest: the native AsyncStorage module doesn't exist under jest-expo, so use the
// package's official in-memory mock everywhere. Tests that jest.mock() it with
// their own factory still take precedence.
module.exports = require('@react-native-async-storage/async-storage/jest/async-storage-mock')

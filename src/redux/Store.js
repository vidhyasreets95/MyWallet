import { createStore } from 'redux';
import { Reducer } from "./Reducer";
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const persistConfig = {
    key: 'myWallet',
    storage: AsyncStorage,
    whitelist: ['Reducer'] // which reducer want to store
};

const persistedReducer = persistReducer(persistConfig, Reducer);

const configureStore = createStore(persistedReducer);

let persistor = persistStore(configureStore);

export { configureStore, persistor };
import {configureStore} from '@reduxjs/toolkit';
import booksReducer from './src/features/books/booksSlice';

const store = configureStore({reducer: {books: booksReducer}});

export default store;

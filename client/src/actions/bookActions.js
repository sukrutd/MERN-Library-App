import axios from 'axios';
import {
  BOOK_LIST_REQUEST,
  BOOK_LIST_SUCCESS,
  BOOK_LIST_FAILURE,
  BOOK_DETAILS_REQUEST,
  BOOK_DETAILS_SUCCESS,
  BOOK_DETAILS_FAILURE,
  BOOK_CREATE_REQUEST,
  BOOK_CREATE_SUCCESS,
  BOOK_CREATE_FAILURE,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAILURE
} from './types';

export const listBooks = () => async (dispatch) => {
  try {
    dispatch({ type: BOOK_LIST_REQUEST });

    const { data: response } = await axios.get('/api/v1/books');

    dispatch({ type: BOOK_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: BOOK_LIST_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const getBookDetails = (bookId) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_DETAILS_REQUEST });

    const { data: response } = await axios.get(`/api/v1/books/${bookId}`);

    dispatch({ type: BOOK_DETAILS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: BOOK_DETAILS_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const createBook = (bookData) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_CREATE_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const { data: response } = await axios.post('/api/v1/books', bookData, config);

    dispatch({ type: BOOK_CREATE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: BOOK_CREATE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

export const deleteBook = (bookId) => async (dispatch) => {
  try {
    dispatch({ type: BOOK_DELETE_REQUEST });

    await axios.delete(`/api/v1/books/${bookId}`);

    dispatch({ type: BOOK_DELETE_SUCCESS });
  } catch (error) {
    dispatch({
      type: BOOK_DELETE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};

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
  BOOK_CREATE_RESET,
  BOOK_DELETE_REQUEST,
  BOOK_DELETE_SUCCESS,
  BOOK_DELETE_FAILURE
} from '../actions/types';

export const bookListReducer = (state = { books: [] }, action) => {
  switch (action.type) {
    case BOOK_LIST_REQUEST:
      return { ...state, loading: true };

    case BOOK_LIST_SUCCESS:
      return { loading: false, books: action.payload };

    case BOOK_LIST_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bookDetailsReducer = (state = { book: {} }, action) => {
  switch (action.type) {
    case BOOK_DETAILS_REQUEST:
      return { ...state, loading: true };

    case BOOK_DETAILS_SUCCESS:
      return { loading: false, book: action.payload };

    case BOOK_DETAILS_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const bookCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_CREATE_REQUEST:
      return { loading: true };

    case BOOK_CREATE_SUCCESS:
      return { loading: false, success: true, book: action.payload };

    case BOOK_CREATE_FAILURE:
      return { loading: false, error: action.payload };

    case BOOK_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const bookDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case BOOK_DELETE_REQUEST:
      return { loading: true };

    case BOOK_DELETE_SUCCESS:
      return { loading: false, success: true };

    case BOOK_DELETE_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

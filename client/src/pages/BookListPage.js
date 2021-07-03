import React, { useEffect, useState } from 'react';
import { CardDeck, Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listBooks, createBook, deleteBook } from '../actions/bookActions';
import { BOOK_CREATE_RESET } from '../actions/types';
import Book from '../components/Book';
import Loader from '../components/Loader';
import Message from '../components/Message';

const BookListPage = ({ history }) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setISBN] = useState('');

  const dispatch = useDispatch();
  const bookList = useSelector((state) => state.bookList);
  const { loading, error, books } = bookList;

  const bookCreate = useSelector((state) => state.bookCreate);
  const { loading: loadingCreate, error: errorCreate, success: successCreate, book: createdBook } = bookCreate;

  const bookDelete = useSelector((state) => state.bookDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = bookDelete;

  useEffect(() => {
    if (successCreate) {
      dispatch({ type: BOOK_CREATE_RESET });
      history.push(`/books/${createdBook._id}`);
    } else {
      dispatch(listBooks());
    }
  }, [createdBook, dispatch, history, successCreate, successDelete]);

  const createBookHandler = (event) => {
    event.preventDefault();
    dispatch(createBook({ title, subtitle, description, author, isbn }));
  };

  const deleteBookHandler = (bookId) => dispatch(deleteBook(bookId));

  return (
    <>
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      <Row>
        <Col>
          <Form onSubmit={createBookHandler}>
            <Form.Group controlId='bookTitle'>
              <Form.Label>Book Title</Form.Label>
              <Form.Control
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Enter Title'
              />
            </Form.Group>

            <Form.Group controlId='bookSubTitle'>
              <Form.Label>Book Sub-Title</Form.Label>
              <Form.Control
                type='text'
                value={subtitle}
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder='Enter Sub-Title'
              />
            </Form.Group>

            <Form.Group controlId='bookAuthor'>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type='text'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder='Enter an Author'
              />
            </Form.Group>

            <Form.Group controlId='bookDescription'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Enter Description'
              />
            </Form.Group>

            <Form.Group controlId='bookISBN'>
              <Form.Label>ISBN Number</Form.Label>
              <Form.Control
                type='text'
                value={isbn}
                onChange={(e) => setISBN(e.target.value)}
                placeholder='Enter ISBN Number'
              />
            </Form.Group>

            <Button variant='warning' type='submit' onClick={createBookHandler} size='lg' block>
              <i className='fas fa-plus'></i> Create Book
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col className='pt-5'>
          <h2>The Books in My Library</h2>
        </Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <CardDeck>
          {books.map((book) => (
            <Book key={book._id} book={book} deleteHandler={deleteBookHandler} />
          ))}
        </CardDeck>
      )}
    </>
  );
};

export default BookListPage;

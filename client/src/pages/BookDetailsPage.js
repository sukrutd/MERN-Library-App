import React, { useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBookDetails } from '../actions/bookActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const BookDetailsPage = ({ match }) => {
  const dispatch = useDispatch();
  const bookDetails = useSelector((state) => state.bookDetails);
  const { loading = false, error = '', book = {} } = bookDetails;

  useEffect(() => {
    dispatch(getBookDetails(match.params.id));
  }, [dispatch, match]);

  return (
    <>
      <Link to='/books' className='btn btn-success my-3'>
        Go Back to My Books
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Card className='my-3 rounded'>
          <Card.Header as='h4'>
            <strong>{book.title}</strong>
          </Card.Header>
          <Card.Body>
            <Card.Subtitle className='mb-3 text-muted'>{book.subtitle}</Card.Subtitle>
            <Card.Text className='mb-3'>{book.description}</Card.Text>
            <Card.Text as='h6' className='mb-3'>
              <strong>ISBN: </strong> {book.isbn}
            </Card.Text>
            <Button variant='primary'>{book.author}</Button>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default BookDetailsPage;

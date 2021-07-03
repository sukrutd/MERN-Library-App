import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Book = ({ book, deleteHandler }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Card.Body>
        <Link to={`/books/${book._id}`}>
          <Card.Title as='div'>
            <strong>{book.title}</strong>
          </Card.Title>
        </Link>
        <Card.Subtitle className='mb-3 text-muted'>{book.subtitle}</Card.Subtitle>
        <Card.Text className='mb-3'>{book.description}</Card.Text>
        <Card.Text as='h6' className='mb-3'>
          <strong>ISBN: </strong> {book.isbn}
        </Card.Text>
        <Button variant='primary' className='mr-2'>
          {book.author}
        </Button>
        <Button variant='danger' className='mr-2' onClick={() => deleteHandler(book._id)}>
          <i className='fas fa-trash'></i>
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Book;

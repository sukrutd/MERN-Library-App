import React from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const HomePage = () => {
  return (
    <Jumbotron>
      <h1 className='text-center my-5'>Welcome to My Library!</h1>
      <h4 className='text-center my-5'>
        A simple Fullstack MERN application to demonstrate how Nginx and Docker can be used in the workflow.
      </h4>
      <p className='text-center'>
        <LinkContainer to='/books'>
          <Button variant='success' size='lg'>
            My Books
          </Button>
        </LinkContainer>
      </p>
    </Jumbotron>
  );
};

export default HomePage;

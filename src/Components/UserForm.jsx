import React, { useState } from 'react';  // Importing React and useState hook
import axios from 'axios';  // Importing Axios for HTTP requests
import styled from 'styled-components';  // Importing styled-components for styling

// Styled component for form
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`;

// Styled component for input fields
const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

// Styled component for buttons
const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: #0000ff;
  color: #fff;
  border: none;
  border-radius: 4px;

  &:hover {
    opacity: 0.9;
  }
`;

// UserForm component to add new user
const UserForm = ({ setUsers }) => {
  const [name, setName] = useState('');  // State for name
  const [email, setEmail] = useState('');  // State for email

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://jsonplaceholder.typicode.com/users', { name, email })  // POST request to add user
      .then(response => {
        setUsers(prevUsers => [...prevUsers, response.data]);  // Updating state with new user data
        setName('');  // Clearing name field
        setEmail('');  // Clearing email field
      })
      .catch(error => {
        console.error('Error adding user:', error);  // Handling errors
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit">Add User</Button>  
    </Form>
  );
};

export default UserForm;

import React, { useState } from 'react';  // Importing React and useState hook
import axios from 'axios';  // Importing Axios for HTTP requests
import styled from 'styled-components';  // Importing styled-components for styling

// Styled component for list items
const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
`;

// Styled component for buttons
const Button = styled.button`
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
  background-color: ${props => props.primary ? '#00ff00' : '#fd1c03'};
  color: #fff;
  border: none;
  border-radius: 4px;

  &:hover {
    opacity: 0.9;
  }
`;

// UserItem component to display individual user details
const UserItem = ({ user, setUsers }) => {
  const [isEditing, setIsEditing] = useState(false);  // State for edit mode
  const [name, setName] = useState(user.name);  // State for name
  const [email, setEmail] = useState(user.email);  // State for email

  // Function to handle delete action
  const handleDelete = () => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${user.id}`)  // DELETE request to delete user
      .then(() => {
        setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));  // Updating state to remove deleted user
      })
      .catch(error => {
        console.error('Error deleting user:', error);  // Handling errors
      });
  };

  // Function to handle edit action
  const handleEdit = (e) => {
    e.preventDefault();
    axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, { name, email })  // PUT request to update user
      .then(response => {
        setUsers(prevUsers => prevUsers.map(u => u.id === user.id ? response.data : u));  // Updating state with edited user data
        setIsEditing(false);  // Exiting edit mode
      })
      .catch(error => {
        console.error('Error updating user:', error);  // Handling errors
      });
  };

  return (
    <ListItem>
      {isEditing ? (  // Conditional rendering based on edit mode
        <form onSubmit={handleEdit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button primary type="submit">Save</Button>
        </form>
      ) : (
        <>
          {user.name} - {user.email}  
          <Button onClick={() => setIsEditing(true)}>Edit</Button> 
          <Button onClick={handleDelete}>Delete</Button>  
        </>
      )}
    </ListItem>
  );
};

export default UserItem;

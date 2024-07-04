import React, { useState, useEffect } from 'react';  // Importing React hooks
import axios from 'axios';  // Importing Axios for HTTP requests
import UserList from './Components/UserList';  // Importing UserList component
import styled from 'styled-components';  // Importing styled-components for styling

// Styled component for the main container
const AppContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
`;

// Styled component for the title
const Title = styled.h1`
  color:#0000ff;  // Adding color to the title
`;

// Main App component
const App = () => {
  const [users, setUsers] = useState([]);  // State to hold user data

  // useEffect to fetch data when the component mounts
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')  // GET request to fetch users
      .then(response => {
        setUsers(response.data);  // Updating state with fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);  // Handling errors
      });
  }, []);

  return (
    <AppContainer>
      <Title>User Management</Title>  
      <UserList users={users} setUsers={setUsers} />  
    </AppContainer>
  );
};

export default App;

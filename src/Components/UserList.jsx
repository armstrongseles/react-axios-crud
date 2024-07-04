import React from 'react';  // Importing React
import UserItem from './UserItem';  // Importing UserItem component
import UserForm from './UserForm';  // Importing UserForm component
import styled from 'styled-components';  // Importing styled-components for styling

// Styled component for the list container
const ListContainer = styled.div`
  margin-top: 20px;
`;

// UserList component to display list of users
const UserList = ({ users, setUsers }) => {
  return (
    <ListContainer>
      <UserForm setUsers={setUsers} /> 
      <ul>
        {users.map(user => (  // Mapping over users and rendering UserItem for each
          <UserItem key={user.id} user={user} setUsers={setUsers} />
        ))}
      </ul>
    </ListContainer>
  );
};

export default UserList;

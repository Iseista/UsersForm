import axios from 'axios';
import React from 'react';

const UsersList = ({ users, selectUser, getUsers }) => {
    const deleteUser = (id) => {
        alert("Eliminando");
        axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
            .then(() => getUsers());
    };

    return (
        <ul className='container-list'>
            <h1>Users List</h1>
            {
                users.map((user) => (
                    <li key={user.id}>
                        <h2>{user.first_name}</h2>
                        <p>{user.last_name}</p>
                        <p>{user.email}</p>
                        <p>{user.password}</p>
                        <p>{user.birthday}</p>
                        <button onClick={() => selectUser(user)}>Edit</button>
                        <button className='btn-delete' onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))
            }
        </ul>
    );
};

export default UsersList;
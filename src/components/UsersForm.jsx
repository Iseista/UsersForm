import axios from 'axios';
import React, { useEffect, useState } from 'react';

const UsersForm = ({ getUsers, userSelected, deselectUser }) => {

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [birthday, setBirthday] = useState("");

    useEffect(() => {
        if (userSelected !== null) {
            setName(userSelected.first_name);
            setLastName(userSelected.last_name);
            setEmail(userSelected.email);
            setPassword(userSelected.password);
            setBirthday(userSelected.birthday);
        }
    }, [userSelected]);

    const submit = (e) => {
        e.preventDefault();
        const userForm = {
            first_name: name,
            last_name: lastName,
            email: email,
            password: password,
            birthday: birthday
        };
        if (userSelected !== null) {
            alert("Actualizando");
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`, userForm)
                .then(() => {
                    getUsers();
                    reset();
                    deselectUser();
                });
        } else {
            axios.post(`https://users-crud1.herokuapp.com/users/`, userForm)
                .then(() => {
                    getUsers();
                    reset();
                })
                .catch((error) => console.log(error.response));
        }
    };

    const reset = () => {
        setName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setBirthday("");
    }

    const clear = () => {
        reset();
        deselectUser();
    };

    return (
        <form onSubmit={submit} className="form">
            <h1>New user</h1>
            <div className='form-container'>
                <label htmlFor='name'>Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className='form-container'>
                <label htmlFor='lastName'>last Name</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>

            <div className='form-container'>
                <label htmlFor='email'>email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className='form-container'>
                <label htmlFor='password'>Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className='form-container'>
                <label htmlFor='birthday'>Birthday</label>
                <input
                    type="date"
                    id="birthday"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                />
            </div>

            <button className='btn-submit'>Submit</button>
            <button className='btn-clear' type='button' onClick={clear}>Clear</button>
        </form>
    );
};

export default UsersForm;
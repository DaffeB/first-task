
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const HomeFile = () => {
    const [userData, setUserData] = useState([]);
    const BASE_URL = 'https://jsonplaceholder.typicode.com/';

    const fetchUserData = async () => {
        try {
            const response = await fetch(BASE_URL + 'users');
            const json = await response.json();
            setUserData(json);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <div className='container'>
            <h1 className='main-title'>USERS</h1>
            {userData.length > 0 ? (
                <ul className='user-list'>
                    {userData.map((user) => (
                        <li key={user.id}>
                            <Link to={`/user/${user.id}`}>{user.name}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='loading-data'>Loading data.</p>
            )}
        </div>
    );
};

export default HomeFile;





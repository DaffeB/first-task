import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
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
        <div className="container">
            <h1 className="title">USERS</h1>
            {userData.length > 0 ? (
                <div className="user-container">
                    {userData.map((user) => (
                        <div
                            key={user.id}
                            className="user-card"
                        >
                            <Link
                                to={`/user/${user.id}`}
                                className="user-link"
                            >
                                {user.name}
                            </Link>
                            <p className="user-email">{user.email}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="loading-message">Loading data.</p>
            )}
        </div>
    );
};

export default Home;

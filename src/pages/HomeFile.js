
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
        <div style={{ maxWidth: '70%', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '20px', color: 'rgb(52, 96, 103)' }}>USERS</h1>
            {userData.length > 0 ? (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {userData.map((user) => (
                        <div
                            key={user.id}
                            style={{
                                width: 'calc(40% - 20px)',
                                margin: '10px',
                                padding: '15px',
                                borderRadius: '8px',
                                background: 'white',
                                boxShadow: '0 4px 8px  rgb(52, 96, 103)',
                            }}
                        >

                            <Link
                                to={`/user/${user.id}`}
                                style={{
                                    textDecoration: 'none',
                                    color: '#333',
                                    fontWeight: 'bold',
                                    display: 'block',
                                    marginBottom: '10px',
                                }}
                            >
                                {user.name}
                            </Link>
                            <p style={{ color: '#555', margin: 0 }}>{user.email}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ fontSize: '18px', color: '#888' }}>Loading data.</p>
            )}
        </div>
    );
};

export default HomeFile;

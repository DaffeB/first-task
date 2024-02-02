import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';  // Import Link component
// ... (other imports)

const UserPosts = () => {
    const { userId } = useParams();
    const [userPosts, setUserPosts] = useState([]);

    const fetchUserPosts = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
            const json = await response.json();
            setUserPosts(json);
        } catch (error) {
            console.error('Error fetching user posts:', error);
        }
    };

    useEffect(() => {
        fetchUserPosts();
    }, [userId]);

    return (
        <div className='container'>
            <h1 className='main-title'>User's Posts</h1>
            {userPosts.length > 0 ? (
                <ul className='post-list'>
                    {userPosts.map((post) => (
                        <li key={post.id}>
                            <p>{post.title}</p>
                            <div>
                                <Link to={`/post/${post.id}/comments`}>View Comments</Link>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='loading-data'>Loading user posts.</p>
            )}
        </div>
    );
};

export default UserPosts;

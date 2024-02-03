
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const UserPosts = () => {
    const { userId } = useParams();

    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                // Fetch user data
                const userResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                const userData = await userResponse.json();

                // Fetch user posts
                const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
                const posts = await postsResponse.json();

                // Fetch number of comments for each post
                const postsWithComments = await Promise.all(
                    posts.map(async (post) => {
                        const commentsResponse = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`);
                        const comments = await commentsResponse.json();
                        return { ...post, commentsCount: comments.length, userData };
                    })
                );

                setUserPosts(postsWithComments);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };
        fetchUserPosts();
    }, [userId]);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '20px', color: '#333' }}>User's Posts</h1>
            {userPosts.length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {userPosts.map((post) => (
                        <li
                            key={post.id}
                            style={{
                                marginBottom: '20px',
                                padding: '15px',
                                borderRadius: '8px',
                                background: '#fff',
                                boxShadow: '0 4px 8px rgba(0, 128, 0, 0.1)',
                            }}
                        >
                            <p style={{ fontSize: '18px', color: '#333', marginBottom: '10px' }}>{post.title}</p>
                            <p style={{ color: '#555', marginBottom: '10px' }}>{post.body}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <Link
                                        to={`/post/${post.id}/comments`}
                                        style={{
                                            textDecoration: 'none',
                                            color: '#007BFF',
                                            fontWeight: 'bold',
                                            transition: 'color 0.3s ease',
                                        }}
                                    >
                                        View Comments ({post.commentsCount || 0})
                                    </Link>
                                </div>
                                <div style={{ color: '#888' }}>Posted by  {post.userData.name}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ fontSize: '18px', color: '#888' }}>Loading user posts.</p>
            )}
        </div>
    );
};

export default UserPosts;

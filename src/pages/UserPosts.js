import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const UserPosts = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState({});
    const [userPosts, setUserPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userResponse, postsResponse] = await Promise.all([
                    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`),
                    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
                ]);

                const [userData, posts] = await Promise.all([
                    userResponse.json(),
                    postsResponse.json()
                ]);

                const postsWithComments = await Promise.all(
                    posts.map(async (post) => {
                        const comments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${post.id}`).then(res => res.json());
                        return { ...post, commentsCount: comments.length, userData };
                    })
                );

                setUserData(userData);
                setUserPosts(postsWithComments);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '20px', color: '#333' }}>{userData.name}'s Posts</h1>
            {loading ? (
                <p style={{ fontSize: '18px', color: '#888' }}>Loading user posts!</p>
            ) : (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    {userPosts.map((post) => (
                        <li key={post.id} style={{ marginBottom: '20px', padding: '15px', borderRadius: '8px', background: '#fff', boxShadow: '0 4px 8px rgba(0, 128, 0, 0.1)' }}>
                            <p style={{ color: '#555', marginBottom: '10px' }}>{post.body}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                    <Link to={`/post/${post.id}/comments`} style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold', transition: 'color 0.3s ease' }}>
                                        View Comments ({post.commentsCount || 0})
                                    </Link>
                                </div>
                                <div style={{ color: '#888' }}>Posted by {post.userData.name}</div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UserPosts;

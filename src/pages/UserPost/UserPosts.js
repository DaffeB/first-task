import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './userPost.css';

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
        <div className="user-post">
            <div>
                <h1>{userData.name}'s Posts</h1>
                {loading ? (
                    <p className="loading-message">Loading user posts!</p>
                ) : (
                    <ul>
                        {userPosts.map(({ id, body, commentsCount, userData }) => (
                            <li key={id}>
                                <p>{body}</p>
                                <div>
                                    <div>
                                        <Link to={`/post/${id}/comments`}>
                                            <button>
                                                View comments ({commentsCount || 0})
                                            </button>
                                        </Link>
                                    </div>
                                    <div>Posted by {userData.name}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export default UserPosts;

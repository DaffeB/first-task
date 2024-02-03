import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './userComments.css';

const UserComments = () => {
    const { postId } = useParams();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
                const json = await response.json();

                const commentsWithRandomDates = json.map(comment => ({
                    ...comment,
                    date: getRandomDate(),
                }));

                setComments(commentsWithRandomDates);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [postId]);

    const getRandomDate = () => {
        const startDate = new Date(2020, 0, 1);
        const endDate = new Date();
        const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
        return randomDate.toISOString().split('T')[0];
    };

    return (
        <div className="container">
            <h1 className="title">Post comments</h1>
            {comments.length > 0 ? (
                <ul className="comment-list">
                    {comments.map((comment) => (
                        <li key={comment.id} className="comment-box">
                            {/* <p className="comment-name">{comment.name}</p> */}
                            <p className="comment-body">{comment.body}</p>
                            <p className="comment-date">Date: {comment.date}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="loading-data">Loading comments.</p>
            )}
        </div>
    );
};

export default UserComments;
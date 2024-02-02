import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserComments = () => {
    const { postId } = useParams();
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
            const json = await response.json();
            setComments(json);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <div className='container'>
            <h1 className='main-title'>Post Comments</h1>
            {comments.length > 0 ? (
                <ul className='comment-list'>
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            <p>{comment.name}</p>
                            <p>{comment.body}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='loading-data'>Loading comments.</p>
            )}
        </div>
    );
};

export default UserComments;

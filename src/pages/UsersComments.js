import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserComments = () => {
    const { postId } = useParams();
    const [comments, setComments] = useState([]);



    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
                const json = await response.json();
                setComments(json);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, [postId]);

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Post Comments</h1>
            {comments.length > 0 ? (
                <ul style={styles.commentList}>
                    {comments.map((comment) => (
                        <li key={comment.id} style={styles.commentBox}>
                            <p style={styles.commentName}>{comment.name}</p>
                            <p style={styles.commentBody}>{comment.body}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={styles.loadingData}>Loading comments.</p>
            )}
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'Arial, sans-serif',
    },
    title: {
        color: '#333',
        fontSize: '24px',
        marginBottom: '20px',
        textAlign: 'center',
    },
    commentList: {
        listStyle: 'none',
        padding: 0,
    },
    commentBox: {
        border: '1px solid #ddd',
        padding: '15px',
        marginBottom: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    commentName: {
        fontWeight: 'bold',
        marginBottom: '5px',
    },
    commentBody: {
        fontSize: '14px',
        lineHeight: '1.6',
        color: '#555',
    },
    loadingData: {
        color: '#666',
        textAlign: 'center',
    },
};

export default UserComments;

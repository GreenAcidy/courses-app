import React from 'react';

import { useParams, Link } from 'react-router-dom';

import Button from '../../common/Button/Button';

import PropTypes from 'prop-types';

import './PostInfo.css';

const PostInfo = ({ posts, authors }) => {
	const { postId } = useParams();
	const post = posts.find((post) => post.id === postId);

	if (!post) {
		return (
			<div className='post-error'>
				<h1>No post found by id {postId}</h1>
			</div>
		);
	}

	const postAuthors = post.authors.map((id) => {
		return authors.find((author) => author.id === id)?.name;
	});

	return (
		<div className='post-info'>
			<Link to={'/posts'}>
				<Button buttonText='< Back to posts' />
			</Link>
			<h1 className='title'>{post.title}</h1>
			<div className='description'>{post.description}</div>
			<div className='info'>
				<div>
					<b>ID:</b> {post.id}
				</div>
				<div>
					<b>Created:</b> {post.creationDate}
				</div>
				<div>
					<b>Authors:</b> {postAuthors.join(', ')}
				</div>
			</div>
		</div>
	);
};

PostInfo.propTypes = {
	posts: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
};

export default PostInfo;

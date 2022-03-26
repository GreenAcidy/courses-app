import React from 'react';
import Button from '../../../../common/Button/Button';
import './PostCard.css';

import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

const PostCard = ({ post, authors }) => {
	return (
		<div className='post-card'>
			<div className='main-info'>
				<h1>{post.title}</h1>
				<>{post.description}</>
			</div>
			<div className='additional-info'>
				<div className='authors'>
					<b>Authors:</b> {authors.join(', ')}
				</div>
				<div>
					<b>Created:</b> {post.creationDate}
				</div>
				<div className='show-button'>
				<Link to={`/posts/${post.id}`}>
						<Button buttonText='Show post' />
					</Link>
				</div>
			</div>
		</div>
	);
};

PostCard.propTypes = {
	posts: PropTypes.array,
	authors: PropTypes.array,
};

export default PostCard;

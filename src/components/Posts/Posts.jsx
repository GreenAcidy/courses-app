import React, { useState, useCallback, useMemo } from 'react';

import { Link } from 'react-router-dom';

import PostCard from './components/PostCard/PostCard';
import SearchBar from './components/SearchBar/SearchBar';

import './Posts.css';

import PropTypes from 'prop-types';

const Posts = ({ posts, authors }) => {
	const [foundPosts, setFoundPosts] = useState(posts);
	const [searchString, setSearchString] = useState('');

	const postsToRender = useMemo(
		() =>
			foundPosts.map((post) => {
				return (
					<PostCard
						key={post.id}
						post={post}
						authors={post.authors.map((id) => {
							return authors.find((author) => author.id === id)?.name;
						})}
					/>
				);
			}),
		[authors, foundPosts]
	);

	const searchPost = useCallback(() => {
		const foundPosts = posts.filter(
			(post) =>
				post.title.toLowerCase().includes(searchString.toLowerCase()) ||
				post.id.toLowerCase().includes(searchString.toLowerCase())
		);
		setFoundPosts(foundPosts);
	}, [searchString, posts]);

	return (
		<div className='posts-list'>
			<div className='header'>
				<div className='search-post'>
					<SearchBar
						buttonText='Search'
						placeholderText='Enter post name or id...'
						onClick={searchPost}
						onChange={(e) => {
							setSearchString(e.target.value);
							if (e.target.value === '') {
								setFoundPosts(posts);
							}
						}}
					/>
				</div>
				<div className='add-post-button'>
					<Link to='/posts/add'>
						<button type='button'>Create post</button>
					</Link>
				</div>
			</div>
			{postsToRender}
		</div>
	);
};

Posts.propTypes = {
	posts: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
};

export default Posts;

import React, { useState, useRef } from 'react';

import { v4 as uuidv4 } from 'uuid';

import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';

import moment from 'moment';


import { useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';

import './CreatePost.css';

const CreatePost = ({ onCreatePost, authors, onCreateAuthor }) => {
	const [postAuthors, setPostAuthors] = useState([]);
	const [formData, setFormData] = useState({
		title: '',
		description: '',
	});
	const navigate = useNavigate();

	const inputAuthorName = useRef('');

	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onCreateAuthorClick = () => {
		if (inputAuthorName.current.value?.length) {
			onCreateAuthor({ id: uuidv4(), name: inputAuthorName.current.value });
		}
	};

	const onAddAuthorClick = (author) => {
		let postAuthorNames = postAuthors.map((author) => author.name);
		if (!postAuthorNames.find((authorName) => author.name === authorName)) {
			setPostAuthors([...postAuthors, author]);
		}
	};

	const onDeleteAuthorClick = (author) => {
		let deleteAuthor = postAuthors.filter((auth) => auth.id !== author.id);
		setPostAuthors(deleteAuthor);
	};

	const validateForm = (...args) => {
		if (args.some((elem) => !elem?.length)) {
			alert('Please, fill all fields');
			return false;
		}

		return true;
	};

	const onSubmit = (e) => {
		e.preventDefault();

		const isValid = validateForm(
			formData.title,
			formData.description,
			postAuthors
		);

		if (isValid) {
			onCreatePost({
				id: uuidv4(),
				creationDate: moment(new Date()).format('DD/MM/YYYY'),
				description: formData.description,
				title: formData.title,
				authors: postAuthors.map((author) => author.id),
			});

			navigate('/posts');
		}
	};

	return (
		<div className='create-post'>
			<form onSubmit={onSubmit}>
				<div className='header'>
					<div className='title-input'>
						<Input
							labelText='Title'
							name='title'
							placeholderText='Enter title...'
							onChange={handleInputChange}
							value={formData.title}
						/>
					</div>
					<Button type='submit' buttonText='Create post' />
				</div>

				<div className='description-input'>
					<Input
						name='description'
						labelText='Description'
						isTextArea={true}
						placeholderText='Enter description'
						onChange={handleInputChange}
						value={formData.description}
					/>
				</div>

			</form>
			<div className='authors-input'>
				<div className='create-author'>
					<h2>Add author</h2>
					<Input
						inputRef={inputAuthorName}
						labelText='Author name'
						placeholderText='Enter author name...'
					/>
					<Button buttonText='Create Author' onClick={onCreateAuthorClick} />
				</div>
				<div className='authors'>
					<b>Authors</b>
					{authors.map((author) => {
						return (
							<div key={author.id} className='author'>
								<div className='author-name'>{author.name}</div>
								<div className='author-buttons'>
									<Button
										buttonText='Add author'
										onClick={() => onAddAuthorClick(author)}
									/>
									<Button
										buttonText='Delete author'
										onClick={() => onDeleteAuthorClick(author)}
									/>
								</div>
							</div>
						);
					})}
				</div>
				<div className='post-authors'>
					<h2>Post authors</h2>
					{!postAuthors?.length && <h3>Author list is empty</h3>}
					{postAuthors.map((author) => author.name).join(', ')}
				</div>
			</div>
		</div>
	);
};

CreatePost.propTypes = {
	onCreatePost: PropTypes.func.isRequired,
	authors: PropTypes.array.isRequired,
	onCreateAuthor: PropTypes.func.isRequired,
};

export default CreatePost;

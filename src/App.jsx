import { useState } from 'react/cjs/react.development';
import './App.css';
import Posts from './components/Posts/Posts';
import Header from './components/Header/Header';
import CreatePost from './components/CreatePost/CreatePost';
import PostInfo from './components/PostInfo/PostInfo';
import { mockedPostsList, mockedAuthorsList } from './constants';
import Registration from './components/Registration/Registration';

import Login from './components/Login/Login';

import { Routes, Route, Navigate } from 'react-router-dom';

import useUsername from './helpers/useUsername';

function App() {
	const [posts, setPosts] = useState(mockedPostsList);
	const [authors, setAuthors] = useState(mockedAuthorsList);
	const [isLoggedIn, setIsLoggedIn] = useState(true);

	const onCreateAuthorHandle = (author) => {
		if (
			!authors.find((existingAuthor) => author.name === existingAuthor.name)
		) {
			setAuthors([...authors, author]);
		}
	};

	const userName = useUsername(isLoggedIn);

	return (
		<>
			<Header
				className='header'
				userName={userName}
				isLoggedIn={isLoggedIn}
				onLogout={() => setIsLoggedIn(false)}
			/>
			<Routes>
				<Route
					exact
					path='/'
					element={<Navigate to={isLoggedIn ? '/posts' : '/login'} />}
				/>
				<Route path='/registration' element={<Registration />} />
				<Route
					path='/login'
					element={
						isLoggedIn ? (
							<Navigate to={'/posts'} />
						) : (
							<Login onLogin={() => setIsLoggedIn(true)} />
						)
					}
				/>
				<Route
					path='/posts'
					exact
					element={
						isLoggedIn ? (
							<Posts posts={posts} authors={authors} />
						) : (
							<Navigate to={isLoggedIn ? '/posts' : '/login'} />
						)
					}
				/>
				<Route
					path='/posts/add'
					element={
						isLoggedIn ? (
							<CreatePost
								authors={authors}
								onCreateAuthor={onCreateAuthorHandle}
								onCreatePost={(post) => {
									setPosts([...posts, post]);
								}}
							/>
						) : (
							<Navigate to={isLoggedIn ? '/posts' : '/login'} />
						)
					}
				/>
				<Route
					path='/posts/:postId'
					element={<PostInfo posts={posts} authors={authors} />}
				/>
			</Routes>
		</>
	);
}

export default App;

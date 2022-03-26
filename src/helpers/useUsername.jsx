import { useEffect, useState } from 'react';

const useUsername = (isLoggedIn) => {
	const [username, setUsername] = useState(null);
	useEffect(() => {
		setUsername(localStorage.getItem('username'));
	}, [isLoggedIn]);

	return username;
};

export default useUsername;

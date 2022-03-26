import { useCallback } from 'react';

const url = 'http://localhost:3000';

const usePost = (method) => {
	const post = useCallback(
		async (data) => {
			const request = await fetch(`${url}/${method}`, {
				method: 'POST',
				body: JSON.stringify(data),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			const result = await request.json();
			return result;
		},
		[method]
	);

	return post;
};

export default usePost;

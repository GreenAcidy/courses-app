import React from 'react';

const Button = ({ buttonText, onClick, type }) => {
	return (
		<button type={type} onClick={onClick}>
			{buttonText}
		</button>
	);
};

export default Button;

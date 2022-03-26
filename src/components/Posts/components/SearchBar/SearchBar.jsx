import React from 'react';

import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';

const SearchBar = ({ onChange, placeholderText, buttonText, onClick }) => {
	return (
		<>
			<Input placeholderText={placeholderText} onChange={onChange} />
			<Button buttonText={buttonText} onClick={onClick} />
		</>
	);
};

export default SearchBar;

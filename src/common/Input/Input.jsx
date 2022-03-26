import React from 'react';

const Input = ({
	type = 'text',
	value,
	min,
	labelText,
	placeholderText,
	onChange,
	isTextArea,
	inputRef,
	name,
}) => {
	const InputComponent = isTextArea ? 'textarea' : 'input';

	return (
		<>
			{labelText && <label htmlFor='inputTextId'>{labelText}</label>}
			<InputComponent
				type={type}
				value={value}
				min={min}
				ref={inputRef}
				name={name}
				onChange={onChange}
				placeholder={placeholderText}
				id='inputTextId'
			/>
		</>
	);
};

export default Input;

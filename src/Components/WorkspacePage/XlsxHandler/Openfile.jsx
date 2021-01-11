import React, { useState } from 'react';
import api from '../../../api';

const Openfile = ({ setSpinner, setAlert }) => {
	const [ xlsx, setXlsx ] = useState();

	const onFormSubmit = (e) => {
		e.preventDefault(); // Stop form submit
		setSpinner(true);
		setAlert(false);
		fileUpload(xlsx).then((res) => {
			setSpinner(false);
			// setAlert(false);
			if (res.status === 400 || 500) {
				setAlert(true);
			}
		});
	};

	const onChange = (e) => {
		setXlsx(e.target.files[0]);
	};
	const fileUpload = async (file) => {
		const formData = new FormData();
		formData.append('file', file);
		return await api.post('api/file/uploadcsv', formData);
	};
	return (
		<div>
			<form onSubmit={onFormSubmit}>
				<h1>File Upload</h1>
				<input type="file" onChange={onChange} />
				<button type="submit">Upload</button>
			</form>
		</div>
	);
};

export default Openfile;

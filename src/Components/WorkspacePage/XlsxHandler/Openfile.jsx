import Alert from 'react-bootstrap/Alert';
import React, { useEffect, useState } from 'react';
import api from '../../../api';

const Openfile = ({ setSpinner }) => {
	const [ xlsx, setXlsx ] = useState();
	const [ alert, setAlert ] = useState(false);
	useEffect(() => {}, []);

	const onFormSubmit = (e) => {
		e.preventDefault(); // Stop form submit
		fileUpload(xlsx).then((res) => {
			if (res.status === 400) {
				setSpinner(false);
				setAlert(true);
			}
			if (res.status === 200) {
				setSpinner(true);
				setAlert(false);
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
			{alert && (
				<Alert variant="danger" onClose={() => setAlert(false)} dismissible>
					<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
					<p>Upload Only CSV Files</p>
				</Alert>
			)}
		</div>
	);
};

export default Openfile;

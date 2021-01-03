import React, { useEffect, useState } from 'react';
import { ExcelRenderer } from 'react-excel-renderer';
import XLSX from 'xlsx';
import axios, { fetch } from 'axios';

const Openfile = ({ setTable, setSpinner, showSpinner, setShowImport, showImport }) => {
	useEffect(
		() => {
			setShowImport(!showSpinner);
		},
		[ showImport ]
	);

	const fileHandler = (event) => {
		console.log(event);
		console.log(event.target);
		let fileObj = event.target.files[0];
		setSpinner(true);
		setShowImport(false);
		//just pass the fileObj as parameter
		ExcelRenderer(fileObj, (err, resp) => {
			if (err) {
				console.log(err);
			} else {
				console.log(resp.rows);
				setTable({
					cols: resp.cols,
					rows: resp.rows
				});
			}
		});
	};
	const [ xlsx, setXlsx ] = useState();

	const onFormSubmit = (e) => {
		e.preventDefault(); // Stop form submit
		fileUpload(xlsx).then((response) => {
			console.log(response.data);
		});
	};

	const onChange = (e) => {
		setXlsx(e.target.files[0]);
	};
	const fileUpload = async (file) => {
		const url = 'http://localhost:5000/api/file/upload';
		const formData = new FormData();
		formData.append('file', file);
		console.log('Post');

		return await axios.post(url, formData);
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

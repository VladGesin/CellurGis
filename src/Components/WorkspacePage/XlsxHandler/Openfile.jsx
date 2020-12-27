import React, { useEffect } from 'react';
import { ExcelRenderer } from 'react-excel-renderer';
import XLSX from 'xlsx';

const Openfile = ({ setTable, setSpinner, showSpinner, setShowImport, showImport }) => {
	useEffect(
		() => {
			setShowImport(!showSpinner);
		},
		[ showImport ]
	);

	const fileHandler = (event) => {
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

	return (
		<div>{showImport && <input type="file" onChange={fileHandler.bind(this)} style={{ padding: '10px' }} />}</div>
	);
};

export default Openfile;

import React from 'react';
import { ExcelRenderer } from 'react-excel-renderer';

const Openfile = ({ setTable }) => {
	const fileHandler = (event) => {
		let fileObj = event.target.files[0];

		//just pass the fileObj as parameter
		ExcelRenderer(fileObj, (err, resp) => {
			if (err) {
				console.log(err);
			} else {
				setTable({
					cols: resp.cols,
					rows: resp.rows
				});
			}
		});
	};

	return (
		<div>
			<input type="file" onChange={fileHandler.bind(this)} style={{ padding: '10px' }} />
		</div>
	);
};

export default Openfile;

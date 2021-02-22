import React, { useState } from 'react';
import api from '../../Utiles/api.jsx';

const Openfile = ({ setSpinner, setAlert, setShowImport }) => {
  const [xlsx, setXlsx] = useState();

  const onFormSubmit = (e) => {
    e.preventDefault(); // Stop form submit
    setShowImport(false);
    setSpinner(true);
    setAlert(false);
    fileUpload(xlsx).then((res) => {
      if (res.status === 400 || 500) {
        setSpinner(false);
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

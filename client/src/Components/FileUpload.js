import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

function FileUpload() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = (acceptedFiles) => {
    // Handle uploaded files here
    setUploadedFiles([...uploadedFiles, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
    <div className="file-upload">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag and drop files here, or click to select files</p>
      </div>
      </div>
      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <p>Uploaded Files:</p>
          <ul>
            {uploadedFiles.map((file, index) => (
              <li key={index}>
                {file.name}
                {index < uploadedFiles.length - 1 && <div className="file-separator" />}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default FileUpload;

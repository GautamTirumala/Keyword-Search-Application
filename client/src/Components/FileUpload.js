import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/outline';



function FileUpload() {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onDrop = async (acceptedFiles) => {
    // Handle uploaded files here
    setUploadedFiles([...uploadedFiles, ...acceptedFiles]);

    const formData = new FormData();
    acceptedFiles.forEach((file, index) => {
      formData.append(`files`, file);
    });

    axios.post('http://localhost:5000/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => {
        console.log('result in appi/upload', res.data);
      })
      .catch((error) => {
        console.error('Error uploading files:', error);
      });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function Accept(props) {
    const {
      acceptedFiles,
      fileRejections,
      getRootProps,
      getInputProps
    } = useDropzone({
      accept: [
        '.pdf',
        '.xlsx',
        '.docx'
      ]
    });
  }
  const iconStyles = {
    width: '1.25rem',
    height: '1.25rem',
    // fill: 'currentColor',
  };





  return (
    <>
      {/* <div className="file-upload">
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
        </div>
      </div> */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className='file-upload'>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem'  }}>
            <div style={{ width: '2rem', height: '1rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                <path d="M9.25 13.25a.75.75 0 001.5 0V4.636l2.955 3.129a.75.75 0 001.09-1.03l-4.25-4.5a.75.75 0 00-1.09 0l-4.25 4.5a.75.75 0 101.09 1.03L9.25 4.636v8.614z" />
                <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
              </svg>
            </div>

            {/* Your other content */}
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag & drop files here, or click to select files</p>
            )}
          </div>
        </div>
      </div>
      </div>


      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '800px' }}>
          {uploadedFiles.length > 0 && (
            <div className="uploaded-files">
              <p>Uploaded Files:</p>
              <ul style={{ display: 'flex', flexWrap: 'wrap', padding: 0, listStyle: 'none' }}>
                {uploadedFiles.map((file, index) => (
                  <li
                    key={index}
                    style={{
                      padding: '.5em',
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {file.name}
                    {index < uploadedFiles.length - 1 && (
                      <div
                        style={{
                          marginLeft: '1em',
                          height: '1px',
                          flex: '1',
                          borderStyle: 'dotted',
                          borderColor: 'gray',
                        }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>




    </>
  );
}

export default FileUpload;

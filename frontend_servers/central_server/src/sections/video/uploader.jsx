// src/components/DropzoneUploader.js

import React, { useCallback, useState, useContext, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { curr_context } from './VideoSrc';

const DropzoneUploader = () => {
  const now_context = useContext(curr_context);
  const [videoSrc, setVideoSrc] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      const file = acceptedFiles[0];
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  }, []);

  useEffect(() => {
    now_context.set_vsrc(videoSrc);
  }, [videoSrc]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'video/*'
  });

  return (
    <div 
      {...getRootProps()}
      style={{
        padding: "20px",
        textAlign: "center",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        borderRadius: "4px",
        cursor: "pointer",
        width: "45vw",
        height: "70vh",
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(20px)",
        border: "2px solid #ddd",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
      }}
      className='flex justify-center items-center backdrop-blur-xl bg-white/40 rounded-xl shadow-xl'
    >
      <input {...getInputProps()} />
      {!videoSrc && (
        <div>
          <div style={{ fontSize: 50, color: '#9e9e9e' }}>📤</div>
          <p style={{ color: '#777' }}>
            {isDragActive ? 'Drop the files here ...' : 'Drag & drop some files here, or click to select files'}
          </p>
          <button 
            style={{
              marginTop: '10px',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Browse Files
          </button>
        </div>
      )}

      {videoSrc && (
        <div>
          <video style={{ width: "50vw", height: "60vh", display: "flex" }} controls>
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
};

export default DropzoneUploader;

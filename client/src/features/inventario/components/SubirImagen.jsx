import React from 'react';
import { Uploader, Message, Loader, useToaster } from 'rsuite';
import FileUploadIcon from '@rsuite/icons/FileUpload';
import { Popover, Whisper } from 'rsuite';

const speaker = (
  <Popover title="Subir imagen">
  </Popover>
);

function previewFile(file, callback) {
  const reader = new FileReader();
  reader.onloadend = () => {
    callback(reader.result);
  };
  reader.readAsDataURL(file);
}

const SubirImagen = () => {
  const toaster = useToaster();
  const [uploading, setUploading] = React.useState(false);
  const [fileInfo, setFileInfo] = React.useState(null);

  return (
    <Uploader
      fileListVisible={false}
      listType="picture"
      action="//jsonplaceholder.typicode.com/posts/"
      onUpload={file => {
        setUploading(true);
        previewFile(file.blobFile, value => {
          setFileInfo(value);
        });
      }}
      onSuccess={(response, file) => {
        setUploading(false);
        toaster.push(<Message type="success">Uploaded successfully</Message>);
        console.log(response);
      }}
      onError={() => {
        setFileInfo(null);
        setUploading(false);
        toaster.push(<Message type="error">Upload failed</Message>);
      }}
    >
      <Whisper placement="top" trigger="hover" controlId="control-id-hover" speaker={speaker}>
      <button style={{ width: 150, height: 150 , border: 0}}>
        {uploading && <Loader backdrop center />}
        {fileInfo ? (
          <img src={fileInfo} width="100%" height="100%" />
        ) : (
          <FileUploadIcon style={{ fontSize: 150 }} color="#3498FF"/>
        )}
      </button>
      </Whisper>
    </Uploader>
  );
};

export default SubirImagen;

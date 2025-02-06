import React, { useState } from "react";
import { Uploader, Loader } from "rsuite";
import FileUploadIcon from "@rsuite/icons/FileUpload";
import { Popover, Whisper } from "rsuite";

const speaker = (
  <Popover title="Subir imagen">
    <div>Arrastra o selecciona una imagen</div>
  </Popover>
);

function previewFile(file, callback) {
  if (!(file instanceof Blob)) return;
  const reader = new FileReader();
  reader.onloadend = () => callback(reader.result);
  reader.readAsDataURL(file);
}

const SubirImagen = () => {
  const [uploading, setUploading] = useState(false);
  const [fileInfo, setFileInfo] = useState(null);

  // Solo permite PNG, JPG o JPEG y archivos de hasta 5MB
  const verificarImagen = (file) => {
    const isValidFormat =
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg";
    const isValidSize = file.size <= 5 * 1024 * 1024;
    return isValidFormat && isValidSize;
  };

  return (
    <Uploader
      beforeUpload={verificarImagen}
      fileListVisible={false}
      listType="picture"
      action="" // Ruta de la API (vacía para funcionalidad de previsualización)
      onUpload={(file) => {
        setUploading(true);
        if (file.blobFile) {
          previewFile(file.blobFile, (result) => {
            setFileInfo(result);
            setUploading(false);
          });
        } else {
          setUploading(false);
        }
      }}
    >
      <Whisper
        placement="top"
        trigger="hover"
        controlId="control-id-hover"
        speaker={speaker}
      >
        <button
          style={{
            width: 150,
            height: 150,
            border: 0,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            backgroundColor: "transparent",
          }}
        >
          {uploading && (
            <Loader
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                zIndex: 1,
              }}
              backdrop
              center
            />
          )}
          {fileInfo ? (
            <img
              src={fileInfo}
              alt="preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                zIndex: 0,
              }}
            />
          ) : (
            <FileUploadIcon
              style={{ fontSize: 140, zIndex: 0 }}
              color="#3498FF"
            />
          )}
        </button>
      </Whisper>
    </Uploader>
  );
};

export default SubirImagen;

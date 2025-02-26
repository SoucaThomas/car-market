"use client";

import { useCallback, useState, useEffect } from "react";

interface MyDropzoneProps {
  onChange: (fileUrls?: string[]) => void;
}

export const MyDropzone: React.FC<MyDropzoneProps> = ({ onChange }) => {
  const [fileUrls, setFileUrls] = useState<string[]>([]);
  const { startUpload } = useUploadThing("imageUploader", {
    onClientUploadComplete: (res) => {
      // Do something with the response
      console.log("Files: ", res);
      if (res) {
        const urls = res.map((file) => file?.fileUrl);
        setFileUrls((prev) => [...prev, ...urls]);
        onChange([...fileUrls, ...urls]); // Update the form value
      }
      alert("Upload Completed!");
    },
    onUploadError: (error) => {
      // Do something with the error.
      alert(`ERROR! ${error.message}`);
    },
  });

  useEffect(() => {
    onChange(fileUrls);
  }, [fileUrls, onChange]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Do something with the files
      startUpload(acceptedFiles);
    },
    [startUpload]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png", ".jpg", ".gif", ".svg"],
    },
  });

  return (
    <div {...getRootProps()} className="rounded-md border-2 border-dashed p-4">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

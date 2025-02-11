import React from 'react'
import { FiFileText, FiX } from 'react-icons/fi';

const MediaPreview = ({file, setFile, preview, setPreview, fileInputRef}) => {
  return (
    <div className="absolute bottom-14 right-16 p-1 z-10 max-w-full ml-2 border-1 rounded-lg shadow-md bg-background-fill text-text-primary/60">
        <button
        className="absolute -top-9 right-0 rounded-md p-1 z-10 text-error bg-background-fill"
        onClick={() => {
            setFile(null);
            setPreview(null);
            if (fileInputRef.current) fileInputRef.current.value = ""
        }}
        >
            <FiX className="text-2xl" />
        </button>

        {preview && file.type.startsWith("image/") && (
        <img
            src={preview}
            alt="Preview"
            className="w-full max-h-96 object-cover rounded-lg"
        />
        )}

        {preview && file.type.startsWith("video/") && (
        <video controls className="w-full max-h-96 rounded-lg">
            <source src={preview} type={file.type} />
            Your browser does not support the video tag.
        </video>
        )}

        {!preview && (
        <div className="flex items-center gap-1">
            <FiFileText className="text-xl" />
            <span className="text-sm">{file.name}</span>
        </div>
        )}
    </div>
  )
}

export default MediaPreview

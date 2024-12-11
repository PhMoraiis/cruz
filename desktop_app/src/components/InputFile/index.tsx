import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { X, FileUp } from 'lucide-react'
import { Button } from '../ui/button'

interface FileInputProps {
  onChange: (file: File | null) => void
  value: File | null
  accept?: string
  placeholder?: string
}

export function FileInput({ onChange, value, accept, placeholder }: FileInputProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles[0])
  }, [onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept ? { 'text/plain': [accept] } : undefined,
    maxFiles: 1
  })

  return (
    <div
      {...getRootProps()}
      className={`relative border-2 border-dashed rounded-md p-4 w-full ${
        isDragActive ? 'border-primary' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      {value ? (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileUp className="h-6 w-6 text-primary" />
            <span className="text-sm">{value.name}</span>
          </div>
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              onChange(null)
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <FileUp className="mx-auto h-8 w-8 text-gray-500" />
          <p className="mt-2 text-sm text-gray-400">
            {isDragActive ? 'Drop the file here' : placeholder || 'Drag & drop a file here, or click to select'}
          </p>
        </div>
      )}
    </div>
  )
}


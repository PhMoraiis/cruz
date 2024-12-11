export interface UploadStatus {
  isUploading: boolean;
  progress: number;
  error: string | null;
  downloadUrl: string | null;
}

export interface FileUpload {
  file: File | null;
  status: UploadStatus;
}

export interface UploadState {
  file1: FileUpload;
  file2: FileUpload;
  file3: FileUpload;
  file4: FileUpload;
}
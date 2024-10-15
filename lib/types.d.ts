export interface IStudent {
  id: string;
  name: string;
  registrationNumber: string;
  major: string;
  dob: string;
  gpa: number;
}

export interface IStudentUploadProps {
  id?: string;
  name?: string;
  registrationNumber?: string;
  major?: string;
  dob?: string;
  gpa?: number;
}

export interface APIError {
  message: string;
}

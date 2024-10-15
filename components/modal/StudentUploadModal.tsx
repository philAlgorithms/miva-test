/**
 * This component handles both ddition and editing of students depending
 * on whether the student prop is undefined (creation) or not (updating);
 */
import { IStudent, IStudentUploadProps } from '@/lib/types';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import * as Yup from 'yup';
import FormError from '../form/FormError';

// This interface extends Chakra's ModalProps but the interface does not rquire children,
// Hence the `children` property must be omitted
export interface IStudentUploadModal extends Omit<ModalProps, 'children'> {
  student?: IStudent;
}

const inputSchema = Yup.object({
  name: Yup.string().required(),
  dob: Yup.string().required('Date of birth is required'),
  major: Yup.string().required('What does the student major in?'),
  registrationNumber: Yup.string().required().min(1),
  gpa: Yup.number()
    .required()
    .min(0, ').0 is the minimum GPA')
    .max(5, 'The GPA cannot exceed 5.0'),
});

const StudentUploadModal: React.FC<IStudentUploadModal> = ({
  student,
  ...modalProps
}) => {
  const [uploading, setIsUploading] = useState<boolean>(false);
  const router = useRouter();
  const cancelRef = useRef();

  const handleCreate = async (values: IStudentUploadProps) => {
    setIsUploading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/students`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        alert(`Student created`);
        router.reload();
      } else {
        alert('Failed to create new student');
      }
    } catch (error) {
      console.log('Error Uploading student:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleUpdate = async (id: string, values: IStudentUploadProps) => {
    setIsUploading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOST}/api/students/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        alert(`Student details updated.`);
        router.reload();
      } else {
        alert('Failed to update student details');
      }
    } catch (error) {
      console.log('Error Uploading student:', error);
    } finally {
      setIsUploading(false);
    }
  };
  return (
    <Modal {...modalProps}>
      <ModalOverlay />
      <ModalContent>
        <Formik<IStudentUploadProps>
          initialValues={student ? student : {}}
          validationSchema={inputSchema}
          onSubmit={async (values) => {
            student ? handleUpdate(student.id, values) : handleCreate(values);
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              <ModalHeader>Create your account</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Student's Name"
                    name="name"
                    id="name"
                    onChange={props.handleChange}
                    defaultValue={student?.name}
                  />
                  {props.errors.name && (
                    <FormError className="mt-2">{props.errors.name}</FormError>
                  )}
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Major</FormLabel>
                  <Input
                    placeholder="Major"
                    name="major"
                    id="major"
                    defaultValue={student?.name}
                    onChange={props.handleChange}
                  />
                  {props.errors.major && (
                    <FormError className="mt-2">{props.errors.major}</FormError>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>registration number</FormLabel>
                  <Input
                    placeholder="Registration Number"
                    name="registrationNumber"
                    id="registrationNumber"
                    onChange={props.handleChange}
                    defaultValue={student?.registrationNumber}
                  />
                  {props.errors.registrationNumber && (
                    <FormError className="mt-2">
                      {props.errors.registrationNumber}
                    </FormError>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>GPA</FormLabel>
                  <Input
                    placeholder="GPA"
                    type="number"
                    name="gpa"
                    id="gpa"
                    step={'.01'}
                    onChange={props.handleChange}
                    defaultValue={student?.gpa}
                  />
                  {props.errors.gpa && (
                    <FormError className="mt-2">{props.errors.gpa}</FormError>
                  )}
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Date of Birth</FormLabel>
                  <Input
                    placeholder="Select Date and Time"
                    type="datetime-local"
                    name="dob"
                    id="dob"
                    onChange={props.handleChange}
                  />
                  {props.errors.dob && (
                    <FormError className="mt-2">{props.errors.dob}</FormError>
                  )}
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  type="submit"
                  disabled={uploading}
                >
                  {student ? 'Update' : 'Add'}
                </Button>
                <Button onClick={modalProps.onClose}>Cancel</Button>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  );
};

export default StudentUploadModal;

import { IStudent } from '@/lib/types';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { RefObject, useRef, useState } from 'react';
import StudentUploadModal from '../modal/StudentUploadModal';

export interface IStudentDetailsSection
  extends React.ComponentPropsWithoutRef<'section'> {
  student: IStudent;
}

const StudentDetailsSection: React.FC<IStudentDetailsSection> = ({
  student,
  className,
  ...sectionProps
}) => {
  const {
    isOpen: editModalIsOpen,
    onOpen: onOpenEditModal,
    onClose: onCloseEditModal,
  } = useDisclosure();
  const {
    isOpen: deleteModalIsOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();
  const [deleting, setIsDeleting] = useState<boolean>(false);
  const router = useRouter();
  const cancelRef = useRef();

  const handleDelete = async (id: string) => {
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert(`Student deleted`);
        setTimeout(() => {
          router.push('/students');
        }, 500); // Go to students listing
      } else {
        alert('Failed to delete student');
      }
    } catch (error) {
      console.log('Error deleting student:', error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <section className={`${className}`} {...sectionProps}>
        <div className="font-ralweway">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div className="px-4 sm:px-0">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Student Details
              </h3>
            </div>

            <span className="flex flex-row gap-x-4 px-4 sm:px-0 pt-4 sm:pt-0 flex-shrink">
              <Button colorScheme="blue" onClick={onOpenEditModal}>
                Edit Student
              </Button>
              <Button
                colorScheme="red"
                onClick={onOpenDeleteModal}
                disabled={deleting}
              >
                Delete Student
              </Button>
            </span>
          </div>
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Name
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">{student.name}</span>
                </dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Registration Number
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">
                    {student.registrationNumber}
                  </span>
                </dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Major
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">{student.major}</span>
                </dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  GPA
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">{student.gpa}</span>
                </dd>
              </div>
              <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Date of Birth
                </dt>
                <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <span className="flex-grow">
                    <time dateTime={student.dob}>
                      {format(student.dob, 'EEEE, MMMM do, yyyy')}
                    </time>
                  </span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>
      <StudentUploadModal
        student={student}
        isOpen={editModalIsOpen}
        onClose={onCloseEditModal}
      />
      <AlertDialog
        isOpen={deleteModalIsOpen}
        leastDestructiveRef={cancelRef as RefObject<any>}
        onClose={onCloseDeleteModal}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef as RefObject<any>}
                onClick={onCloseDeleteModal}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDelete(student.id)}
                ml={3}
                disabled={deleting}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default StudentDetailsSection;

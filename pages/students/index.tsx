import StudentCard from '@/components/card/StudentCard';
import Layout from '@/components/layout/Layout';
import StudentUploadModal from '@/components/modal/StudentUploadModal';
import { IStudent } from '@/lib/types';
import {
  Button,
  Grid,
  GridItem,
  Heading,
  useDisclosure,
} from '@chakra-ui/react';
import Link from 'next/link';
import { NextPageWithLayout } from '../page';

export interface IStudentsPage {
  students: IStudent[];
}

const StudentsPage: NextPageWithLayout<IStudentsPage> = ({ students }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <div className="flex flex-row justify-between align-center mt-6 md:mt-10">
        <Heading className="">Student Listing</Heading>
        <Button colorScheme="green" onClick={onOpen}>
          Add Student
        </Button>
      </div>
      <Grid
        className="grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mt-3 md:mt-5"
        gap={6}
      >
        {students.map((student, i) => (
          <GridItem
            key={student.id + i}
            w="100%"
            className="h-fit"
            shadow={'lg'}
          >
            <Link href={`/students/${student.id}`}>
              <StudentCard student={student} />
            </Link>
          </GridItem>
        ))}
      </Grid>{' '}
      <StudentUploadModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default StudentsPage;

StudentsPage.getLayout = (page) => {
  return <Layout title="Miva University - Students List">{page}</Layout>;
};

export async function getStaticProps() {
  let students: IStudent[] = [];
  // Call the internal API endpoint to get students.
  // You can use any data fetching library
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/students`);

    students = await res.json().catch(() => {
      return [];
    });
  } catch (e) {
    console.error('Failed to fetch', e);
  }

  // By returning { props: { students } }, the Blog component
  // will receive `students` as a prop at build time
  return {
    props: {
      students,
    },
  };
}

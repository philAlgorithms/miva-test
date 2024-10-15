import StudentCard from '@/components/card/StudentCard';
import Layout from '@/components/layout/Layout';
import { IStudent } from '@/lib/types';
import { Grid, GridItem } from '@chakra-ui/react';
import { NextPageWithLayout } from '../page';

export interface IStudentsPage {
  students: IStudent[];
}

const StudentsPage: NextPageWithLayout<IStudentsPage> = ({ students }) => {
  return (
    <>
      <Grid
        className="grid-cols-1 md:grid-cols-3 xl:grid-cols-4 mt-4 md:mt-6"
        gap={6}
      >
        {students.map((student, i) => (
          <GridItem
            key={student.id + i}
            w="100%"
            className="h-fit"
            shadow={'lg'}
          >
            <StudentCard student={student} />
          </GridItem>
        ))}
      </Grid>
    </>
  );
};

export default StudentsPage;

StudentsPage.getLayout = (page) => {
  return <Layout title="Miva University - Students List">{page}</Layout>;
};

export async function getStaticProps() {
  // Call the internal API endpoint to get students.
  // You can use any data fetching library
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/students`);
  const students: IStudent[] = await res.json().catch(() => {
    return [];
  });

  // By returning { props: { students } }, the Blog component
  // will receive `students` as a prop at build time
  return {
    props: {
      students,
    },
  };
}

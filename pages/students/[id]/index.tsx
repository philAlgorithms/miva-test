import Layout from '@/components/layout/Layout';
import StudentDetailsSection from '@/components/section/StudentDetailsSection';
import { IStudent } from '@/lib/types';
import { GetStaticPaths } from 'next';
import { NextPageWithLayout } from '../../page';

export interface IStudentPage {
  student: IStudent;
}

const StudentPage: NextPageWithLayout<IStudentPage> = ({ student }) => {
  return (
    <>
      <StudentDetailsSection student={student} className={`mt-16 w-full`} />
    </>
  );
};

export default StudentPage;

StudentPage.getLayout = (page) => {
  return <Layout title={`Miva University - Student Details`}>{page}</Layout>;
};
export const getStaticPaths = (async () => {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    };
  }

  let students: IStudent[] = [];
  // Call an external API endpoint to get students
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/students`);
    students = await res.json().catch(() => {
      return [];
    });
  } catch (e) {
    console.error('Failed to fetch', e);
  }

  // Get the paths we want to prerender based on students
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = students.map((student) => ({
    params: { id: student.id },
  }));

  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}) satisfies GetStaticPaths;

export async function getStaticProps({ params }: { params: { id: string } }) {
  let student: IStudent | null = null;
  // Call the internal API endpoint to get students.
  // You can use any data fetching library
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/students/${params.id}`
    );
    student = await res.json().catch(() => {
      return null;
    });
  } catch (e) {
    console.error('Failed to fetch', e);
  }

  // By returning { props: { students } }, the Blog component
  // will receive `students` as a prop at build time
  return student === null
    ? {
        notFound: true,
      }
    : {
        props: {
          student,
        },
      };
}

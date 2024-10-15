import { IStudent } from '@/lib/types';
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CardProps,
  Heading,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';

export interface IStudentCard extends CardProps {
  student: IStudent;
}

const StudentCard: React.FC<IStudentCard> = ({
  student,
  className,
  ...cardProps
}) => {
  return (
    <Card className={`${className}`} {...cardProps}>
      <CardHeader>
        <Heading size="md">{student.name}</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Major
            </Heading>
            <Text pt="2" fontSize="sm">
              {student.major}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              GPA
            </Heading>
            <Text pt="2" fontSize="sm">
              {student.gpa}
            </Text>
          </Box>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default StudentCard;

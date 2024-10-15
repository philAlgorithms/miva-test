import { APIError, IStudent } from '@/lib/types';
import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

// Get the path to the student records JSON file
const filePath = path.join(process.cwd(), 'lib', 'students.json');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IStudent | APIError>
) {
  const { method } = req;
  const { id } = req.query;

  try {
    const data = await fs.readFile(filePath, 'utf8');
    let students: IStudent[] = JSON.parse(data);

    const studentIndex = students.findIndex((student) => student.id === id);

    if (studentIndex === -1) {
      return res.status(404).json({ message: 'Student not found' });
    }

    switch (method) {
      // Get a student by ID
      case 'GET':
        res.status(200).json(students[studentIndex]);
        break;

      // Update a student by ID
      case 'PUT':
        students[studentIndex] = { ...students[studentIndex], ...req.body };
        await fs.writeFile(filePath, JSON.stringify(students, null, 2));
        res.status(200).json({ message: 'Student updated successfully' });
        break;

      // Delete a student by ID
      case 'DELETE':
        students.splice(studentIndex, 1);
        await fs.writeFile(filePath, JSON.stringify(students, null, 2));
        res.status(200).json({ message: 'Student deleted successfully' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to handle request' });
  }
}

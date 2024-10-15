import { APIError, IStudent } from '@/lib/types';
import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';

// Get the path to the student records JSON file
const filePath = path.join(process.cwd(), 'lib', 'students.json');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IStudent | IStudent[] | APIError>
) {
  const { method } = req;

  try {
    const data = await fs.readFile(filePath, 'utf8');
    let students: IStudent[] = JSON.parse(data);

    switch (method) {
      // Get all students
      case 'GET':
        res.status(200).json(students);
        break;

      // Add a new student
      case 'POST':
        const newStudent: IStudent = req.body;
        newStudent.id = (students.length + 1).toString();
        students.push(newStudent);
        await fs.writeFile(filePath, JSON.stringify(students, null, 2));
        res.status(201).json(newStudent);
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to handle request' });
  }
}

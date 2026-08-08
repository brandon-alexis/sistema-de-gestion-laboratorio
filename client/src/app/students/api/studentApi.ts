import { api } from '@shared/api/axios';
import type { ResponseStudentDto } from '@students/dto/ResponseStudentDto';
import type { StudentDto } from '../dto/StudentDto';

const endpoint = '/students';

export const studentApi = {
  getStudents: async (): Promise<ResponseStudentDto[]> => {
    const { data } = await api.get(endpoint);

    return data;
  },
  createStudent: async (student: StudentDto): Promise<{ message: string }> => {
    const { data } = await api.post(endpoint, student);

    return data;
  },
  deleteStudent: async (id: string): Promise<{ message: string }> => {
    const { data } = await api.delete(`${endpoint}/${id}`);

    return data;
  },
};

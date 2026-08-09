import { useNavigate } from 'react-router';

import { toast } from '@/components/ui/toast';
import { Main } from '@/shared/layouts/Main';

import { StudentForm } from '@students/components/StudentForm';
import type { StudentDto } from '@students/dto/StudentDto';
import { studentApi } from '@students/api/studentApi';

export function CreateStudentPage() {
  const navigate = useNavigate();

  async function handleCreate(student: StudentDto) {
    const promise = studentApi.createStudent(student);

    toast.promise(promise, {
      loading: 'Registrando estudiante',
      success: (data: { message: string }) => {
        return `${data.message}`;
      },
      error: (error) => {
        return error.response?.data?.error ?? 'Error registrando estudiante';
      },
    });

    promise.then(() => {
      navigate('/students');
    });
  }

  return (
    <Main>
      <StudentForm onSubmit={handleCreate} />
    </Main>
  );
}

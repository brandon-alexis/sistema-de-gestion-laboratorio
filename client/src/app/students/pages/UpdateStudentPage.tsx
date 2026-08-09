import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { studentApi } from '@students/api/studentApi';
import type { StudentDto } from '@students/dto/StudentDto';
import { StudentForm } from '@students/components/StudentForm';
import { toast } from '@/components/ui/toast';

export function UpdateStudentPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [student, setStudent] = useState<StudentDto>();

  useEffect(() => {
    if (!id) return;

    let cancelled = false;

    async function loadStudent() {
      const data = await studentApi.getStudentById(id ?? '');

      if (!cancelled) {
        setStudent(data);
      }
    }

    loadStudent();

    return () => {
      cancelled = true;
    };
  }, [id]);

  async function handleSubmit(data: StudentDto) {
    if (!id) return;

    const promise = studentApi.updateStudent(id, data);

    toast.promise(promise, {
      loading: 'Actualizando estudiante',
      success: (data: { message: string }) => {
        return `${data.message}`;
      },
      error: (error) => {
        return error.response?.data?.error ?? 'Error actualizando ';
      },
    });

    promise.then(() => {
      navigate('/students');
    });
  }

  if (!student) {
    return <p>Cargando...</p>;
  }

  return <StudentForm student={student} onSubmit={handleSubmit} />;
}

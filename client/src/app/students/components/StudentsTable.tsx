import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { studentApi } from '@students/api/studentApi';
import type { ResponseStudentDto } from '@students/dto/ResponseStudentDto';
import { StudentRow } from '@students/components/StudentRow';

export function StudentsTable() {
  const [students, setStudents] = useState<ResponseStudentDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  async function loadStudents() {
    try {
      const data = await studentApi.getStudents();

      setStudents(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  if (loading) {
    return <span>Loading...</span>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Id</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {students.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              No hay estudiantes registrados.
            </TableCell>
          </TableRow>
        ) : (
          students.map(({ id, documentNumber, fullname }) => (
            <StudentRow
              key={id}
              id={id}
              documentNumber={documentNumber}
              fullname={fullname}
              onDeleted={loadStudents}
            />
          ))
        )}
      </TableBody>
    </Table>
  );
}

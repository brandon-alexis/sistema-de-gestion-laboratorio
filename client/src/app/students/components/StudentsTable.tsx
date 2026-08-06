import { useEffect, useState } from 'react';

import { studentApi } from '@students/api/studentApi';
import type { ResponseStudentDto } from '@students/dto/ResponseStudentDto';
import { StudentRow } from './StudentRow';

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
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead className="bg-base-300">
          <tr>
            <th>Nombre completo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {students.map(({ id, fullname, documentNumber }) => (
            <StudentRow
              key={id}
              fullname={fullname}
              documentNumber={documentNumber}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

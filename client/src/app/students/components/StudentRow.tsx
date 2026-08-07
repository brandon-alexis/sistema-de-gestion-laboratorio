import { Link } from 'react-router';
import { toast } from 'sonner';
import { TableCell, TableRow } from '@/components/ui/table';
import { ButtonGroup } from '@/components/ui/button-group';
import { Button } from '@/components/ui/button';
import { studentApi } from '@students/api/studentApi';

interface StudentRow {
  id: string;
  fullname: string;
  documentNumber: string;
  onDeleted: () => Promise<void>;
}

export function StudentRow({
  id,
  fullname,
  documentNumber,
  onDeleted,
}: StudentRow) {
  async function deleteStudent() {
    const promise = studentApi.deleteStudent(id);
    toast.promise(promise, {
      loading: 'Cargando...',
      success: (data: { message: string }) => {
        return `${data.message}`;
      },
      error: 'Hubo un eror eliminando el estudiante',
    });

    await promise;
    await onDeleted();
  }

  return (
    <TableRow>
      <TableCell>{documentNumber}</TableCell>
      <TableCell>{fullname}</TableCell>
      <TableCell>
        <ButtonGroup>
          <Button variant="outline">
            <Link
              to={`/students/edit/${id}`}
              className="w-full h-full flex justify-center items-center"
            >
              Editar
            </Link>
          </Button>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={() => deleteStudent()}
          >
            Eliminar
          </Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
}

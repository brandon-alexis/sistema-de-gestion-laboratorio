import { Link } from 'react-router';
import { FaPlus } from 'react-icons/fa';
import { Button } from '@/components/ui/button';

import { Main } from '@shared/layouts/Main';
import { StudentsTable } from '@students/components/StudentsTable';

export function Students() {
  return (
    <Main>
      <section className="space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Estudiantes</h1>

            <p className="mt-2">
              Gestiona los estudiantes registrados en el laboratorio.
            </p>
          </div>

          <Button className="cursor-pointer">
            <Link to="/students/create" className="flex gap-2">
              <FaPlus />
              Nuevo estudiante
            </Link>
          </Button>
        </header>

        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body bg-white">
            <StudentsTable />
          </div>
        </div>
      </section>
    </Main>
  );
}

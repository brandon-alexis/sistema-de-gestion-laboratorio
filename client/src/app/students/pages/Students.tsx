import { Link } from 'react-router';
import { FaPlus } from 'react-icons/fa';

import { Main } from '@shared/layouts/Main';
import { StudentsTable } from '@students/components/StudentsTable';

export function Students() {
  return (
    <Main>
      <section className="space-y-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">Estudiantes</h1>

            <p className="mt-2 text-base-content/70">
              Gestiona los estudiantes registrados en el laboratorio.
            </p>
          </div>

          <Link to="/students/create" className="btn btn-primary gap-2">
            <FaPlus />
            Nuevo estudiante
          </Link>
        </header>

        <div className="card bg-base-100 shadow-md border border-base-300">
          <div className="card-body">
            <StudentsTable />
          </div>
        </div>
      </section>
    </Main>
  );
}

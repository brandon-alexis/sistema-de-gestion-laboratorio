import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';

import { Main } from '@/shared/layouts/Main';
import type { StudentDto } from '@students/dto/StudentDto';

const studentSchema = z.object({
  fullname: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres.')
    .max(100, 'El nombre no puede superar los 100 caracteres.'),

  documentNumber: z
    .string()
    .min(5, 'El documento debe tener al menos 5 caracteres.')
    .max(20, 'El documento no puede superar los 20 caracteres.'),
});

interface StudentFormProps {
  student?: StudentDto;
  onSubmit: (data: StudentDto) => Promise<void>;
}

export function StudentForm({ student, onSubmit }: StudentFormProps) {
  const isEditing = Boolean(student);

  const form = useForm<StudentDto>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fullname: student?.fullname ?? '',
      documentNumber: student?.documentNumber ?? '',
    },
  });

  async function handleSubmit(data: StudentDto) {
    await onSubmit(data);
  }

  return (
    <Main className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {isEditing ? 'Editar estudiante' : 'Registrar estudiante'}
          </CardTitle>

          <CardDescription>
            {isEditing
              ? 'Actualiza los datos del estudiante.'
              : 'Ingresa los datos del nuevo estudiante.'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form id="student-form" onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldGroup>
              <Controller
                name="documentNumber"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="student-form-document">
                      Número de documento
                    </FieldLabel>

                    <Input
                      {...field}
                      id="student-form-document"
                      type="text"
                      placeholder="Ej. 1234567890"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="fullname"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="student-form-fullname">
                      Nombre completo
                    </FieldLabel>

                    <Input
                      {...field}
                      id="student-form-fullname"
                      placeholder="Ej. Juan Pérez"
                      autoComplete="name"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <div className="grid grid-cols-2 gap-2 px-3">
          <Button
            type="submit"
            form="student-form"
            className="cursor-pointer"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? 'Guardando...'
              : isEditing
                ? 'Actualizar estudiante'
                : 'Registrar estudiante'}
          </Button>
          <Button variant="destructive">
            <Link
              to="/students"
              className="w-full h-full flex items-center justify-center"
            >
              Cancelar
            </Link>
          </Button>
        </div>
      </Card>
    </Main>
  );
}

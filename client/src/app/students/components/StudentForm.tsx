import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

type StudentFormValues = z.infer<typeof studentSchema>;

interface StudentFormProps {
  student?: StudentFormValues;
  onSubmit: (data: StudentFormValues) => Promise<void>;
}

export function StudentForm({ student, onSubmit }: StudentFormProps) {
  const isEditing = Boolean(student);

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      fullname: student?.fullname ?? '',
      documentNumber: student?.documentNumber ?? '',
    },
  });

  async function handleSubmit(data: StudentFormValues) {
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

        <CardFooter>
          <Button
            type="submit"
            form="student-form"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? 'Guardando...'
              : isEditing
                ? 'Actualizar estudiante'
                : 'Registrar estudiante'}
          </Button>
        </CardFooter>
      </Card>
    </Main>
  );
}

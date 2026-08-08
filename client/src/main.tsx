import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router';
import { Toaster } from 'sonner';

import '@/index.css';
import App from '@/App.tsx';
import { StudentsPage } from '@students/pages/StudentsPage.tsx';
import { CreateStudentPage } from '@students/pages/CreateStudentPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="students">
          <Route index element={<StudentsPage />} />
          <Route path="create" element={<CreateStudentPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Toaster />
  </StrictMode>,
);

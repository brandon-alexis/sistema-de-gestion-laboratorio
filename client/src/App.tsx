import { Link } from 'react-router';
import { Main } from '@shared/layouts/Main';

export default function App() {
  return (
    <Main>
      <Link className="btn" to="students">
        Students
      </Link>
    </Main>
  );
}

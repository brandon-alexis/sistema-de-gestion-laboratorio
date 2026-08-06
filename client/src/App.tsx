import { Main } from '@shared/layouts/Main';
import { Link } from 'react-router';

export default function App() {
  return (
    <Main>
      <Link className="btn" to="students">
        Students
      </Link>
    </Main>
  );
}

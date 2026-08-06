import { FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router';

interface StudentRow {
  fullname: string;
  documentNumber: string;
}

export function StudentRow({ fullname, documentNumber }: StudentRow) {
  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle h-12 w-12">
              <img
                src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <div className="font-bold">{fullname}</div>
            <div className="text-sm opacity-50">{documentNumber}</div>
          </div>
        </div>
      </td>
      <td className="flex gap-5">
        <Link to="" className="btn btn-warning">
          <FaRegEdit />
        </Link>
        <Link to="" className="btn btn-error">
          <FaRegTrashAlt />
        </Link>
      </td>
    </tr>
  );
}

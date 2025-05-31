import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { selectDocuments } from "../features/documents/documentsSlice";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const documents = useSelector(selectDocuments);

  if (!user) {
    return <div className="p-4 text-gray-400">Please login to view your documents.</div>;
  }

  return (
    <div className="w-64 bg-gray-900 text-white p-4">
      <p className="mb-4">Welcome, {user.email}</p>
      <button className="btn mb-2">+ New Document</button>
      <ul>
        {documents?.map((doc) => (
          <li key={doc.id} className="hover:bg-gray-700 p-2 rounded">
            {doc.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

import { deleteUser } from '../../context/members/actions';
import { useUsersDispatch, useUsersState } from '../../context/members/context';

export default function MemberListItems() {
  const state: any = useUsersState();
  const dispatchMember = useUsersDispatch();

  const handleDelete = (id: number) => {
    deleteUser(dispatchMember, id);
  };

  const { users, isLoading, isError, errorMessage } = state;

  if (users.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      {users.map((user: any) => (
        <div
          key={user.id}
          id="member"
          className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            {user.name}
          </h5>
          <p className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            Email: {user.email}
          </p>
          <button
            className="text-red-500 hover:text-red-700"
            onClick={() => handleDelete(user.id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9M9.26 9l.346 9M19 13H5"
              />
            </svg>
          </button>
        </div>
      ))}
    </>
  );
}

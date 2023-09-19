import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const userDataString = localStorage.getItem("userData");
  let userData = {};

  try {
    if (userDataString) {
      userData = JSON.parse(userDataString);
    }
  } catch (error) {
    console.error("Error parsing userData:", error);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Dashboard</h1>
      <p>{userData.email}</p>
      <p>{userData.name}</p>
      <button className="block bg-gray-700 text-xl hover:gray-800 w-full" id="logout-link" onClick={() => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userData");
        navigate('/signin');
      }}>logout</button>
    </div>
  );
};

export default Dashboard;

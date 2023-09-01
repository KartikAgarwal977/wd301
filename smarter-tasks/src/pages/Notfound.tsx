import { useNavigate } from "react-router-dom";

function Notfound() {
    const navigate = useNavigate();
    const backToHomeButton = () => {
        navigate("/home");
    }
  return (
      <div className="max-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
              
      <h1 className=" text-6xl font-semibold">404, Page Not found</h1>
      <button
                  className="w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray"
                  id="backToHomeButton"
                  onClick={backToHomeButton}
        >
        back to Home
      </button>
          </div>
    </div>
  );
}
export default Notfound;

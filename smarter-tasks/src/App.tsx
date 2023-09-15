import "./App.css";
import HomePage from "./pages/HomePage";
import TaskListPage from "./pages/TaskListPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
// import TaskApp from "./TaskApp";
import ReactPlayground from "./ReactPlayground";
import Signin from "./pages/Signin";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import Notfound from "./pages/Notfound";

// import TaskList from "./TaskList";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/signin" replace />,
  },
  {
    path: "/signin",
    element: <Signin />,
  },
  {
    path: "/*",
    element: <Navigate to="/notfound" replace />,
  },
  {
    path: "/notfound",
    element: <Notfound/>,
  },
  {
    element:(
      <ProtectedRoute>
        <Layout />
        </ProtectedRoute>),
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/tasks",
        element: <TaskListPage />,
      },
      {
        path: "/tasks/:id",
        element: <TaskDetailsPage />,
      },
    ],
  },
]);
const App = () => {
  return (
    <>
      <ReactPlayground />
      <RouterProvider router={router} />
    </>
  )
}
// function App() {
//   return (
//     <div className="App">
//       <TaskApp />
//     </div>
//   );
// }

export default App;

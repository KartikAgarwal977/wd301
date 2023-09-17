import "./App.css";
import HomePage from "./pages/HomePage";
import TaskListPage from "./pages/TaskListPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
// import TaskApp from "./TaskApp";
import Form from "./Form";
import ReactPlayground from "./ReactPlayground";
import Signin from "./pages/Signin";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Notfound from "./pages/Notfound";
import Signup from "./pages/signup";

// import TaskList from "./TaskList";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/Signup",
    element: <Signup/>,
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
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  }
  // {
  //   element:(
  //     <ProtectedRoute>
  //       <Layout />
  //       </ProtectedRoute>),
  //   children: [
  //     {
  //       path: "/home",
  //       element: <HomePage />,
  //     },
  //     {
  //       path: "/tasks",
  //       element: <TaskListPage />,
  //     },
  //     {
  //       path: "/tasks/:id",
  //       element: <TaskDetailsPage />,
  //     },
  //   ],
  // },
]);
const App = () => {
  return (
    <div>
      <Form />
      {/* <ReactPlayground /> */}
      <RouterProvider router={router} />
    </div>
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

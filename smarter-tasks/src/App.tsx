import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./ProtectedRoute";
import Notfound from "./pages/Notfound";
import Signup from "./pages/signup";
import Signin from "./pages/signin";

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
  },
  {
    path: "/logout"
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

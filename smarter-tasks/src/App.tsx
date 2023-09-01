import "./App.css";
import HomePage from "./pages/HomePage";
import TaskListPage from "./pages/TaskListPage";
import TaskDetailsPage from "./pages/TaskDetailsPage";
// import TaskApp from "./TaskApp";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";

// import TaskList from "./TaskList";
const router = createBrowserRouter([
  {
    element: (
      <Layout />
    ),
    children: [
      {
        path: "/",
        element: (<HomePage/>),
      },
      {
        path: '/tasks',
        element: (<TaskListPage/>),
      },
      {
        path: "tasks/:id",
        element: (<TaskDetailsPage/>)
      }
    ]
  }
  
])
const App = () => {
  return (
    <RouterProvider router={router} />
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

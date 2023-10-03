import { Navigate, createBrowserRouter } from "react-router-dom";
import ProjectDetails from "../pages/project_details/ProjectDetails";
import Signin from "../pages/signin"
import Signup from "../pages/signup"
import ProtectedRoute from "./ProtectedRoutes";
import AccountLayout from "../layouts/account";
import Projects from "../pages/projects";
import Members from "../pages/members";
import Logout from "../pages/logout";
import Notfound from "../pages/Notfound";
import NewTask from "../pages/tasks/NewTask";
import TaskDetailsContainer from "../context/task/TaskDetailsContainer";
import ProjectContainer from "../pages/projects/ProjectContainer";
const router = createBrowserRouter([
    { path: "/", element: <Navigate to="/account/projects" replace /> },

  {
    path: "/", 
    element: <Signin />
  },
  {
    path: "/signin", 
    element: <Signin />
  },
  {
    path: "/signup", 
    element: <Signup />
    },
    {
        path: "/logout",
    element:<Logout/>
  },
  {
    path: "/notfound",
    element: <Notfound/>
  },
  {
    path: "/*",
    element: <Notfound/>
    },
    {
        path: "account",
        element:  (
            <ProtectedRoute>
              <AccountLayout />
            </ProtectedRoute>
        ),
        children: [
        {index: true,element: <Navigate to = "/account/projects" replace/>},
            {
              path: "projects",
              element: <ProjectContainer />,
              children: [
                { index: true, element: <Projects /> },
                {
                  path: ":projectID",
                  element: <ProjectDetails/>,
                  children: [
                    { index: true, element: <></> },
                    {
                      path: "tasks",
                      children: [
                        { index: true, element: <Navigate to="../" /> },
                        { path: "new", element:<NewTask/> },
                        {
                          path: ":taskID",
                          children: [{ index: true, element: <TaskDetailsContainer /> }],
                        },
                      ],
                    },
                  ],
                },
              ]
            },
            {
              path: "members",
              element: (<Members />)
            },
          ],
        },
]);
export default router;

import React, { useContext } from "react";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes"
import { ThemeContext } from "./context/theme";
import { ProjectsProvider } from "./context/projects/context";
import { UsersProvider } from "./context/members/context";

// To do that, first I'll import the `ProjectsProvider` in the `App` component.



// Then I'll wrap the RouterProvider component with the <ProjectsProvider> component.
const App = () => {
  const { theme } = useContext(ThemeContext)
  return (
     <div className={`h-screen w-full mx-auto py-2 ${theme === "dark" ? "dark" : ""}`}>
      <ProjectsProvider>
        <UsersProvider>
        <RouterProvider router={router} />
        </UsersProvider>
      </ProjectsProvider>
    </div>
  );
}
export default App;
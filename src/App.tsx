import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import useTheme from "./hooks/useTheme";
import { HomeRoutes } from "./Routes/HomeRoutes";
import { AuthRoutes } from "./Routes/AuthRoutes";
import { WebRoutes } from "./Routes/WebRoutes";



const router = createBrowserRouter([
  WebRoutes,
  HomeRoutes,
  AuthRoutes
]);

function App() {
  const { theme } = useTheme();
  


  useEffect(() => {
    document.body.className = theme === "dark" ? "dark-theme" : "";
    console.log("Theme:", theme);
  }, [theme]);



  return <RouterProvider router={router} />;
}

export default App;



import { Route, Router, Routes } from "react-router-dom";
import Allroutes from "../src/routes/index";
import Boards from "./pages/Boards";
import NotFound from "./pages/404";
const isAuthenticated = true
const App = () => {
  return (
    <>
      {
      
          <Allroutes isAuthenticated={isAuthenticated} />
      }
    </>
  );
}

export default App;

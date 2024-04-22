import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../Layout/AuthLayout";
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";
import ForgotPassword from "../Auth/ForgotPassword";
import MobileNumberLogin from "../Auth/MobileNumberLogin";
import DefaultLayout from "../Layout/DefaultLayout";
import Dashboard from "../Component/Pages/Dashboard/Dashboard";
import NotFound from "../Component/Pages/NotFound/NotFound";
import Player from "../Component/Pages/Player/Player";
import Team from "../Component/Pages/Team/Team";
import Person from "../Component/Pages/Person/Person";
import Champeonship from "../Component/Pages/Champeonship";
import Game from "../Component/Pages/Game";
import Divisions from "../Component/Pages/Divisions/Divisions";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
  },
  {
    path: "/",
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "phone-login",
        element: <MobileNumberLogin />,
      },
    ],
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "Welcome",
        element: <Dashboard />,
      },
      {
        path: "player",
        element: <Player />,
      },
      {
        path: "Divisions",
        element: <Divisions />,
      },
      {
        path: "team",
        element: <Team />,
      },
      {
        path: "champeonship",
        element: <Champeonship />,
      },
      {
        path: "game",
        element: <Game />,
      },
      /*       {
        path: "bookmyshow",
        element: <BookMyShow />,
      },
      {
        path: "whatsapp",
        element: <Whatsapp />,
      },
      {
        path: "titular",
        element: <Person />,
      }, */
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default routes;

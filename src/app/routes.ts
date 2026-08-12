import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import VolunteerMatch from "./pages/VolunteerMatch";
import VolunteerResults from "./pages/VolunteerResults";
import NeedsBoard from "./pages/NeedsBoard";
import About from "./pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/find-help",
    Component: VolunteerMatch,
  },
  {
    path: "/find-help/results",
    Component: VolunteerResults,
  },
  {
    path: "/needs",
    Component: NeedsBoard,
  },
  {
    path: "/about",
    Component: About,
  },
]);
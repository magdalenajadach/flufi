import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import VolunteerMatch from "./pages/VolunteerMatch";
import VolunteerResults from "./pages/VolunteerResults";
import NeedsBoard from "./pages/NeedsBoard";
import About from "./pages/About";
import BeforeYouHelp from "./pages/BeforeYouHelp";
import HowToHelp from "./pages/HowToHelp";

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
  {
    path: "/before-you-help",
    Component: BeforeYouHelp,
  },
  {
    path: "/how-to-help",
    Component: HowToHelp,
  },
]);
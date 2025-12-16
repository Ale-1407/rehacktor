import { createBrowserRouter } from "react-router";
import routes from "./routes";
import Layout from "../components/layouts/Layout";
import Homepage from "../views/Homepage";
import {
  getAllGamesLoader,
  getAllGenres,
  getFilteredGenreGames,
  getSearchedGames,
} from "./loaders";
import SearchPage from "../views/SearchPage";
import GenrePage from "../views/GenrePage";
import AutheniticationLayout from "../components/layouts/AuthenticationLayout";
import RegisterPage from "../views/auth/RegisterPage";
import LoginPage from "../views/auth/LoginPage";
import ProfilePage from "../views/auth/ProfilePage";
import ProfileSettingsPage from "../views/auth/ProfileSettingsPage";

const router = createBrowserRouter([
  {
    path: routes.home,
    Component: Layout,
    loader: getAllGenres,
    children: [
      {
        path: routes.home,
        Component: Homepage,
        loader: getAllGamesLoader,
      },
      {
        path: routes.search,
        Component: SearchPage,
        loader: getSearchedGames,
      },
      {
        path: routes.genre,
        Component: GenrePage,
        loader: getFilteredGenreGames,
      },
    ],
  },
  {
    path: "/auth",
    Component: AutheniticationLayout,
    children: [
      {
        path: routes.register,
        Component: RegisterPage,
      },
      {
        path: routes.login,
        Component: LoginPage,
      },
      {
        path: routes.profile,
        Component: ProfilePage,
      },
      {
        path: routes.profile_settings,
        Component: ProfileSettingsPage,
      },
    ],
  },
]);

export default router;

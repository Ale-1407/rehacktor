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
]);

export default router;

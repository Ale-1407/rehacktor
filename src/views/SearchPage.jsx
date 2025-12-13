import { useLoaderData } from "react-router";
import GameList from "../components/HomeComponents/GameList";

export default function SearchPage() {
  const games = useLoaderData();

  return (
    <>
      <GameList>
        {games.map((game) => {
          return <GameList.Card key={game.id} game={game} />;
        })}
      </GameList>
    </>
  );
}

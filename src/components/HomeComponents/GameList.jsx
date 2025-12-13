import GameCard from "./GameCard";

export default function GameList({ children }) {
  return (
    <>
      <main className="grid gap-4 my-10 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {children}
      </main>
    </>
  );
}

GameList.Card = GameCard;

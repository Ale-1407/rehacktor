import GameCard from "./GameCard";

export default function GameList({ children }) {
  return (
    <>
      <main className="grid grid-cols-4 gap-4 my-10 px-4">{children}</main>
    </>
  );
}

GameList.Card = GameCard;

import { Link } from "react-router";

export default function GameCard({ game }) {
  return (
    <>
      <div className="hover-3d relative">
        {/* content */}
        <Link to={`/detail/${game.id}`}>
          <figure className="relative overflow-hidden w-full rounded-2xl aspect-4/5 lg:aspect-video">
            <img
              src={`${game.background_image}`}
              alt=""
              className="w-full h-full object-cover"
            />
            <p
              className="absolute bottom-0 w-full text-center bg-linear-to-t from-black/70  to-transparent
          p-3 text-white font-bold"
            >
              {game.name}
            </p>
          </figure>
        </Link>
      </div>
    </>
  );
}

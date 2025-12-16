import { Link } from "react-router";

export default function GameCard({ game }) {
  return (
    <>
      <div className="hover-3d relative">
        <figure className="relative overflow-hidden w-full rounded-2xl aspect-4/5 lg:aspect-video">
          {/* content */}
          <Link to={`/detail/${game.id}`}>
            <img
              src={`${game.background_image}`}
              alt=""
              className="w-full h-full object-cover"
            />
          </Link>
          <p
            className="absolute bottom-0 w-full text-center bg-linear-to-t from-black/70  to-transparent
          p-3 text-white font-bold"
          >
            {game.name}
          </p>
        </figure>
        {/* 8 empty divs needed for the 3D effect */}
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
}

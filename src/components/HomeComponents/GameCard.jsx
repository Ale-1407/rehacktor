import { Link } from "react-router";

export default function GameCard({ game }) {
  return (
    <>
      <div className="hover-3d bg-base-200 text-base-content shadow-xl rounded-2xl relative">
        {/* content */}
        <div className="rounded-2xl overflow-hidden">
          <Link to={`/detail/${game.id}`} className="block">
            <figure className="relative w-full aspect-4/5 lg:aspect-video">
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
      </div>
    </>
  );
}

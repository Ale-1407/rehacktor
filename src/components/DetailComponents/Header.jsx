export default function Header({ game }) {
  return (
    <>
      <header className="min-h-screen flex items-center">
        <div className="max-w-5xl mx-auto px-6 text-white">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            {game.name}
          </h1>

          <p className="text-lg opacity-80 mb-6">
            Released on <span className="font-semibold">{game.released}</span>
          </p>

          <p className="max-w-3xl text-base md:text-lg leading-relaxed opacity-90 mb-10">
            {game.description_raw}
          </p>

          <div className="flex flex-wrap gap-6">
            <div className="bg-black/50 backdrop-blur-md rounded-xl px-6 py-4">
              <p className="text-sm uppercase opacity-70">Rating</p>
              <p className="text-2xl font-bold">{game.rating}</p>
            </div>

            <div className="bg-black/50 backdrop-blur-md rounded-xl px-6 py-4">
              <p className="text-sm uppercase opacity-70 mb-2">Genres</p>
              <ul className="flex flex-wrap gap-2">
                {game.genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="px-3 py-1 text-sm rounded-full bg-white/10"
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

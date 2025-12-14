import { Link } from "react-router";

export default function Sidebar({ genres }) {
  return (
    <>
      <nav className="">
        <ul
          className="flex gap-2
          overflow-x-auto whitespace-nowrap
          px-4 py-3
          lg:flex-col lg:gap-1
          lg:h-screen lg:sticky lg:top-0"
        >
          {genres.map((genre) => {
            return (
              <li
                className=" block rounded-lg
                px-3 py-2
                text-sm font-semibold
                hover:bg-base-300
                lg:text-base"
                key={genre.id}
              >
                <Link to={`/genre/${genre.slug}`}>{genre.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

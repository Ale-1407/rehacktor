import { Link } from "react-router";

export default function Sidebar({ genres }) {
  return (
    <>
      <nav className="h-screen">
        <ul className="px-5">
          {genres.map((genre) => {
            return (
              <li className="mb-2 text-xl font-bold" key={genre.id}>
                <Link to={`/genre/${genre.slug}`}>{genre.name}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

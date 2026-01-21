import { useContext, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import routes from "../../router/routes";
import { UserContext } from "../../context/UserContext";
import { FaArrowRightToBracket } from "react-icons/fa6";

export default function Navbar() {
  const [slug, setSlug] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSlug(e.target.value);
  };

  //all'enter dell'input ottengo lo stesso risultato
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && slug.trim()) {
      navigate(`/search/${slug}`);
    }
  };

  const { user, signOut } = useContext(UserContext);
  console.log("user in navbar", user);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <>
      <div className="navbar grid grid-cols-3 items-center bg-base-100 shadow-sm">
        <div className="justify-self-start">
          <Link className="btn btn-ghost text-3xl" to={routes.home}>
            Rehacktor
          </Link>
        </div>

        <div className="justify-self-center hidden md:flex gap-3">
          <input
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search"
            className="input input-bordered rounded-full w-24 md:w-auto"
          />
          <Link className="btn btn-circle" to={`/search/${slug}`}>
            <FaSearch />
          </Link>
        </div>

        <div className="justify-self-end flex gap-3 col-start-3">
          {!user && (
            <div className="flex items-center gap-2">
              <Link to={routes.register}>Register</Link>
              <Link to={routes.login}>Login</Link>
            </div>
          )}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              {user ? (
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img
                      alt="User avatar"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
              ) : (
                <FaArrowRightToBracket className="text-2xl" />
              )}
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {/* SEARCH MOBILE */}
              <li className="md:hidden">
                <input
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                  type="text"
                  placeholder="Search"
                  className="input input-bordered w-full"
                />
              </li>
              <li>
                <a className="justify-between">
                  <Link to={routes.profile}>Profile</Link>
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <Link to={routes.profile_settings}>
                  <a>Settings</a>
                </Link>
              </li>
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

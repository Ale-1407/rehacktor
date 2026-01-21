import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import profilePic from "../../assets/profilePic.png";
import routes from "../../router/routes";
import { Link } from "react-router";
import supabase from "../../database/supabase";
import { FaHeart } from "react-icons/fa";

export default function ProfilePage() {
  const { user, profile } = useContext(UserContext);
  const [avatarUrl, setAvatarUrl] = useState();
  const [userFavourites, setUserFavourites] = useState();

  const download_avatar = async () => {
    if (profile) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(profile.avatar_url);
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    }
  };

  const get_favourites = async () => {
    if (profile) {
      let { data: favourites, error } = await supabase
        .from("favourites")
        .select("*")
        .eq("profile_id", profile.id);
      setUserFavourites(favourites);
    }
  };

  useEffect(() => {
    download_avatar();
    get_favourites();
  }, [profile]);

  return (
    <>
      <main className="min-h-screen px-4 py-10">
        {user && profile && (
          <div className="mx-auto max-w-5xl">
            <article className="mt-4 flex flex-col items-center text-center gap-4">
              <img
                src={avatarUrl ?? profilePic}
                alt="Profile Image"
                className="w-28 h-28 rounded-full object-cover ring ring-offset-purple-600 ring-offset-2"
              />
              <h2 className="text-3xl font-bold">{profile.first_name}</h2>
            </article>

            <section className="mt-10">
              <article className="card bg-base-200 text-base-content shadow-xl w-full max-w-md mx-auto">
                <div className="card-body gap-3">
                  <h3 className="font-bold">Your data</h3>
                  <p>Name: {profile.first_name}</p>
                  <p className="wrap-break-word">Email: {user.email} </p>

                  <Link
                    className="btn btn-outline btn-sm mt-2 w-full sm:w-auto"
                    to={routes.profile_settings}
                  >
                    Settings
                  </Link>
                </div>
              </article>
            </section>

            <div className="mt-10 mb-4 flex items-baseline justify-between px-6 lg:px-16">
              <h3 className="text-xl font-bold">Favourites</h3>
              <span className="text-xs text-base-content/60 bg-base-200 px-3 py-1 rounded-full">
                {userFavourites?.length ?? 0} games
              </span>
            </div>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-0 mb-10 px-6 lg:px-16">
              {userFavourites &&
                userFavourites.map((game) => (
                  <div
                    key={game.id}
                    className="relative rounded-2xl bg-base-200 p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span className="absolute top-3 right-3 text-red-500 text-xl">
                      <FaHeart />
                    </span>

                    <h2 className="text-lg font-bold text-base-content pr-8">
                      {game.game_name}
                    </h2>
                  </div>
                ))}
            </section>
          </div>
        )}
      </main>
    </>
  );
}

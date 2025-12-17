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
      <main className="h-screen">
        {user && profile && (
          <>
            <article className="mt-10 flex flex-col items-center">
              <img
                src={avatarUrl ?? profilePic}
                alt="Profile Image"
                className="w-[100px] h-[100px] rounded-full"
              />
              <h2 className="text-2xl font-bold mt-5">{profile.first_name}</h2>
            </article>

            <section className="grid grid-cols-3 gap-4 px-36">
              <article className="bg-black rounded-box p-10">
                <h3 className="font-bold">Your data</h3>
                <p>Name: {profile.first_name}</p>
                <p>Email: {user.email} </p>

                <Link
                  className="btn btn-outline mt-3"
                  to={routes.profile_settings}
                >
                  Settings
                </Link>
              </article>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-10 px-6 lg:px-16">
              {userFavourites &&
                userFavourites.map((game) => (
                  <div
                    key={game.id}
                    className="relative rounded-xl bg-linear-to-br from-base-200 to-base-300 p-6 shadow-md hover:scale-[1.02] transition"
                  >
                    <span className="absolute top-3 right-3 text-red-500 text-xl">
                      <FaHeart />
                    </span>

                    <h2 className="text-lg font-bold text-white">
                      {game.game_name}
                    </h2>
                  </div>
                ))}
            </section>
          </>
        )}
      </main>
    </>
  );
}

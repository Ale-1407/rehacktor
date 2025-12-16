import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import profilePic from "../../assets/profilePic.png";
import routes from "../../router/routes";
import { Link } from "react-router";
import supabase from "../../database/supabase";

export default function ProfilePage() {
  const { user, profile } = useContext(UserContext);
  const [avatarUrl, setAvatarUrl] = useState();

  const download_avatar = async () => {
    if (profile) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(profile.avatar_url);
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    }
  };

  useEffect(() => {
    download_avatar();
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
          </>
        )}
      </main>
    </>
  );
}

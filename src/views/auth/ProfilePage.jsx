import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import profilePic from "../../assets/profilePic.png";

export default function ProfilePage() {
  const { user, profile } = useContext(UserContext);

  return (
    <>
      <main className="h-screen">
        {user && profile && (
          <>
            <article className="mt-10 flex flex-col items-center">
              <img src={profilePic} alt="Profile Image" />
              <h2 className="text-2xl font-bold mt-5">{profile.first_name}</h2>
            </article>

            <section className="grid grid-cols-3 gap-4 px-36">
              <article className="bg-black rounded-box p-10">
                <h3 className="font-bold">Your data</h3>
                <p>
                  Name: {profile.first_name} {profile.last_name}{" "}
                </p>
                <p>Username: {profile.username} </p>
                <p>Email: {profile.email} </p>
              </article>
            </section>
          </>
        )}
      </main>
    </>
  );
}

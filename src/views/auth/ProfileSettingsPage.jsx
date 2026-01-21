import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";
import routes from "../../router/routes";
import { useForm } from "react-hook-form";
import supabase from "../../database/supabase";

export default function ProfileSettingsPage() {
  const { profile, getUser } = useContext(UserContext);
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  const handleChange = (e) => {
    setFile(() => e.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(() => imageUrl);
    }
  }, [file]);

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    const fileExt = file.name.split(".").pop();
    const fileName = `${profile.id}${Math.random()}.${fileExt}`;
    await supabase.storage.from("avatars").upload(fileName, file);
    await supabase
      .from("profiles")
      .upsert({ id: profile.id, avatar_url: fileName })
      .select();
    await getUser();
  };

  const { updateProfile } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    updateProfile(data);
    navigate(routes.profile);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center items-start gap-8 px-4 py-10 min-h-[calc(100vh-4rem)] w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md mx-auto"
        >
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-6 shadow-md">
            <h2 className="text-lg font-bold mb-2">Personal info</h2>
            <label className="label">Name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Name"
              {...register("first_name", {
                required: "This field is required!",
              })}
            />
            {errors.first_name && (
              <p role="alert" className="text-red-500">
                {errors.first_name.message}
              </p>
            )}

            <label className="label">Last name</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Last name"
              {...register("last_name", {
                required: "This field is required!",
              })}
            />
            {errors.last_name && (
              <p className="text-red-500">{errors.last_name.message}</p>
            )}

            <label className="label">Username</label>
            <input
              type="text"
              className="input w-full"
              placeholder="Username"
              {...register("username", {
                required: "This field is required!",
              })}
            />
            {errors.username && (
              <p className="text-red-500">{errors.username.message}</p>
            )}

            <button
              type="submit"
              className="btn btn-neutral mt-4 w-full sm:w-auto"
            >
              Edit
            </button>
          </fieldset>
        </form>

        <form
          className="w-full max-w-md mx-auto p-0"
          onSubmit={handleAvatarSubmit}
        >
          <div className="bg-base-200 border border-base-300 rounded-box p-6 shadow-md">
            <h2 className="text-lg font-bold mb-2">Avatar</h2>
            <input
              type="file"
              className="file-input file-input-bordered w-full mb-5"
              onChange={handleChange}
            />
            <button className="btn btn-neutral w-full sm:w-auto">
              Change Avatar
            </button>
            {preview && (
              <img
                src={preview}
                alt="avatar preview"
                className="mt-5 w-40 h-40 rounded-full object-cover mx-auto ring ring-offset-purple-600 ring-offset-2"
              />
            )}
          </div>
        </form>
      </div>
    </>
  );
}

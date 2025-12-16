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
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-md border p-6">
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

            <button type="submit" className="btn btn-neutral mt-4">
              Edit
            </button>
          </fieldset>
        </form>

        <form className="p-10 w-1/2" onSubmit={handleAvatarSubmit}>
          <input
            type="file"
            className="file-input file-input-lg w-full mb-5"
            onChange={handleChange}
          />
          <button className="btn btn-neutral p-5">Change Avatar</button>
        </form>
        <img src={preview} alt="" className="w-50" />
      </div>
    </>
  );
}

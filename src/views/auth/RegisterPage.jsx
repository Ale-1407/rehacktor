import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
/* import supabase from "../../database/supabase";
 */ import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp } = useContext(UserContext);

  const navigate = useNavigate();

  const onSubmit = async (user_data) => {
    console.log("form data:", user_data);

    await signUp({
      email: user_data.email,
      password: user_data.password,
      options: {
        data: {
          first_name: user_data.first_name,
          last_name: user_data.last_name,
          username: user_data.username,
        },
      },
    });

    navigate("/");
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-md border p-6">
            <legend className="fieldset-legend">Register</legend>

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

            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Email"
              {...register("email", {
                required: "This field is required!",
              })}
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}

            <label className="label">Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Password"
              {...register("password", {
                required: "This field is required!",
              })}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}

            <button type="submit" className="btn btn-neutral mt-4">
              Sign in
            </button>
          </fieldset>
        </form>
      </div>
    </>
  );
}

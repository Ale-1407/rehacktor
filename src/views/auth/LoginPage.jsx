import { useForm } from "react-hook-form";
import { useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { login } = useContext(UserContext);

  const onSubmit = async (user_data) => {
    await login({
      email: user_data.email,
      password: user_data.password,
    });
    navigate("/");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend className="fieldset-legend">Login</legend>

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

            <button className="btn btn-neutral mt-4">Sign in</button>
          </fieldset>
        </div>
      </form>
    </>
  );
}

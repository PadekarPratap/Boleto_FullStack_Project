import { useForm } from "react-hook-form";
import Button from "../../shared/components/UIElements/Button";
import Input from "../../shared/components/UIElements/Input";
import useLogin from "../../hooks/useLogin";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { Link } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: loginUser, isError, error, isPending } = useLogin();

  const onSubmit = (data) => {
    loginUser(data);
  };

  if (isPending) return <LoadingSpinner />;

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-secondary">
      <div className="container-sm">
        <h1 className="text-center text-4xl font-bold">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            id="login-email"
            label={"Email"}
            type="email"
            placeholder={"johndoe@gmail.com"}
            register={register}
            registerText="email"
            isError={errors?.email}
            errorText={errors?.email?.message}
            validator={{
              required: "Email is required",
            }}
          />
          <Input
            id="login-password"
            label={"Password"}
            type="password"
            placeholder={"******"}
            register={register}
            registerText="password"
            isError={errors?.password}
            errorText={errors?.password?.message}
            validator={{
              required: "Password is required",
            }}
          />

          <div className="mt-5 flex flex-col items-center gap-4">
            <Button disabled={isPending} type="submit" variant="primary">
              Login
            </Button>
            {isError && (
              <p className="text-red-500">
                {error?.message ||
                  "Could not login user. Please try again later."}
              </p>
            )}
          </div>

          <div>
            <p className="text-md text-center mt-5">
              Don&apos;t have an Account?{" "}
              <Link className="text-blue-950 underline" to={`/signup`}>
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Login;

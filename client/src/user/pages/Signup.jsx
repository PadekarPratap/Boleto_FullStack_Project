import { useForm } from "react-hook-form";
import Input from "../../shared/components/UIElements/Input";
import Button from "../../shared/components/UIElements/Button";
import useSignup from "../../hooks/useSignup";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { Link } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: signupUser, isError, error, isPending } = useSignup();

  const onSubmit = (data) => {
    signupUser(data);
  };

  if (isPending) return <LoadingSpinner />;

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-secondary">
      <div className="container-sm">
        <h1 className="text-center text-4xl font-bold uppercase">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <Input
            label="Name"
            type="text"
            id="name"
            register={register}
            registerText="name"
            isError={errors?.name}
            errorText={errors?.name?.message}
            validator={{
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters long.",
              },
              pattern: {
                value: /^[^\s]+$/,
                message: "Name cannot contain spaces.",
              },
            }}
            placeholder="John Doe"
          />
          <Input
            label="Email"
            type="email"
            id="email"
            register={register}
            registerText="email"
            isError={errors?.email}
            errorText={errors?.email?.message}
            validator={{
              required: "Email is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Please enter a valid email address.",
              },
            }}
            placeholder="johndoe@gmail.com"
          />
          <Input
            label="Password"
            type="password"
            id="password"
            register={register}
            registerText="password"
            isError={errors?.password}
            errorText={errors?.password?.message}
            validator={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
              },
              maxLength: {
                value: 18,
                message: "Password cannot exceed 18 characters.",
              },
              pattern: {
                value: /^(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]+$/,
                message:
                  "Password must contain at least one number and one special character.",
              },
            }}
            placeholder="********"
          />

          <div className="mt-10 flex flex-col items-center gap-4">
            <Button disabled={isPending} type="submit" variant="primary">
              Sign Up
            </Button>
            {isError && (
              <p className="text-red-500">
                {error?.message ||
                  "Could not create an Account. Please try again later."}
              </p>
            )}
          </div>
          <div>
            <p className="text-md text-center mt-5">
              Already registered?{" "}
              <Link className="text-blue-950 underline" to={`/login`}>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;

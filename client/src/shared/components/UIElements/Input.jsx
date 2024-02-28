const Input = ({
  id,
  label,
  element = "input",
  type = "text",
  register,
  registerText,
  validator,
  isError,
  errorText,
  placeholder,
}) => {
  const inputElem =
    element === "input" ? (
      <input
        className={`px-4 py-2 w-full text-xl focus-within:outline-none focus-within:ring-2 focus-within:ring-primary rounded ${
          isError && "border border-red-500 focus-within:ring-red-500"
        }`}
        id={id}
        type={type}
        {...register(registerText, validator)}
        placeholder={placeholder}
      />
    ) : (
      <textarea
        id={id}
        rows={5}
        className={`resize-none ${
          isError && "border border-red-500 ring-red-500"
        }`}
        {...register(registerText, validator)}
        placeholder={placeholder}
      />
    );

  return (
    <div className="flex flex-col gap-2 mt-7">
      <label
        className={`text-xl font-medium ${isError && "text-red-500"}`}
        htmlFor={id}
      >
        {label}
      </label>
      {inputElem}
      {isError && <p className="text-red-500 text-sm">{errorText}</p>}
    </div>
  );
};
export default Input;

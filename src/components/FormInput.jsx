const FormInput = ({
  label,
  type,
  id,
  required = true,
  autoComplete = "true",
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-semibold">
        {label}
      </label>
      <input
        required={required}
        autoComplete={autoComplete}
        type={type}
        id={id}
        placeholder={placeholder || `Enter your ${label.toLowerCase()}`}
        value={value}
        onChange={onChange}
        className="text-lg border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
        {...(type === "number" && { min: "0.01", step: "0.01" })}
      />
    </div>
  );
};

export default FormInput;

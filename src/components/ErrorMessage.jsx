const ErrorMessage = ({ message }) => {
  return (
    <div className="absolute top-4 left-[50%] transform -translate-x-1/2 text-red-500 bg-red-100 text-lg font-bold text-center px-8 py-4 rounded">
      {message}
    </div>
  );
}

export default ErrorMessage
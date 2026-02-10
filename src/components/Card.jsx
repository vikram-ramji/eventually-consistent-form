const Card = ({ children }) => {
  return (
    <div className="max-w-md w-full px-12 py-14 rounded-xl border border-gray-300 shadow-lg space-y-6">
      {children}
    </div>
  );
};

export default Card;

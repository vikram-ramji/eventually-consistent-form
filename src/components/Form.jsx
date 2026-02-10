import { useState } from "react";
import FormInput from "./FormInput";

const Form = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Email: ${email}, Amount: ${amount}`);
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <FormInput
        label="Email"
        type="email"
        id="email"
        placeholder="name@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <FormInput
        label="Amount"
        type="number"
        id="amount"
        placeholder="100.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        type="submit"
        className="bg-gray-900 text-white font-bold text-lg py-3 rounded-lg mt-4 cursor-pointer hover:bg-gray-700 active:scale-95 transition-all duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;

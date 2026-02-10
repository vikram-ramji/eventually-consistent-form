import FormInput from "./FormInput";

const Form = () => {
  return (
    <form action="" className="flex flex-col gap-6">
      <FormInput label="Email" type="email" id="email" placeholder="name@example.com" />
      <FormInput label="Amount" type="number" id="amount" placeholder="100.00" />
      <button type="submit" className="bg-gray-900 text-white font-bold text-lg py-3 rounded-lg mt-4 cursor-pointer hover:bg-gray-700 active:scale-95 transition-all duration-300">
        Submit
      </button>
    </form>
  );
};

export default Form;

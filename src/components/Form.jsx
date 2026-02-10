import { useState } from "react";
import FormInput from "./FormInput";
import submitForm from "../api/submitForm";
import SuccessMessage from "./SuccessMessage";
import ErrorMessage from "./ErrorMessage";

const Form = () => {
  const [formData, setFormData] = useState({ email: "", amount: "" });
  const [status, setStatus] = useState("IDLE"); // IDLE, SUBMITTING, RETRYING, SUCCESS, ERROR
  const [attempts, setAttempts] = useState(0);
  const maxRetries = 3; // Number of retries allowed

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (status === "SUBMITTING" || status === "RETRYING") {
      return; // Prevent duplicate submissions
    }

    setStatus("SUBMITTING");
    setAttempts(0);

    let currentAttempt = 0;
    while (currentAttempt <= maxRetries) {
      try {
        const { status } = await submitForm(formData);

        if (status === 200) {
          setStatus("SUCCESS");
          setFormData({ email: "", amount: "" }); // Reset form on success
          setTimeout(() => {
            setStatus("IDLE");
          }, 2000);
          return;
        }
      } catch (e) {
        if (e.status !== 503) {
          setStatus("ERROR");
          console.error("Unexpected error:", e);
          return;
        }

        if (currentAttempt === maxRetries) {
          setStatus("ERROR");
          setTimeout(() => {
            setStatus("IDLE");
          }, 2000);
          return;
        }

        setStatus("RETRYING");
        setAttempts((prev) => prev + 1);
        currentAttempt++;

        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait before retrying
      }
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <FormInput
        label="Email"
        type="email"
        id="email"
        placeholder="name@example.com"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        disabled={status === "SUBMITTING" || status === "RETRYING"}
      />
      <FormInput
        label="Amount"
        type="number"
        id="amount"
        placeholder="100.00"
        value={formData.amount}
        onChange={(e) =>
          setFormData({ ...formData, amount: e.target.value })
        }
        disabled={status === "SUBMITTING" || status === "RETRYING"}
      />
      <button
        type="submit"
        className="bg-gray-900 text-white font-bold text-lg py-3 rounded-lg mt-4 cursor-pointer hover:bg-gray-700 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
        disabled={status === "SUBMITTING" || status === "RETRYING"}
      >
        {status === "SUBMITTING"
          ? "Processing..."
          : status === "RETRYING"
            ? `Retrying (${attempts}/${maxRetries})...`
            : "Submit"}
      </button>
      {status === "SUCCESS" && (
        <SuccessMessage message="Form submitted successfully!" />
      )}
      {status === "ERROR" && (
        <ErrorMessage message="Failed to submit form after multiple attempts. Please try again later." />
      )}
    </form>
  );
};

export default Form;

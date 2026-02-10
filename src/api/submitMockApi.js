const submitMockApi = async (formData) => {
  const { email, amount } = formData;

  console.log(
    `API: Received submission with email: ${email} and amount: ${amount}`,
  );

  // Simulating realistic network delay
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  await delay(1200);

  // For setting random probability
  const randomOutcome = Math.random();

  // DELAYED SUCCESS - 10% chance
  if (randomOutcome < 0.1) {
    console.log("API: Response is being delayed, please wait...");
    // Simulate delayed response
    await delay(5000);
    return { status: 200, message: "Success (Delayed)" };
  }

  // TEMPORARY FAILURE - 40% chance
  if (randomOutcome < 0.5) {
    return { status: 503, message: "Service Unavailable" };
  }

  // SUCCESS - 50% chance
  return { status: 200, message: "Success" };
};

export default submitMockApi;

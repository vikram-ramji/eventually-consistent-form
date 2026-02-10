# Eventually Consistent Form

A React application designed to handle unreliable API connections with "eventually consistent" behavior. It features automatic retry logic for temporary failures, prevents duplicate submissions, and provides real-time user feedback through a finite state machine.

## Features

* **Resilient Submissions:** Automatically detects `503 Service Unavailable` errors and retries the request up to 3 times.
* **Duplicate Prevention:** Implements a two-layer defense strategy to ensure no transaction is submitted twice.
* **Smart Feedback:** The UI reflects the exact state of the request (e.g., "Processing...", "Retrying (1/3)...", "Success").
* **Mock API:** Simulates real-world network conditions including delays (1.2s), random success (50%), temporary failures (40%), and delayed responses (10%).

## Tech Stack

* **Framework:** React (Vite)
* **Styling:** Tailwind CSS
* **Language:** JavaScript (ES6+)

---

## Architectural Decisions

### 1. State Transitions

The application uses a **Finite State Machine** pattern with the following specific states to manage the UI:

* **`IDLE`**: The initial state. The form is editable and ready for input.
* **`SUBMITTING`**: Triggered immediately when the user clicks "Submit". Inputs are disabled to prevent edits during flight.
* **`RETRYING`**: Entered specifically when the API returns a `503` error. The UI updates to show the current attempt count (e.g., "Retrying 1/3"), informing the user that the system is self-healing.
* **`SUCCESS`**: Entered when the API returns `200 OK`. A success message is displayed, and the form resets to `IDLE` after a short delay.
* **`ERROR`**: Entered if the maximum retries are exceeded or a non-retriable error occurs.

### 2. Retry Logic

The core "eventually consistent" requirement is handled in the `handleSubmit` function using a controlled loop:

* **Detection:** The logic specifically listens for status `503`. All other errors (e.g., 400, 500) fail immediately.
* **Mechanism:** A `while` loop executes as long as `currentAttempt <= maxRetries`.
* **Backoff:** A linear delay of 1 second (`1000ms`) is enforced between attempts to prevent overwhelming the server.
* **Feedback:** The local variable `currentAttempt` drives the logic, while the state `attempts` drives the UI, ensuring the user sees progress in real-time.

### 3. Duplicate Prevention

To satisfy the requirement that "The user must never see duplicate records," a dual-guard strategy is implemented:

1. **UI Guard:** The "Submit" button is strictly `disabled` whenever the status is `SUBMITTING` or `RETRYING`.
2. **Logic Guard:** The submit handler includes an early return clause at the very top:

    ```javascript
    if (status === "SUBMITTING" || status === "RETRYING") {
      return; // Stop execution immediately
    }
    ```

    This guarantees that even if the UI is slow to update or a user triggers the function programmatically, a second request cannot be initiated while one is active.

---

## 🚀 Live Demo

[**Click here to view the live application**](YOUR_VERCEL_LINK_HERE)

---

## 💻 How to Run Locally

If you want to run the project on your own machine:

1. **Clone the repository:**

    ```bash
    git clone [https://github.com/YOUR_USERNAME/eventually-consistent-form.git](https://github.com/YOUR_USERNAME/eventually-consistent-form.git)
    cd eventually-consistent-form
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Start the development server:**

    ```bash
    npm run dev
    ```

4. **Open the app:**
    Visit `http://localhost:5173` in your browser.

---

## 🧪 Testing Guide

Since the API is randomized, I added a manual override to help you test specific states quickly:

* **Force 503 Error:** Use the email `error@test.com` to trigger an immediate Service Unavailable error (this allows you to verify the retry logic without waiting for random chance).

import Card from "./components/Card";
import Form from "./components/Form";

const App = () => {
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center">
      <Card>
        <div className="space-y-2 flex flex-col items-center">
          <h1 className="text-4xl font-bold">Payment Form</h1>
          <p className="text-lg text-gray-700">Enter your details below</p>
        </div>
        <Form />
      </Card>
    </main>
  );
};

export default App;

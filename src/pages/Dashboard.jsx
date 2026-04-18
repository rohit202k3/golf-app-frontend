import API from "../api/api";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const res = await API.get("/auth/me"); // optional (if exists)
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const subscribe = async (plan) => {
    try {
      setLoading(true);
      const res = await API.post("/auth/subscribe", { plan });
      setUser(res.data);
    } catch {
      alert("Error subscribing ❌");
    } finally {
      setLoading(false);
    }
  };

  const selectCharity = async (charity) => {
    try {
      setLoading(true);
      const res = await API.post("/auth/charity", { charity });
      setUser(res.data);
    } catch {
      alert("Error selecting charity ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">

      {/* NAVBAR */}
      <div className="flex justify-between items-center px-8 py-4 bg-gray-800 shadow-lg">
        <h1 className="text-xl font-bold">🏌️ Golf App</h1>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* MAIN */}
      <div className="p-6 max-w-6xl mx-auto">

        {/* USER CARD */}
        <div className="bg-gray-800 p-6 rounded-2xl shadow mb-8">
          <h2 className="text-2xl font-semibold mb-2">👤 Welcome</h2>
          <p className="text-gray-400">{user?.name || "User"}</p>

          <div className="mt-4 grid md:grid-cols-3 gap-4 text-sm">

            <div className="bg-gray-700 p-4 rounded-xl">
              <p className="text-gray-400">Subscription</p>
              <p className="font-semibold">
                {user?.subscription?.plan || "None"}
              </p>
            </div>

            <div className="bg-gray-700 p-4 rounded-xl">
              <p className="text-gray-400">Status</p>
              <p className="font-semibold">
                {user?.subscription?.status || "Inactive"}
              </p>
            </div>

            <div className="bg-gray-700 p-4 rounded-xl">
              <p className="text-gray-400">Charity</p>
              <p className="font-semibold">
                {user?.charity || "Not selected"}
              </p>
            </div>

          </div>
        </div>

        {/* ACTION CARDS */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* SUBSCRIPTION */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow hover:scale-105 transition">
            <h2 className="text-xl font-semibold mb-4">💳 Subscription</h2>

            <button
              onClick={() => subscribe("monthly")}
              className="w-full mb-3 bg-blue-500 hover:bg-blue-600 p-3 rounded-xl"
            >
              Monthly Plan
            </button>

            <button
              onClick={() => subscribe("yearly")}
              className="w-full bg-blue-700 hover:bg-blue-800 p-3 rounded-xl"
            >
              Yearly Plan
            </button>
          </div>

          {/* CHARITY */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow hover:scale-105 transition">
            <h2 className="text-xl font-semibold mb-4">🎗 Charity</h2>

            <button
              onClick={() => selectCharity("Education Fund")}
              className="w-full mb-3 bg-green-500 hover:bg-green-600 p-3 rounded-xl"
            >
              📚 Education
            </button>

            <button
              onClick={() => selectCharity("Health Support")}
              className="w-full mb-3 bg-green-600 hover:bg-green-700 p-3 rounded-xl"
            >
              🏥 Health
            </button>

            <button
              onClick={() => selectCharity("Food Donation")}
              className="w-full bg-green-700 hover:bg-green-800 p-3 rounded-xl"
            >
              🍽 Food
            </button>
          </div>

        </div>
      </div>

      {/* LOADER */}
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  );
}

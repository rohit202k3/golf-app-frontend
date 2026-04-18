import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/signup", form);
      navigate("/");
    } catch {
      alert("Signup Failed");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form className="bg-white p-8 rounded-2xl shadow-md w-80" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>

        <input className="w-full p-2 border rounded mb-3" placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input className="w-full p-2 border rounded mb-3" placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input type="password" className="w-full p-2 border rounded mb-3" placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Signup
        </button>
      </form>
    </div>
  );
}
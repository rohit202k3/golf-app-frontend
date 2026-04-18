import { useEffect, useState } from "react";
import API from "../api/api";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await API.get("/admin/users");
    setUsers(res.data);
  };

  const runDraw = async () => {
    const res = await API.post("/admin/draw");
    setWinner(res.data.winner);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h2 className="text-3xl font-bold text-center mb-6">Admin Panel</h2>

      <div className="text-center mb-6">
        <button
          onClick={runDraw}
          className="bg-purple-600 text-white px-6 py-2 rounded"
        >
          🎯 Run Draw
        </button>
      </div>

      {winner && (
        <h3 className="text-center text-green-600 text-xl mb-6">
          Winner: {winner.name}
        </h3>
      )}

      <div className="max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-3">Users</h3>

        {users.map((u) => (
          <div key={u._id} className="bg-white p-3 mb-2 rounded shadow flex justify-between">
            <span>{u.name}</span>
            <span>{u.subscription?.status}</span>
          </div>
        ))}
      </div>

    </div>
  );
}
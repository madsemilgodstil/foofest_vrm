"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UserSettings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (field, value) => {
    try {
      const response = await fetch(`/api/update-${field}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      const result = await response.json();
      if (response.ok) {
        setMessage(
          `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } updated successfully!`
        );
      } else {
        throw new Error(result.message || `Failed to update ${field}.`);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-black shadow-md rounded-md">
      <h2 className="text-lg font-semibold mb-6 text-center">User Settings</h2>
      {message && (
        <p className="text-sm text-center text-red-500 mb-4">{message}</p>
      )}

      {/* Update Name */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-1 p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="New name"
        />
        <Button
          onClick={() => handleUpdate("name", name)}
          className="w-full mt-2 text-sm bg-blue-500 hover:bg-blue-600 text-white"
        >
          Update Name
        </Button>
      </div>

      {/* Update Email */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-1 p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="New email"
        />
        <Button
          onClick={() => handleUpdate("email", email)}
          className="w-full mt-2 text-sm bg-blue-500 hover:bg-blue-600 text-white"
        >
          Update Email
        </Button>
      </div>

      {/* Update Password */}
      <div>
        <label className="text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-1 p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="New password"
        />
        <Button
          onClick={() => handleUpdate("password", password)}
          className="w-full mt-2 text-sm bg-blue-500 hover:bg-blue-600 text-white"
        >
          Update Password
        </Button>
      </div>
    </div>
  );
}

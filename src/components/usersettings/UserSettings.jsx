"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext"; // Import your AuthContext to get the logged-in user's ID

export default function UserSettings() {
  const { user, logout } = useAuth(); // Get the logged-in user's information and logout function
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleUpdate = async (field, value) => {
    if (!user) {
      setMessage("You must be logged in to update your settings.");
      return;
    }

    try {
      const response = await fetch(
        `https://wytltzrweejgryrvzprn.supabase.co/rest/v1/user?id=eq.${user.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dGx0enJ3ZWVqZ3J5cnZ6cHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNDM0NDQsImV4cCI6MjA0ODcxOTQ0NH0.-ezs7giRIiXDbmC12ORI9Z-bKQ0w3NC7-TER1weoBuY",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dGx0enJ3ZWVqZ3J5cnZ6cHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNDM0NDQsImV4cCI6MjA0ODcxOTQ0NH0.-ezs7giRIiXDbmC12ORI9Z-bKQ0w3NC7-TER1weoBuY",
          },
          body: JSON.stringify({ [field]: value }),
        }
      );

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

  const handleDeleteAccount = async () => {
    if (!user) {
      setMessage("You must be logged in to delete your account.");
      return;
    }

    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `https://wytltzrweejgryrvzprn.supabase.co/rest/v1/user?id=eq.${user.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            apikey:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dGx0enJ3ZWVqZ3J5cnZ6cHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNDM0NDQsImV4cCI6MjA0ODcxOTQ0NH0.-ezs7giRIiXDbmC12ORI9Z-bKQ0w3NC7-TER1weoBuY",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5dGx0enJ3ZWVqZ3J5cnZ6cHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNDM0NDQsImV4cCI6MjA0ODcxOTQ0NH0.-ezs7giRIiXDbmC12ORI9Z-bKQ0w3NC7-TER1weoBuY",
          },
        }
      );

      if (response.ok) {
        setMessage("Your account has been deleted successfully.");
        logout(); // Log the user out after deletion
      } else {
        throw new Error("Failed to delete account.");
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
          className="w-full mt-1 p-2 border rounded text-sm bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="New name"
        />
        <Button
          onClick={() => handleUpdate("user_name", name)} // Map to "user_name" in Supabase
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
          className="w-full mt-1 p-2 border rounded text-sm bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="New email"
        />
        <Button
          onClick={() => handleUpdate("user_email", email)} // Map to "user_email" in Supabase
          className="w-full mt-2 text-sm bg-blue-500 hover:bg-blue-600 text-white"
        >
          Update Email
        </Button>
      </div>

      {/* Update Password */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mt-1 p-2 border rounded text-sm bg-black text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="New password"
        />
        <Button
          onClick={() => handleUpdate("user_password", password)} // Map to "user_password" in Supabase
          className="w-full mt-2 text-sm bg-blue-500 hover:bg-blue-600 text-white"
        >
          Update Password
        </Button>
      </div>

      {/* Delete Account */}
      <div className="mt-6">
        <Button
          onClick={handleDeleteAccount}
          className="w-full text-sm bg-red-500 hover:bg-red-600 text-white"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}

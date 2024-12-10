"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function UserSettings() {
  const { user, logout } = useAuth();
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
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ [field]: value }),
        }
      );

      if (response.status === 204) {
        setMessage(
          `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } updated successfully!`
        );
        return;
      }

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
            apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
          },
        }
      );

      if (response.status === 204 || response.ok) {
        setMessage("Your account has been deleted successfully.");
        logout();
        return;
      }

      const result = await response.json();
      throw new Error(result.message || "Failed to delete account.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 bg-black text-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-8">User Settings</h2>
      {message && (
        <p className="text-center text-sm text-red-500 mb-6">{message}</p>
      )}

      {/* Update Name */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
          placeholder="Enter new name"
        />
        <Button
          onClick={() => handleUpdate("user_name", name)}
          className="w-full mt-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-md"
        >
          Update Name
        </Button>
      </div>

      {/* Update Email */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
          placeholder="Enter new email"
        />
        <Button
          onClick={() => handleUpdate("user_email", email)}
          className="w-full mt-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-md"
        >
          Update Email
        </Button>
      </div>

      {/* Update Password */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-md bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-orange-500"
          placeholder="Enter new password"
        />
        <Button
          onClick={() => handleUpdate("user_password", password)}
          className="w-full mt-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-md"
        >
          Update Password
        </Button>
      </div>

      {/* Delete Account */}
      <div className="mt-8">
        <Button
          onClick={handleDeleteAccount}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md"
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
}

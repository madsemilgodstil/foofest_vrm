"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const url = process.env.NEXT_PUBLIC_USER_API_URL;
const apiKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const authHeader = `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`;

export default function UserSettings() {
  const { user, logout } = useAuth();
  const [currentData, setCurrentData] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Fetch the current user data
  const fetchCurrentUser = async () => {
    if (!user) return;

    try {
      const response = await fetch(`${url}?id=eq.${user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
          Authorization: authHeader,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user data.");

      const data = await response.json();
      if (data.length > 0) {
        setCurrentData(data[0]);
      }
    } catch (error) {
      setMessage(error.message);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, [user]);

  const validatePassword = (password) => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    return password.length >= 6 && hasLetter && hasDigit;
  };

  const handleUpdate = async (field, value) => {
    if (!user) {
      setMessage("You must be logged in to update your settings.");
      return;
    }

    if (field === "user_password" && !validatePassword(value)) {
      setMessage(
        "Password must be at least 6 characters long and include at least one letter and one digit."
      );
      return;
    }

    try {
      const response = await fetch(`${url}?id=eq.${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
          Authorization: authHeader,
        },
        body: JSON.stringify({ [field]: value }),
      });

      if (response.status === 204) {
        const friendlyFieldName = {
          user_name: "Name",
          user_email: "Email",
          user_password: "Password",
        }[field];

        setMessage(`${friendlyFieldName} updated successfully!`);
        fetchCurrentUser();
        return;
      }

      const result = await response.json();

      if (response.ok) {
        const friendlyFieldName = {
          user_name: "Name",
          user_email: "Email",
          user_password: "Password",
        }[field];

        setMessage(`${friendlyFieldName} updated successfully!`);
        fetchCurrentUser();
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
      const response = await fetch(`${url}?id=eq.${user.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          apikey: apiKey,
          Authorization: authHeader,
        },
      });

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
        <p className="text-gray-400 text-sm mb-2">
          Current Name: {currentData.user_name || "Loading..."}
        </p>
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
        <p className="text-gray-400 text-sm mb-2">
          Current Email: {currentData.user_email || "Loading..."}
        </p>
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
        <p className="text-gray-400 text-sm mb-2">
          Current Password: {currentData.user_password || "Hidden for security"}
        </p>
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

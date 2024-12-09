"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { getUserByCredentials, createUser } from "@/lib/supabaseUser";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Validation schema using zod
const schema = z.object({
  name: z.string().optional(), // Name is required only for signup
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const Modal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const router = useRouter(); // For navigation
  const { login } = useAuth(); // Access login function

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        // Login logic
        const user = await getUserByCredentials(data.email, data.password);
        if (user) {
          console.log("User logged in:", user);
          login(); // Set user as logged in
          router.push("/pages/login"); // Redirect to the login page
        } else {
          console.error("Invalid credentials. Please try again.");
          alert("Invalid email or password.");
        }
      } else {
        // Signup logic
        const newUser = {
          name: data.name,
          email: data.email,
          password: data.password,
        };
        const createdUser = await createUser(newUser);
        console.log("User created:", createdUser);

        // Automatically log the user in after signup
        login(); // Set user as logged in
        router.push("/pages/login"); // Redirect to the login page
      }
      onClose(); // Close modal after a successful operation
    } catch (error) {
      console.error("Error during authentication:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative text-black"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close modal"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {isLogin ? "Login to Foo Fest" : "Create an Account"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <Input
                placeholder="Your Name"
                {...register("name")}
                className="w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              placeholder="Your Email"
              {...register("email")}
              className="w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input
              type="password"
              placeholder="Your Password"
              {...register("password")}
              className="w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full py-2">
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              reset(); // Reset form when toggling
            }}
            className="text-primary cursor-pointer font-semibold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Modal;

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Import AuthContext
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUserByCredentials, createUser } from "@/lib/supabaseUser";

// Validation schema using zod
const schema = z.object({
  name: z.string().optional(), // Name required only for signup
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

const Modal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const router = useRouter();
  const { login } = useAuth(); // Use AuthContext for login

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        // Handle login
        const user = await getUserByCredentials(data.email, data.password);
        if (user) {
          login(user); // Pass full user object to AuthContext
          router.push("/pages/login"); // Redirect to the login page
        } else {
          alert("Invalid email or password.");
        }
      } else {
        // Handle signup
        const newUser = {
          user_name: data.name,
          user_email: data.email,
          user_password: data.password
        };
        const createdUser = await createUser(newUser);
        login(createdUser); // Log in after signup
        router.push("/pages/login"); // Redirect to the login page
      }
      onClose(); // Close modal after successful operation
    } catch (error) {
      console.error("Authentication error:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-black border-2 border-darkorange p-8  shadow-lg max-w-lg w-full relative text-white"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-gray-500"
          aria-label="Close modal"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">
          {isLogin ? "Login to FooFest" : "Create an Account"}
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <Input
                placeholder="Your Name"
                {...register("name")}
                className="w-full bg-black text-white border-2 "
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <Input
              placeholder="Your Email"
              {...register("email")}
              className="w-full bg-black text-white border-2 "
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <Input
              type="password"
              placeholder="Your Password"
              {...register("password")}
              className="w-full bg-black text-white border-2 "
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full py-2 bg-primary text-white hover:bg-black border-2 border-primary"
          >
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-300">
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

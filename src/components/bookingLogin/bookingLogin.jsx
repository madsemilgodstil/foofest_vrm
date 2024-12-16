"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext"; // Import AuthContext
import { getUserByCredentials, createUser } from "@/lib/supabaseUser"; // Auth helpers

// Validation schema using zod
const schema = z.object({
  name: z.string().optional(), // Name required only for signup
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const BookingLogin = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const { login } = useAuth(); // Use AuthContext for login

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    if (isLogin) {
      // Handle login
      const user = await getUserByCredentials(data.email, data.password);
      if (user) {
        login(user); // Pass full user object to AuthContext
        onLoginSuccess(); // Proceed after successful login
      } else {
        alert("Invalid email or password.");
      }
    } else {
      // Handle signup
      const newUser = {
        user_name: data.name,
        user_email: data.email,
        user_password: data.password,
      };
      const createdUser = await createUser(newUser);
      login(createdUser); // Log in after signup
      onLoginSuccess(); // Proceed after successful signup
    }
  };

  return (
    <div className="w-full p-8 rounded-lg shadow-lg max-w-4xl mx-auto text-white border border-primary">
      <h2 className="text-primary text-2xl mb-6 text-center">
        {isLogin
          ? "Login or sign up to see your tickets to FooFest"
          : "Create an Account"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <Input
              placeholder="Your Name"
              {...register("name")}
              className="w-full  text-white border rounded-md p-3"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email
          </label>
          <Input
            placeholder="Your Email"
            {...register("email")}
            className="w-full  text-white border rounded-md p-3"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Password
          </label>
          <Input
            type="password"
            placeholder="Your Password"
            {...register("password")}
            className="w-full text-white border  rounded-md p-3"
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
      <p className="mt-6 text-center text-sm text-gray-500">
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
  );
};

export default BookingLogin;

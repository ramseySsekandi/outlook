"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LoginProps } from "@/types";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginProps>();
  const validateEmail = (value: string) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com)$/;
    return emailPattern.test(value) || "Email must be from Gmail or Outlook";
  };
  async function onSubmit(data: LoginProps) {
    const baseUrl = process.env.NEXT_PUBLIC_URL;
    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/api/v1/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        // If the response is not ok, show an error message
        toast.error("Login failed");
        router.push("/login");
      } else {
        toast.success("Logged In Successfully");
        router.push("/");
        console.log(response);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to create User");
    } finally {
      setLoading(false);
    }
    reset();
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label htmlFor="username" className="text-sm text-gray-600">
          E-mail:
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your username"
          className="w-full"
          {...register("email", {
            required: "Email is required",
            validate: validateEmail,
          })}
        />
        {errors.email && (
          <span className="text-red-600">{errors.email.message}</span>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm text-gray-600">
          Password:
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full pr-10"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-600">This field is required</span>
          )}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#0078D4] hover:bg-[#006CBD] text-white"
      >
        {loading ? "Logging in..." : "Log in"}
      </Button>
      <div className="">
        <p>
          Don&apos;t have an account?
          <Link href="/register" className="text-blue-500 underline">
            Sign Up
          </Link>
        </p>
      </div>
    </form>
  );
}

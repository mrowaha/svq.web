"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; 
import { observer } from "mobx-react-lite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const LoginPage = () => {
    const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async () => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      alert(`Login successful for: ${email}`);
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Failed to login. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex w-full max-w-6xl shadow-lg h-full min-h-screen">
      {/* Left Section */}
      <Card className="flex-1 bg-black text-white flex flex-col p-10 relative h-[800px]">
            {/* Top Section for Title */}
            <div className="absolute top-6 left-6 flex items-center space-x-2">
                {/* Icon */}
            <img
                src="/cloverlogo.svg" // Path to your logo in the public folder
                alt="Clover Logo"
                className="w-5 h-5 text-white"
            />
                {/* Text */}
                <h1 className="text-xl font-bold text-white">Smart Vectorized Query</h1>
            </div>
    
            {/* Center Section for Logo and Main Text */}
            <div className="flex flex-1 flex-col items-center justify-center">
            <img src="/logo.svg" alt="Logo" className="w-48 h-48 mb-4" />
            {/* <h1 className="text-5xl font-extrabold mb-4">SVQ.ai</h1> */}
            </div>
        </Card>

      {/* Right Section */}
      <Card className="flex-1 bg-white flex flex-col items-center justify-center p-10 m-4">
        <div className="w-full max-w-lg">
          <div className="mb-6">
            <h1 className="text-3xl font-semibold text-center mb-4">Login to your Account</h1>
            <p className="text-sm text-gray-500 text-center">
              Enter your credentials below to login to your account
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            <div className="space-y-6">
              {/* Email Input */}
              <div>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 text-lg border-gray-300 border rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-3 text-lg border-gray-300 border rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                className="w-full bg-black text-white text-lg py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Login"}
              </Button>

              {/* Divider */}
              <div className="text-center text-sm text-gray-500">OR CONTINUE WITH</div>

              {/* GitHub Button */}
              <Button
                variant="outline"
                className="w-full flex items-center justify-center py-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5 mr-2"
                >
                  <path d="M12 0C5.371 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.11.793-.26.793-.578 0-.285-.01-1.04-.016-2.042-3.338.727-4.043-1.616-4.043-1.616-.545-1.387-1.332-1.756-1.332-1.756-1.089-.744.082-.729.082-.729 1.205.084 1.839 1.235 1.839 1.235 1.07 1.832 2.807 1.303 3.493.997.108-.775.419-1.303.762-1.604-2.665-.306-5.467-1.334-5.467-5.933 0-1.31.469-2.381 1.236-3.221-.123-.304-.535-1.527.117-3.18 0 0 1.007-.323 3.3 1.23.957-.266 1.984-.399 3.005-.404 1.02.005 2.048.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.241 2.876.118 3.18.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.923.43.372.814 1.106.814 2.229 0 1.609-.014 2.905-.014 3.301 0 .32.192.694.799.576C20.565 21.796 24 17.3 24 12 24 5.373 18.627 0 12 0z" />
                </svg>
                GitHub
              </Button>

              {/* Gmail Button */}
              <Button
                variant="outline"
                className="w-full flex items-center justify-center py-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="w-5 h-5 mr-2"
                >
                  <path d="M8 3.293L1.5 0 0 1.232V14l1.5.995L8 12.667l6.5 2.327L16 14V1.232L14.5 0 8 3.293zM8 4.607l6-3.333V13L8 10.117 2 13V1.273l6 3.334z" />
                </svg>
                Gmail
              </Button>
            </div>
          </form>

          <p className="text-xs text-center text-gray-500 mt-4">
            By clicking continue, you agree to our{" "}
            <a href="#" className="underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </Card>
    </div>
  );
};

export default observer(LoginPage);

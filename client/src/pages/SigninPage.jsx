"use client";

import { Plane } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate for redirection
import React, { FormEvent, useState } from "react";

const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleSignin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Signin failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token); // Store token in local storage

      navigate("/create-trip"); // Redirect to the create-trip page
    } catch (error) {
      console.error(error);
      alert("Signin failed");
    }
  };

  return (
    <main className="w-full flex">
      <div className="relative flex-1 hidden items-center justify-center h-screen bg-gray-900 lg:flex">
        <div className="relative z-10 w-full max-w-md">
          <p className="font-extrabold text-5xl text-white flex gap-4 my-auto">
            AuraTrips <Plane size={45} />
          </p>
          <div className=" mt-16 space-y-3">
            <h3 className="text-white text-3xl font-bold">
              Start planning your next journey today with AuraTrips.
            </h3>
            <p className="text-gray-300">
              Create an account and get access to all features for free!
            </p>
            <div className="flex items-center -space-x-2 overflow-hidden">
              <img
                src="https://randomuser.me/api/portraits/women/79.jpg"
                alt="User 1"
                className="w-10 h-10 rounded-full border-2 border-white"
                width={40}
                height={40}
              />
              <img
                src="https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
                alt="User 2"
                width={40}
                height={40}
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=a72ca28288878f8404a795f39642a46f"
                className="w-10 h-10 rounded-full border-2 border-white"
                alt="User 2"
                width={40}
                height={40}
              />
              <img
                src="https://randomuser.me/api/portraits/men/86.jpg"
                className="w-10 h-10 rounded-full border-2 border-white"
                alt="User 2"
                width={40}
                height={40}
              />
              <img
                src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e"
                className="w-10 h-10 rounded-full border-2 border-white"
                alt="User 2"
                width={40}
                height={40}
              />
              <p className="text-sm text-gray-400 font-medium translate-x-5">
                Join 5,000+ users
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 my-auto h-[500px]"
          style={{
            background:
              "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
            filter: "blur(118px)",
          }}
        ></div>
      </div>
      <div className="flex-1 flex items-center justify-center h-screen">
        <div className="w-full max-w-md space-y-8 px-4 bg-white text-gray-600 sm:px-0">
          <div className="">
            <div className="mt-5 space-y-2">
              <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                Sign In
              </h3>
              <p className="">
                Don't have an account?{" "}
                <Link
                  to={"/signup"}
                  className="font-medium text-black hover:text-gray-950"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
          <form onSubmit={handleSignin} className="space-y-5">
            <div>
              <label className="font-medium">Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
              />
            </div>
            <div>
              <label className="font-medium">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
              />
            </div>
            <button
              className="w-full px-4 py-2 text-white font-medium bg-black hover:bg-gray-950 active:bg-black rounded-lg duration-150"
              type="submit"
            >
                Sign In
              </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Signin;

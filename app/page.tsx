"use client";

import { useEffect } from "react";
import { initializePi, loginWithPi } from "../lib/pi";
export default function Home() {

  useEffect(() => {
    initializePi();
  }, []);

  const handlePiLogin = async () => {
    const user = await loginWithPi();

    if (user) {
      alert(`Welcome ${user.user.username}`);
      console.log(user);
    }
  };
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-bold text-purple-500">
          Asasanta Pi Trust
        </h1>

        <button
           onClick={handlePiLogin}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold"
>
                 Login with Pi
        </button>
      </header>

      {/* Hero Section */}
      <section className="text-center mt-20 px-6">
        <h2 className="text-5xl font-bold">
          AI-Powered Digital Trust
          <span className="text-purple-500"> on Pi Network</span>
        </h2>

        <p className="mt-6 text-xl text-gray-400 max-w-3xl mx-auto">
          Secure identity verification, AI trust scoring,
          and seamless Pi cryptocurrency payments.
        </p>

        <button className="mt-10 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-2xl text-black font-bold">
          Get Started
        </button>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 mt-20 p-8">

        <div className="bg-gray-900 p-6 rounded-2xl">
          <h3 className="text-2xl font-bold">
            🧠 AI Trust Score
          </h3>
          <p className="mt-4 text-gray-400">
            Analyze user identity and generate intelligent trust ratings.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl">
          <h3 className="text-2xl font-bold">
            🟣 Pi Login
          </h3>
          <p className="mt-4 text-gray-400">
            Authenticate securely using Pi Network identity.
          </p>
        </div>

        <div className="bg-gray-900 p-6 rounded-2xl">
          <h3 className="text-2xl font-bold">
            💳 Pi Payments
          </h3>
          <p className="mt-4 text-gray-400">
            Pay for AI-powered verification and digital services with Pi.
          </p>
        </div>

      </section>
    </main>
  );
}
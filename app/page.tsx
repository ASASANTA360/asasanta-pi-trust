"use client";

import { useState } from "react";
import { loginWithPi } from "@/lib/pi";
import { createPiPayment } from "@/lib/payment";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePiLogin = async () => {
    try {
      setLoading(true);
      const u = await loginWithPi();
      setUser(u || null);
    } catch (e) {
      console.error("Login failed", e);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePiPayment = async () => {
    alert("Pay button clicked");

    const payment = await createPiPayment(1, "AI Basic Verification Service");

    console.log("Payment result:", payment);

    if (payment) {
      alert("Pi Payment started successfully!");
    }
  };

  return (
    <main className="min-h-screen bg-black text-white p-6">
      
      {/* Header */}
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-500">
          Asasanta Pi Trust
        </h1>

        {!user ? (
          <button
            onClick={handlePiLogin}
            className="bg-purple-600 px-6 py-3 rounded-xl font-bold"
          >
            {loading ? "Connecting..." : "Login with Pi"}
          </button>
        ) : (
          <div className="text-green-400">
            🟢 Connected
          </div>
        )}
      </header>


      {/* Hero */}
      <section className="text-center mt-24">
        <h2 className="text-6xl font-bold">
          AI-Powered Digital Trust
          <span className="text-purple-500"> on Pi Network</span>
        </h2>

        <p className="text-gray-400 mt-6 text-xl">
          Secure identity verification, AI trust scoring,
          and Pi-powered digital services.
        </p>
      </section>


      {/* Dashboard */}
      {user && (
        <section className="mt-16 bg-gray-900 rounded-2xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            🟣 Welcome {user.username}
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-black p-5 rounded-xl">
              <h3 className="text-gray-400">
                Pi Username
              </h3>
              <p className="text-2xl font-bold">
                {user.username}
              </p>
            </div>

            <div className="bg-black p-5 rounded-xl">
              <h3 className="text-gray-400">
                User ID
              </h3>
              <p className="text-sm break-all">
                {user.uid}
              </p>
            </div>

            <div className="bg-black p-5 rounded-xl">
              <h3 className="text-gray-400">
                AI Trust Score
              </h3>
              <p className="text-5xl font-bold text-green-400">
                98%
              </p>
            </div>

            <div className="bg-black p-5 rounded-xl">
              <h3 className="text-gray-400">
                Verification Status
              </h3>
              <p className="text-green-400 font-bold">
                VERIFIED
              </p>
            </div>

          </div>


          <div className="mt-8 flex gap-4">
            
            <button className="bg-cyan-500 text-black font-bold px-6 py-3 rounded-xl">
              Start AI Verification
            </button>

            <button
                   onClick={handlePiPayment}
                     className="bg-purple-600 px-6 py-3 rounded-xl font-bold"
>
                           Pay with Pi
             </button>

          </div>

        </section>
      )}
    </main>
  );
}
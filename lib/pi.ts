declare global {
  interface Window {
    Pi: any;
  }
}

export const initializePi = () => {
  if (typeof window !== "undefined" && window.Pi) {
    window.Pi.init({
      version: "2.0",
      sandbox: true,
    });

    console.log("Pi SDK initialized");
    return true;
  }

  console.log("Pi SDK not found");
  return false;
};

export const loginWithPi = async () => {
  try {
    const scopes = ["username", "payments", "wallet_address"];

    const auth = await window.Pi.authenticate(
      scopes,
      function (payment: any) {
        console.log("Incomplete payment:", payment);
      }
    );

    console.log("Pi User:", auth);

    return auth;
  } catch (error) {
    console.error("Pi Login Failed:", error);
    return null;
  }
};
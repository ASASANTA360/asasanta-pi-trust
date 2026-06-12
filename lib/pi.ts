declare global {
  interface Window {
    Pi: any;
  }
}

export const initializePi = () => {
  if (typeof window === "undefined") return false;

  if (!window.Pi) {
    console.log("Pi Browser SDK not available");
    return false;
  }

  window.Pi.init({
    version: "2.0",
    sandbox: true,
  });

  console.log("Pi SDK initialized successfully");
  return true;
};

export const loginWithPi = async () => {
  try {
    const scopes = ["username", "payments"];

    const auth = await window.Pi.authenticate(
      scopes,
      function (payment: any) {
        console.log("Incomplete payment found:", payment);
      }
    );

    console.log("Pi User Auth:", auth);

    return {
      username: auth.user.username,
      uid: auth.user.uid,
      accessToken: auth.accessToken,
    };
  } catch (error) {
    console.error("Pi login failed:", error);
    return null;
  }
};
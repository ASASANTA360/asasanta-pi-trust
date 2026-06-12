declare global {
  interface Window {
    Pi: any;
  }
}

let piInitialized = false;

export const initializePi = () => {
  if (typeof window === "undefined") return false;

  if (!window.Pi) {
    console.log("Pi SDK not loaded yet");
    return false;
  }

  if (!piInitialized) {
    window.Pi.init({
      version: "2.0",
      sandbox: true,
    });

    piInitialized = true;
    console.log("Pi SDK initialized successfully");
  }

  return true;
};

export const loginWithPi = async () => {
  try {
    const ready = initializePi();

    if (!ready) {
      throw new Error("Pi SDK not available");
    }

    const scopes = ["username", "payments"];

    const auth = await window.Pi.authenticate(
      scopes,
      function (payment: any) {
        console.log("Incomplete payment:", payment);
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
declare global {
  interface Window {
    Pi: any;
  }
}

export const loginWithPi = async () => {
  try {
    // Check Pi SDK availability first
    const initialized = !!window.Pi;

    if (!initialized) {
      throw new Error("Pi SDK not available");
    }

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
declare global {
  interface Window {
    Pi: any;
  }
}

export const createPiPayment = async (
  amount: number,
  memo: string
) => {
  try {
    if (typeof window === "undefined") {
      throw new Error("Window not available");
    }

    if (!window.Pi) {
      throw new Error("Pi SDK not available");
    }

    console.log("Starting Pi payment...");

    const paymentData = {
      amount: amount,
      memo: memo,
      metadata: {
        app: "Asasanta Pi Trust",
        service: "AI Verification",
      },
    };

    const payment = await window.Pi.createPayment(
      paymentData,
      {
        // STEP 1: Server Approval
        onReadyForServerApproval: async (
          paymentId: string
        ) => {
          console.log(
            "Payment ready for approval:",
            paymentId
          );

          try {
            const response = await fetch(
              "/api/payments/approve",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  paymentId,
                }),
              }
            );

            const result = await response.json();

            console.log(
              "Approval successful:",
              result
            );

          } catch (error) {
            console.error(
              "Approval failed:",
              error
            );
          }
        },


        // STEP 2: Complete Payment
        onReadyForServerCompletion: async (
          paymentId: string,
          txid: string
        ) => {
          console.log(
            "Payment ready for completion:",
            paymentId,
            txid
          );

          try {
            const response = await fetch(
              "/api/payments/complete",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  paymentId,
                  txid,
                }),
              }
            );

            const result = await response.json();

            console.log(
              "Payment completed:",
              result
            );

            alert(
              "Payment completed successfully!"
            );

          } catch (error) {
            console.error(
              "Completion failed:",
              error
            );
          }
        },


        // User cancels payment
        onCancel: (
          paymentId: string
        ) => {
          console.log(
            "Payment cancelled:",
            paymentId
          );

          alert(
            "Payment was cancelled."
          );
        },


        // Payment error
        onError: (
          error: any,
          payment: any
        ) => {
          console.error(
            "Pi Payment Error:",
            error,
            payment
          );

          alert(
            "Payment failed. Check console."
          );
        },
      }
    );

    console.log(
      "Payment object:",
      payment
    );

    return payment;

  } catch (error) {

    console.error(
      "Pi Payment failed:",
      error
    );

    alert(
      "Unable to start Pi Payment"
    );

    return null;
  }
};
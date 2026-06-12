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
    if (!window.Pi) {
      throw new Error("Pi SDK not available");
    }

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
        onReadyForServerApproval: function (
          paymentId: string
        ) {
          console.log(
            "Payment ready for server approval:",
            paymentId
          );
        },

        onReadyForServerCompletion: function (
          paymentId: string,
          txid: string
        ) {
          console.log(
            "Payment completed:",
            paymentId,
            txid
          );
        },

        onCancel: function (
          paymentId: string
        ) {
          console.log(
            "Payment cancelled:",
            paymentId
          );
        },

        onError: function (
          error: any,
          payment: any
        ) {
          console.error(
            "Payment error:",
            error,
            payment
          );
        },
      }
    );

    return payment;

  } catch (error) {
    console.error(
      "Pi Payment failed:",
      error
    );

    return null;
  }
};
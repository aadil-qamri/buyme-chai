import initiate from "@/components/actions/useractions";

export async function POST(request) {
  try {
    const { amount, to_username, paymentform } = await request.json();

    // Call initiate function
    const order = await initiate(amount, to_username, paymentform);
    return Response.json(
      { 
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in /api/initiate:", error);
    return Response.json(
      { success: false, error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}

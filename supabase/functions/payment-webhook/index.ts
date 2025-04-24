
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") || "",
      Deno.env.get("SUPABASE_ANON_KEY") || ""
    );

    // Get the notification data from Mercado Pago
    const body = await req.json();
    console.log("Received webhook:", JSON.stringify(body));

    // Get the payment ID
    const paymentId = body.data?.id;
    
    if (!paymentId) {
      return new Response(
        JSON.stringify({ error: "No payment ID found in notification" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }

    // Get Mercado Pago credentials
    const { data: credentials, error: credentialsError } = await supabase
      .from("admin_config")
      .select("value")
      .eq("key", "mercadopago_access_token")
      .single();

    if (credentialsError || !credentials) {
      return new Response(
        JSON.stringify({ error: "Failed to get Mercado Pago credentials" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    const accessToken = credentials.value;

    // Get payment details from Mercado Pago
    const paymentUrl = `https://api.mercadopago.com/v1/payments/${paymentId}`;
    const paymentResponse = await fetch(paymentUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const paymentData = await paymentResponse.json();
    
    if (paymentResponse.status !== 200) {
      throw new Error(paymentData.message || "Failed to get payment information");
    }

    const externalReference = paymentData.external_reference; // User ID
    const status = paymentData.status; // 'approved', 'rejected', etc.

    // Update payment in database
    const { error: updateError } = await supabase
      .from("payments")
      .update({
        status: status === "approved" ? "completed" : status,
        payment_details: {
          ...paymentData,
          updated_at: new Date().toISOString(),
        },
      })
      .eq("payment_details->preference_id", paymentData.preference_id);

    if (updateError) {
      console.error("Error updating payment:", updateError);
      throw new Error("Failed to update payment status");
    }

    // If payment is approved, activate the subscription or ad
    if (status === "approved") {
      // Update the user's subscription or ad status
      // This would be tailored to your specific business logic
      console.log(`Payment approved for user ${externalReference}`);
      
      // Example: Activate an ad or subscription
      // const { error } = await supabase
      //   .from("advertisements")
      //   .update({ is_active: true })
      //   .eq("user_id", externalReference)
      //   .order("created_at", { ascending: false })
      //   .limit(1);
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

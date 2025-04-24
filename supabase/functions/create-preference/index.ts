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

    // Get the request body
    const { title, price, quantity, user_id } = await req.json();

    // Get Mercado Pago credentials from database
    const { data: credentials, error: credentialsError } = await supabase
      .from("admin_config")
      .select("*")
      .in("key", ["mercadopago_access_token", "mercadopago_public_key"]);

    if (credentialsError || !credentials || credentials.length < 2) {
      return new Response(
        JSON.stringify({ error: "Failed to get Mercado Pago credentials" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 500,
        }
      );
    }

    const accessToken = credentials.find(c => c.key === "mercadopago_access_token")?.value;
    const publicKey = credentials.find(c => c.key === "mercadopago_public_key")?.value;

    // Create a preference in Mercado Pago
    const url = "https://api.mercadopago.com/checkout/preferences";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        items: [
          {
            title,
            quantity: parseInt(quantity),
            unit_price: parseFloat(price),
            currency_id: "BRL",
          },
        ],
        back_urls: {
          success: `${Deno.env.get("SITE_URL")}/dashboard`,
          failure: `${Deno.env.get("SITE_URL")}/payment-failed`,
        },
        auto_return: "approved",
        external_reference: user_id,
        notification_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/payment-webhook`,
      }),
    });

    const data = await response.json();

    if (response.status !== 201) {
      throw new Error(data.message || "Failed to create preference");
    }

    // Record the payment intent in Supabase
    const { error } = await supabase
      .from("payments")
      .insert({
        user_id,
        amount: price,
        payment_method: "mercadopago",
        status: "pending",
        payment_details: {
          preference_id: data.id,
          items: [{ title, quantity, price }],
        },
      });

    if (error) {
      console.error("Error recording payment:", error);
    }

    return new Response(
      JSON.stringify({
        preferenceId: data.id,
        publicKey: publicKey,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error creating preference:", error);
    
    return new Response(
      JSON.stringify({ error: error.message || "Internal server error" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

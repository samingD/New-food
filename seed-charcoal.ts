import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jajcgwmwepwtkielavey.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImphamNnd213ZXB3dGtpZWxhdmV5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyODY4MDEsImV4cCI6MjA5MTg2MjgwMX0.XdwdLB38zT85sjK2wRSjIJHS8EuxcLDwybYWorXdNiY";
const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
  {
    name: "Premium Ayin Hardwood Charcoal",
    description: "Our top-tier Ayin Hardwood Charcoal is 100% natural, sparking-free, and ideal for restaurant grills and BBQ. It offers long burning hours, minimal ash, and a pure white ash output, ensuring authentic flavors and consistent high heat. \n\nSpecifications: \n- Moisture Content: <8% \n- Ash Content: <4% \n- Volatile Matter: <10% \n- Fixed Carbon: >75% \n- Size: 30mm - 120mm \n- Packing: 10kg, 15kg, 20kg bags",
    price: 0,
    image: "https://nigeriacharcoal.com/assets/restaurant-Bc-KqGRm.jpeg"
  },
  {
    name: "Acacia Hardwood Charcoal",
    description: "Acacia Hardwood Charcoal is loved globally for BBQ due to its density, incredible heat, and low smoke features. Sustainably sourced in Nigeria, this charcoal yields excellent roasting and grilling experiences without altering the taste of your food.\n\nSpecifications: \n- Moisture Content: <8% \n- Ash Content: <5% \n- Volatile Matter: <15% \n- Fixed Carbon: >70% \n- Size: 40mm - 150mm \n- Packing: PP Bags / Paper Bags",
    price: 0,
    image: "https://nigeriacharcoal.com/assets/bbq-W5M65HxM.jpeg"
  },
  {
    name: "Shisha / Hookah Charcoal (Cubes)",
    description: "Our 100% natural Shisha Charcoal features steady glow, zero sparks, zero flavor interference, and zero smoke. Perfect for indoor lounging, it comes meticulously shaped as cubes or fingers depending on your specifications.\n\nSpecifications: \n- Moisture Content: <5% \n- Ash Content: <3% \n- Burning time: 2 - 3 hours \n- Fixed Carbon: >80% \n- Shape: Square / Hexagonal",
    price: 0,
    image: "https://images.unsplash.com/photo-1621217036329-8472506b3e70?auto=format&fit=crop&q=80&w=1200"
  },
  {
    name: "Restaurant Grade Barbecue Charcoal",
    description: "Specially screened thick Marabu/Ayin lumps suitable for high-end restaurants, steak houses, and pizzerias. They burn extremely hot for over 4 hours with steady temperatures and minimal ash.\n\nSpecifications:\n- No unburnt wood\n- Moisture Content: Max 6%\n- High heat / no spark\n- Clean white ash",
    price: 0,
    image: "https://nigeriacharcoal.com/assets/WhatsApp%20Image%202025-10-24%20at%2020.25.28_1761410366752-8jD8Ztid.jpeg"
  }
];

async function seed() {
  console.log("Fetching existing products...");
  const { data: existing, error: fetchErr } = await supabase.from("products").select("*");
  if (fetchErr) {
    console.error("Fetch error:", fetchErr);
    return;
  }
  
  if (existing && existing.length > 0) {
    const ids = existing.map(e => e.id);
    console.log("Deleting " + ids.length + " existing products...");
    for (const id of ids) {
       const { error: delErr } = await supabase.from("products").delete().eq("id", id);
       if (delErr) {
          console.error("Failed to delete " + id + ":", delErr);
       }
    }
  }

  console.log("Inserting new charcoal products...");
  for (const product of products) {
    const { error: insErr } = await supabase.from("products").insert([product]);
    if (insErr) {
       console.error("Error inserting " + product.name + ":", insErr);
    } else {
       console.log("Inserted " + product.name);
    }
  }
  console.log("Done!");
}

seed();

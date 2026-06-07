import express from "express";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-key-for-imaniglobal";

let supabase: ReturnType<typeof createClient> | null = null;

let fallbackProducts = [
  {
    id: "1",
    name: "Premium Ayin Hardwood Charcoal",
    description: "Our top-tier Ayin Hardwood Charcoal is 100% natural, sparking-free, and ideal for restaurant grills and BBQ.",
    price: 450,
    image: "https://jajcgwmwepwtkielavey.supabase.co/storage/v1/object/public/products/premium_ayin.png",
  },
  {
    id: "2",
    name: "Acacia Hardwood Charcoal",
    description: "Acacia Hardwood Charcoal is loved globally for BBQ due to its density, incredible heat, and low smoke features.",
    price: 400,
    image: "https://jajcgwmwepwtkielavey.supabase.co/storage/v1/object/public/products/acacia.png",
  },
  {
    id: "3",
    name: "Shisha / Hookah Charcoal (Cubes)",
    description: "Our 100% natural Shisha Charcoal features steady glow, zero sparks, zero flavor interference, and zero smoke.",
    price: 500,
    image: "https://jajcgwmwepwtkielavey.supabase.co/storage/v1/object/public/products/shisha_cubes.png",
  },
  {
    id: "4",
    name: "Restaurant Grade BBQ Charcoal",
    description: "Specially screened thick Marabu/Ayin lumps suitable for high-end restaurants, steak houses, and pizzerias.",
    price: 480,
    image: "https://jajcgwmwepwtkielavey.supabase.co/storage/v1/object/public/products/restaurant_bbq.png",
  }
];

function getSupabase() {
  if (!supabase) {
    const supabaseUrl =
      process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.VITE_SUPABASE_ANON_KEY ||
      process.env.SUPABASE_ANON_KEY ||
      "";

    if (!supabaseUrl || !supabaseKey) return null;
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
}

const authenticateAdmin = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token provided" });
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

const countryNames = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo (DRC)",
  "Congo (Republic)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "East Timor",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea, North",
  "Korea, South",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

let shippingRates = countryNames.map((country, idx) => ({
  id: String(idx + 1),
  country: country,
  cargo: 150,
  shipping: 50,
}));

const app = express();
app.use(express.json({ limit: "10mb" }));

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;
  const adminEmails = [
    "admin@imaniglobal.com",
    "chukwuebukablaize11@gmail.com",
  ];
  if (
    adminEmails.includes(email.trim().toLowerCase()) &&
    password === "sammy1122"
  ) {
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "24h" });
    return res.json({ token });
  }
  return res.status(401).json({ error: "Invalid credentials" });
});


app.get("/api/gallery", async (req, res) => {
  try {
    const db = getSupabase();
    if (!db) {
      return res.json(fallbackProducts.filter(p => p.name === '_gallery_image').map(p => ({id: p.id, image: p.image})));
    }
    const { data, error } = await (db as any)
      .from("products")
      .select("id, image")
      .eq("name", "_gallery_image")
      .order("created_at", { ascending: false });
    if (error) throw error;
    res.json(data || []);
  } catch (error: any) {
    res.json([]);
  }
});

app.post("/api/gallery", authenticateAdmin, async (req, res) => {
  try {
    const db = getSupabase();
    const { image } = req.body;
    if (!db) {
      const newImg = { id: Date.now().toString(), name: '_gallery_image', description: '', price: 0, image };
      fallbackProducts.push(newImg);
      return res.json({ id: newImg.id, image });
    }
    const { data, error } = await (db as any)
      .from("products")
      .insert([{ name: "_gallery_image", description: '', price: 0, image }])
      .select("id, image")
      .single();
    if (error) {
      if (error.code === "PGRST205" || error.message?.includes("not find the table") || error.code === "42P01") {
        const newImg = { id: Date.now().toString(), name: '_gallery_image', description: '', price: 0, image };
        fallbackProducts.push(newImg);
        return res.json({ id: newImg.id, image });
      }
      throw error;
    }
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/gallery/:id", authenticateAdmin, async (req, res) => {
  try {
    const db = getSupabase();
    const { id } = req.params;
    if (!db) {
      fallbackProducts = fallbackProducts.filter(p => p.id !== id);
      return res.json({ success: true });
    }
    const { error } = await (db as any).from("products").delete().eq("id", id);
    if (error) {
      if (error.code === "PGRST205" || error.message?.includes("not find the table") || error.code === "42P01") {
        fallbackProducts = fallbackProducts.filter(p => p.id !== id);
        return res.json({ success: true });
      }
      throw error;
    }
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/health", (req, res) => {
  const db = getSupabase();
  res.json({ status: "ok", db_connected: !!db });
});

app.get("/api/products", async (req, res) => {
  try {
    const db = getSupabase();

    const formatProducts = (list: any[]) => list.filter(p => p.name && !String(p.name).startsWith("_")).map(p => {
      let outOfStock = false;
      let description = p.description || '';
      if (description.includes('||OUT_OF_STOCK')) {
        outOfStock = true;
        description = description.replace(/\|\|OUT_OF_STOCK/g, '');
      }
      return { ...p, description, outOfStock };
    });

    if (!db) return res.json(formatProducts(fallbackProducts));
    const { data, error } = await db
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) {
      if (
        error.code === "PGRST205" ||
        error.code === "PGRST116" ||
        error.code === "22P02" ||
        error.message?.includes("not find the table") ||
        error.code === "42P01"
      ) {
        return res.json(formatProducts(fallbackProducts));
      }
      throw error;
    }
    const filteredData = formatProducts(data);
    res.json(filteredData);
  } catch (error: any) {
    res.json(fallbackProducts);
  }
});

app.post("/api/products", authenticateAdmin, async (req, res) => {
  try {
    const { name, description: reqDescription, price, image, outOfStock } = req.body;
    let description = reqDescription || '';
    if (outOfStock) description += '||OUT_OF_STOCK';
    const db = getSupabase();
    if (!db) {
      const newProduct = {
        id: Date.now().toString(),
        name,
        description,
        price: Number(price),
        image: image || "https://picsum.photos/seed/agro/600/400",
      };
      fallbackProducts.push(newProduct);
      return res.status(201).json(newProduct);
    }
    const { data, error } = await (db as any)
      .from("products")
      .insert([
        {
          name,
          description,
          price: Number(price),
          image: image || "https://picsum.photos/seed/agro/600/400",
        },
      ])
      .select()
      .single();
    if (error) {
      if (
        error.code === "PGRST205" ||
        error.code === "PGRST116" ||
        error.code === "22P02" ||
        error.message?.includes("not find the table") ||
        error.code === "42P01"
      ) {
        const newProduct = {
          id: Date.now().toString(),
          name,
          description,
          price: Number(price),
          image: image || "https://picsum.photos/seed/agro/600/400",
        };
        fallbackProducts.push(newProduct);
        return res.status(201).json(newProduct);
      }
      throw error;
    }
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to add product" });
  }
});

app.put("/api/products/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description: reqDescription, price, image, outOfStock } = req.body;
    // We must fetch existing to properly update description flag
    let description = reqDescription ?? '';
    if (outOfStock !== undefined) {
       description = description.replace(/\|\|OUT_OF_STOCK/g, '');
       if (outOfStock) description += '||OUT_OF_STOCK';
    }
  
    const db = getSupabase();
    if (!db) {
      const index = fallbackProducts.findIndex((p) => p.id === id);
      if (index === -1)
        return res.status(404).json({ error: "Product not found" });
      fallbackProducts[index] = {
        ...fallbackProducts[index],
        name: name || fallbackProducts[index].name,
        description: description || fallbackProducts[index].description,
        price: price ? Number(price) : fallbackProducts[index].price,
        image: image || fallbackProducts[index].image,
      };
      return res.json(fallbackProducts[index]);
    }
    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (price !== undefined) updateData.price = Number(price);
    if (image !== undefined) updateData.image = image;
    const { data, error } = await (db as any)
      .from("products")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();
    if (error) {
      if (
        error.code === "PGRST205" ||
        error.code === "PGRST116" ||
        error.code === "22P02" ||
        error.message?.includes("not find the table") ||
        error.code === "42P01"
      ) {
        const index = fallbackProducts.findIndex((p) => p.id === id);
        if (index === -1)
          return res.status(404).json({ error: "Product not found" });
        fallbackProducts[index] = {
          ...fallbackProducts[index],
          name: name || fallbackProducts[index].name,
          description: description || fallbackProducts[index].description,
          price: price ? Number(price) : fallbackProducts[index].price,
          image: image || fallbackProducts[index].image,
        };
        return res.json(fallbackProducts[index]);
      }
      throw error;
    }
    res.json(data);
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to update product" });
  }
});

app.delete("/api/products/:id", authenticateAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const db = getSupabase();
    if (!db) {
      fallbackProducts = fallbackProducts.filter((p) => p.id !== id);
      return res.json({ success: true });
    }
    const { error } = await db.from("products").delete().eq("id", id);
    if (error) {
      if (
        error.code === "PGRST205" ||
        error.code === "PGRST116" ||
        error.code === "22P02" ||
        error.message?.includes("not find the table") ||
        error.code === "42P01"
      ) {
        fallbackProducts = fallbackProducts.filter((p) => p.id !== id);
        return res.json({ success: true });
      }
      throw error;
    }
    res.json({ success: true });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: error.message || "Failed to delete product" });
  }
});

export default app;

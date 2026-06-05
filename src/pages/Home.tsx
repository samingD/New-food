import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import {
  ArrowRight,
  Leaf,
  Flame,
  ShieldCheck,
  Box,
  Globe,
  Package,
  CheckCircle2,
  Star,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../store";

export default function Home() {
  const products = useStore((state) => state.products);
  const galleryImages = useStore((state) => state.galleryImages);
  const fetchGalleryImages = useStore((state) => state.fetchGalleryImages);
  const featuredProducts = products.slice(0, 4);
  const navigate = useNavigate();
  const fetchProducts = useStore((state) => state.fetchProducts);

  React.useEffect(() => {
    fetchProducts();
    fetchGalleryImages();
  }, [fetchProducts, fetchGalleryImages]);

  const handleViewDetails = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative flex-1 min-h-[600px] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-black">
        <img 
          src="https://jajcgwmwepwtkielavey.supabase.co/storage/v1/object/public/products/charcoal_hero.png"
          alt="Charcoal Hero"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay"></div>
        <section className="p-8 md:p-16 flex flex-col justify-center items-center text-center relative z-10 w-full max-w-5xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-white/80 uppercase font-bold text-xs md:text-sm tracking-[0.3em] mb-8 block drop-shadow-md border border-white/20 px-6 py-2 rounded-full backdrop-blur-sm"
          >
            Premium Charcoal Exports
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05] font-bold mb-8 tracking-tight text-white drop-shadow-2xl uppercase"
          >
            Premium Nigerian
            <br className="hidden md:block" /> Hardwood Charcoal
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg md:text-2xl text-gray-300 mb-12 max-w-3xl drop-shadow-sm font-medium leading-relaxed"
          >
            Export-quality charcoal from Nigeria's finest hardwoods. Restaurant
            grade, BBQ, and industrial charcoal export worldwide.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-wrap gap-6 justify-center"
          >
            <Link
              to="/shop"
              className="px-8 py-4 bg-white text-black font-bold text-sm rounded hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all duration-300 uppercase tracking-widest flex items-center gap-3 group"
            >
              Explore Products
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="https://api.whatsapp.com/send?phone=447379352882&text=Hello%20I%20would%20like%20to%20place%20a%20bulk%20order%20for%20charcoal."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-transparent border border-white/40 text-white font-bold text-sm rounded hover:bg-white/10 hover:border-white transition-all duration-300 uppercase tracking-widest flex items-center gap-3 backdrop-blur-sm"
            >
              Request a Quote
            </a>
          </motion.div>
        </section>
      </section>

      {/* About / Vision Section */}
      <section className="py-24 px-8 md:px-16 bg-white overflow-hidden relative border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gray-100 rounded-2xl transform -rotate-2 -z-10"></div>
              <img
                src="https://jajcgwmwepwtkielavey.supabase.co/storage/v1/object/public/products/acacia.png"
                alt="Charcoal Process"
                className="w-full aspect-[4/5] object-cover rounded-2xl shadow-xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-black text-white p-8 rounded-xl shadow-2xl max-w-xs md:block hidden">
                <p className="text-xl font-bold font-display uppercase tracking-widest leading-snug">
                  Unmatched Heat,
                  <br />
                  Low Ash,
                  <br />
                  Long Burn.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              <div>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-4 block">
                  Our Vision
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-black leading-tight uppercase tracking-wide">
                  Elevating your charcoal sourcing
                </h2>
              </div>
              <div className="prose prose-lg text-gray-600">
                <p className="tracking-wide">
                  We are a registered United Kingdom charcoal and agricultural commodities company that sources and exports the absolute best natural hardwood charcoal globally. With our expert sourcing team based on the ground in Nigeria's major charcoal regions — including Oyo, Kwara, and Niger States — we ensure the highest standards of quality from forest to port.
                </p>
                <div className="my-8 p-6 bg-gradient-to-r from-gray-50 to-white border-l-4 border-primary rounded-r-xl shadow-sm">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 p-2 bg-primary/10 rounded-full shrink-0">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">United Kingdom Registration</span>
                        <p className="text-base font-semibold text-gray-800 leading-snug">
                          Registered as <span className="text-black">IMANIGLOBAL GROUP LIMITED</span>
                          <br/><span className="font-normal text-gray-500">Registration No:</span> <span className="font-mono bg-gray-100 px-1 py-0.5 rounded text-primary">17184656</span>
                        </p>
                      </div>
                    </div>
                    <div className="w-full h-px bg-gray-100 my-2"></div>
                    <div className="flex items-start gap-4">
                      <div className="mt-1 p-2 bg-primary/10 rounded-full shrink-0">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <span className="block text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Nigeria Registration (CAC)</span>
                        <p className="text-base font-semibold text-gray-800 leading-snug">
                          Registered as <span className="text-black">IMANIGLOBAL FARMS AGRO INVESTMENT CO,LTD</span>
                          <br/><span className="font-normal text-gray-500">Registration No:</span> <span className="font-mono bg-gray-100 px-1 py-0.5 rounded text-primary">7368228</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="tracking-wide">
                </p>
                <p className="tracking-wide">
                  Our mission is to showcase high-quality African charcoal as one of the
                  finest natural fuels in the world, combining traditional
                  craftsmanship with international export standards. We aim to
                  be the leading and most trusted global charcoal exporter by
                  delivering consistent quality, container by container.
                </p>
              </div>
              <div className="pt-6 grid grid-cols-2 gap-8 border-t border-gray-100">
                <div>
                  <h4 className="text-4xl font-display font-bold text-black mb-2">
                    100%
                  </h4>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">
                    Natural Hardwood
                  </p>
                </div>
                <div>
                  <h4 className="text-4xl font-display font-bold text-black mb-2">
                    5+
                  </h4>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">
                    Hours Burn Time
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="py-24 px-8 md:px-16 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-4 block">
              Our Process
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-black uppercase tracking-wider">
              From Forest to Export
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Combining traditional craftsmanship with international export
              standards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[1px] bg-gray-300 z-0"></div>

            {[
              {
                icon: <Leaf className="w-8 h-8 text-white" />,
                title: "Sustainable Sourcing",
                desc: "From selected hardwood areas in Oyo, Kwara, and Niger States.",
              },
              {
                icon: <CheckCircle2 className="w-8 h-8 text-white" />,
                title: "Quality Control",
                desc: "By size and grade (Restaurant, BBQ, Industrial). Meticulous sorting.",
              },
              {
                icon: <Package className="w-8 h-8 text-white" />,
                title: "Export Packaging",
                desc: "In high-quality PP, BOPP bags and carton boxes (9kg to 50kg).",
              },
              {
                icon: <Globe className="w-8 h-8 text-white" />,
                title: "Global Export",
                desc: "Professional documentation. Delivering premium charcoal container by container.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 rounded-full bg-black flex items-center justify-center mb-8 shadow-xl group-hover:scale-110 transition-transform duration-500 border-4 border-gray-50">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-black uppercase tracking-wide mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-8 md:px-16 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <span className="text-white/50 font-bold uppercase tracking-widest text-sm mb-4 block">
                Why IMANIGLOBAL AGRO
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 uppercase tracking-wide leading-tight">
                The Gold Standard in Natural Fuel
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-12">
                Nigeria's dense tropical forests produce some of the world's
                finest hardwood charcoal. Every container we export represents
                consistent, reliable, high-grade charcoal.
              </p>

              <div className="space-y-8">
                {[
                  {
                    title: "Dense Hardwoods",
                    desc: "Sourced from dense hardwoods like Ayin and Acacia — yielding high carbon density and exceptionally long burn times.",
                    icon: <Flame className="w-6 h-6 text-white" />,
                  },
                  {
                    title: "Clean Burning",
                    desc: "Our premium charcoal has less than 3% ash content and provides 3-5 hours of consistent heat with white ash ready for use.",
                    icon: <ShieldCheck className="w-6 h-6 text-white" />,
                  },
                  {
                    title: "Sustainable Forestry",
                    desc: "Supporting a cleaner, greener charcoal industry. Working with local farmers to ensure production remains environmentally responsible.",
                    icon: <Leaf className="w-6 h-6 text-white" />,
                  },
                ].map((feature, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center shrink-0">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold uppercase tracking-widest mb-2">
                        {feature.title}
                      </h4>
                      <p className="text-gray-400 leading-relaxed text-sm">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src="https://jajcgwmwepwtkielavey.supabase.co/storage/v1/object/public/products/restaurant_bbq.png"
                alt="Grill Fire"
                className="w-full h-full object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <div className="border border-white/20 backdrop-blur-md bg-black/40 p-8 rounded">
                  <p className="text-2xl font-display font-light italic text-white mb-6">
                    "When you work with us, you're not just buying charcoal —
                    you're supporting sustainable forestry and unmatched
                    quality."
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Box className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-bold uppercase tracking-widest text-sm">
                        Export Division
                      </p>
                      <p className="text-gray-400 text-sm">
                        IMANIGLOBAL AGRO LIMITED
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Export Specifications (FOB) */}
      <section className="py-24 px-8 md:px-16 bg-gray-50">
        <div className="max-w-5xl mx-auto bg-white p-10 md:p-14 rounded-3xl shadow-xl border border-gray-100 flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <span className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-4 block">
              NIGERIA 🇳🇬
            </span>
            <h2 className="font-display text-4xl font-bold mb-4 text-black uppercase tracking-wider">
              Charcoal
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed max-w-sm uppercase text-xs tracking-widest font-bold">
              Available for export
            </p>
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 mt-8">
              <span className="block text-sm text-gray-500 uppercase tracking-widest font-bold mb-2">Price Estimate</span>
              <div className="text-3xl font-display font-bold text-black">??$/ton FOB</div>
              <p className="text-xs text-gray-400 mt-2">Contact us on WhatsApp for final quote</p>
            </div>
          </div>
          <div className="flex-[1.5]">
             <ul className="space-y-4 text-sm md:text-base">
               <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-3 gap-1">
                 <span className="font-bold text-gray-400 uppercase tracking-widest text-xs">Type</span>
                 <span className="font-semibold text-black sm:text-right">Grade A+ Fingers quality</span>
               </li>
               <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-3 gap-1">
                 <span className="font-bold text-gray-400 uppercase tracking-widest text-xs">Origin</span>
                 <span className="font-semibold text-black sm:text-right">Nigeria</span>
               </li>
               <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-3 gap-1">
                 <span className="font-bold text-gray-400 uppercase tracking-widest text-xs">Wood Type</span>
                 <span className="font-semibold text-black sm:text-right">100% beech wood (Ayin)</span>
               </li>
               <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-3 gap-1">
                 <span className="font-bold text-gray-400 uppercase tracking-widest text-xs">Processing</span>
                 <span className="font-semibold text-black sm:text-right">Hand picking / Manual processing</span>
               </li>
               <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-3 gap-1">
                 <span className="font-bold text-gray-400 uppercase tracking-widest text-xs">Sizes</span>
                 <span className="font-semibold text-black sm:text-right">50mm - 150mm</span>
               </li>
               <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-3 gap-1">
                 <span className="font-bold text-gray-400 uppercase tracking-widest text-xs">Quality</span>
                 <span className="font-semibold text-black sm:text-right max-w-[300px]">No spark, No smoke, No dust, long time burning, easy to ignite, low ash.</span>
               </li>
               <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b border-gray-100 pb-3 gap-1">
                 <span className="font-bold text-gray-400 uppercase tracking-widest text-xs">Packaging Options</span>
                 <span className="font-semibold text-black sm:text-right">10kg, 15kg, 20kg</span>
               </li>
               <li className="flex flex-col sm:flex-row sm:justify-between sm:items-center pt-1 gap-1">
                 <span className="font-bold text-gray-400 uppercase tracking-widest text-xs">Container Quantity</span>
                 <span className="font-semibold text-black sm:text-right">20 tons above</span>
               </li>
             </ul>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-8 md:px-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="flex-1">
              <span className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-4 block">
                Product Catalog
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-black uppercase tracking-wider">
                Our Premium Charcoal
              </h2>
            </div>
            <Link
              to="/shop"
              className="text-black font-bold uppercase tracking-widest text-sm border-b-2 border-black hover:text-gray-500 hover:border-gray-500 transition-colors pb-1 flex items-center gap-2"
            >
              View Full Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={(e) => handleViewDetails(product, e)}
                  className="bg-white group flex flex-col cursor-pointer"
                >
                  <div className="w-full aspect-[4/5] bg-gray-100 relative overflow-hidden mb-6 shadow-sm group-hover:shadow-2xl transition-shadow duration-500">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 uppercase text-xs tracking-widest font-bold">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="flex flex-col flex-1 px-2">
                    <h3 className="text-lg font-bold uppercase mb-3 text-black tracking-widest leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-6 flex-1 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                        Export Ready
                      </div>
                      <span className="text-black font-bold uppercase tracking-widest text-xs border-b border-black pb-0.5">
                        Details
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-gray-500 bg-gray-50 rounded-lg uppercase tracking-widest text-sm font-bold">
                No products found. Add charcoal in the admin panel.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Gallery Grid */}
      <section className="py-20 px-8 md:px-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-black uppercase tracking-wider">
              Product Gallery
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Explore our premium natural hardwood charcoal ready for global
              shipping.
            </p>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...products, ...(galleryImages || [])].filter(item => item.image).map((item: any, idx) => (
              <div
                key={item.id || idx}
                className="aspect-[4/3] bg-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group relative"
              >
                <img
                  src={item.image}
                  alt={item.name || 'Gallery Image'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8 pointer-events-none">
                  <span className="text-white font-bold text-xl uppercase tracking-wider translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {item.name || 'Premium Quality'}
                  </span>
                  {item.price ? <span className="text-primary font-semibold mt-2">${item.price} / Ton</span> : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-8 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-black tracking-tight uppercase">
              Client Testimonials
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              See what our international partners and bulk buyers are saying
              about our premium charcoal commodities.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "David O.",
                company: "Restaurant Supplies UK",
                review:
                  "The Acacia hardwood charcoal we received was of exceptional grade. Perfect for our high-end restaurant clients. Their customer service via WhatsApp is incredibly responsive.",
                rating: 5,
              },
              {
                name: "Sarah M.",
                company: "Premium Grills Co.",
                review:
                  "We rely heavily on their Shisha and BBQ charcoal. The density and low smoke qualities are unmatched. The ordering process was seamless and delivery was on time.",
                rating: 5,
              },
              {
                name: "Ahmed T.",
                company: "AgroTrade International",
                review:
                  "We ordered a large shipment of Ayin charcoal for BBQ. The packaging was secure, no dust, and the quality exceeded our expectations. Will definitely order again.",
                rating: 5,
              },
            ].map((review, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-3xl relative">
                <div className="flex gap-1 text-black mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed mb-8 italic">
                  "{review.review}"
                </p>
                <div>
                  <h4 className="font-bold text-black">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-32 px-8 md:px-16 bg-black text-center text-white">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <Box className="w-16 h-16 text-white mb-8" />
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-8 uppercase tracking-wider leading-tight">
            Ready to stock Nigeria's finest charcoal?
          </h2>
          <p className="text-gray-400 text-xl leading-relaxed mb-12">
            Get in touch for the latest pricing, shipping options, and technical
            specifications for bulk orders.
          </p>
          <a
            href="https://api.whatsapp.com/send?phone=447379352882"
            target="_blank"
            rel="noopener noreferrer"
            className="px-12 py-5 bg-white text-black font-bold text-sm rounded hover:bg-gray-200 transition-colors uppercase tracking-[0.2em] shadow-xl"
          >
            Start Your Order On WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}

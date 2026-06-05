import { ShieldCheck, Globe } from "lucide-react";
export default function About() {
  return (
    <div className="min-h-screen bg-bg py-16 px-8 md:px-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="font-sans text-primary uppercase font-bold text-xs tracking-[0.15em] mb-4 block">
            Our Story
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-black mb-6">
            About Us
          </h1>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-300">
          <div className="prose prose-lg max-w-none text-text-muted">
            <p className="text-xl leading-relaxed text-black font-medium mb-8 text-center">
              IMANIGLOBAL AGRO LIMITED is a registered United Kingdom charcoal and agricultural commodities company dedicated to sourcing and exporting the finest natural hardwood charcoal globally. With our expert sourcing team stationed on the ground in Nigeria, we specialize in delivering premium restaurant-grade BBQ charcoal, Ayin, Acacia, and Shisha lump charcoal to businesses worldwide.
            </p>

            <div className="my-10 p-8 bg-gradient-to-br from-gray-50 flex flex-col md:flex-row gap-8 to-white border-y border-gray-100 shadow-sm rounded-xl">
              <div className="flex-1 flex items-start gap-5">
                <div className="mt-1 p-3 bg-primary/10 rounded-full shrink-0">
                  <ShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">United Kingdom Registration</span>
                  <p className="text-lg font-semibold text-gray-800 leading-snug">
                    Registered as <span className="text-black">IMANIGLOBAL GROUP LIMITED</span>
                    <br/><span className="font-normal text-sm text-gray-500 mt-1 block">Registration No: <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-primary">17184656</span></span>
                  </p>
                </div>
              </div>
              <div className="hidden md:block w-px bg-gray-200"></div>
              <div className="md:hidden w-full h-px bg-gray-200"></div>
              <div className="flex-1 flex items-start gap-5">
                <div className="mt-1 p-3 bg-primary/10 rounded-full shrink-0">
                  <Globe className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Nigeria Registration (CAC)</span>
                  <p className="text-lg font-semibold text-gray-800 leading-snug">
                    Registered as <span className="text-black">IMANIGLOBAL FARMS AGRO INVESTMENT CO,LTD</span>
                    <br/><span className="font-normal text-sm text-gray-500 mt-1 block">Registration No: <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-primary">7368228</span></span>
                  </p>
                </div>
              </div>
            </div>

            <p className="hidden">
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-12">
              <div>
                <h3 className="font-bold text-black text-xl mb-4 uppercase tracking-wider">
                  Our Mission
                </h3>
                <p>
                  To bridge the gap between local farmers and global markets by
                  providing a reliable, transparent, and efficient supply chain
                  for premium hardwood charcoal. We are committed to
                  sustainable practices that benefit both our clients and the
                  communities we source from.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-black text-xl mb-4 uppercase tracking-wider">
                  Our Vision
                </h3>
                <p>
                  To be the leading global exporter of African hardwood charcoal
                  commodities, recognized for our unwavering commitment to
                  quality, integrity, and customer satisfaction.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded border border-gray-100 text-center mt-12">
              <h3 className="font-display text-2xl font-bold text-black mb-4">
                Our Focus is Simple
              </h3>
              <p className="text-lg text-primary font-semibold italic">
                Quality, Reliability, and Customer Satisfaction.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

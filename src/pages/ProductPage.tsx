import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ShoppingCart, ArrowLeft } from "lucide-react";
import { useStore } from "../store";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, fetchProducts, addToCart, isLoading } = useStore();
  const [quantity, setQuantity] = useState<string>("0");

  useEffect(() => {
    if (products.length === 0 && !isLoading) {
      fetchProducts();
    }
  }, [products.length]);

  const product = products.find((p) => String(p.id) === String(id));

  if (!product) {
    if (isLoading) {
      return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center">
          <p className="text-xl text-gray-500 mb-4 animate-pulse">
            Loading product...
          </p>
        </div>
      );
    }
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <p className="text-xl text-gray-500 mb-4">Product not found.</p>
        <Link
          to="/shop"
          className="text-primary hover:underline font-semibold flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>
      </div>
    );
  }

  const handleOrderWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello, I would like to place an order.\n\n*Product Details:*\n*Name:* ${product.name}\n*Price:* ${product.price ? `$${product.price}` : 'Price on request'}\n*Description:* ${product.description}\n\nPlease let me know the process for bulk ordering.`
    );
    window.open(
      `https://api.whatsapp.com/send?phone=447379352882&text=${text}`,
      "_blank",
    );
  };

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <button
          onClick={() => navigate(-1)}
          className="text-primary hover:underline font-semibold flex items-center gap-2 mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Go Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 relative shadow-inner">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="flex flex-col justify-center">
            <span className="font-sans text-primary uppercase font-bold text-xs tracking-[0.2em] mb-4 block">
              Premium Commodity
            </span>
             <h1 className="font-display text-4xl font-bold text-black mb-6 uppercase tracking-wider">
               {product.name}
             </h1>
             
             {product.price > 0 && (
                <div className="font-sans text-2xl font-bold text-black mb-6">
                  ${product.price}
                  <span className="text-sm text-gray-500 ml-2 font-normal">per ton</span>
                </div>
             )}

             <div className="bg-gray-50 border border-gray-100 rounded-xl p-6 mb-8 flex items-center justify-between shadow-sm">
               <div>
                 <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                   Availability
                 </span>
                 <span className={`block text-sm sm:text-base font-bold ${product.outOfStock ? 'text-red-500' : 'text-black'}`}>
                   {product.outOfStock ? 'Out of Stock' : 'In Stock for Export'}
                 </span>
               </div>
               <div className="text-right">
                 <span className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                   Order Minimum
                 </span>
                 <span className="block text-sm sm:text-base font-bold text-primary">
                   1 Ton
                 </span>
               </div>
             </div>

             <div className="prose prose-sm text-gray-600 mb-8 max-w-none text-lg">
               <p className="leading-relaxed">{product.description}</p>
             </div>

             <button
               onClick={handleOrderWhatsApp}
               disabled={product.outOfStock}
               className={`flex items-center justify-center gap-2 w-full py-4 text-white font-bold rounded-full transition-all shadow-lg uppercase tracking-wider ${
                 product.outOfStock 
                  ? 'bg-gray-400 cursor-not-allowed opacity-70' 
                  : 'bg-[#25D366] hover:bg-opacity-90 hover:shadow-xl'
               }`}
             >
               {product.outOfStock ? 'Currently Unavailable' : 'Order Now'}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { useStore } from "../store";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Shop() {
  const { products, fetchProducts } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleViewDetails = (product: any, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-bg py-12 px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-black uppercase tracking-wider">
            Our Products
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Browse our selection of premium hardwood charcoal products. We ensure the
            highest quality standards for all our exports.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={(e) => handleViewDetails(product, e)}
              className="bg-white group flex flex-col cursor-pointer"
            >
              <div className="w-full aspect-[4/3] bg-gray-100 relative overflow-hidden mb-6 shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                ) : null}
                {product.outOfStock && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-widest z-10 shadow-lg">
                    Out of Stock
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-1 px-2">
                <h3 className="text-xl font-bold uppercase mb-1 text-black tracking-wider">
                  {product.name}
                </h3>
                {product.price > 0 && (
                  <div className="text-sm font-bold text-primary mb-3">
                    ${product.price} / Ton
                  </div>
                )}
                <p className="text-sm text-gray-500 italic mb-6 flex-1 line-clamp-3 leading-relaxed">
                  {product.description}
                </p>
                <div className="flex justify-between items-center mt-auto border-t border-gray-200 pt-6">
                  <div className="text-xs font-semibold text-gray-800 uppercase tracking-widest">
                    Min. Order: 1 Ton
                  </div>
                  <button className="text-black border border-black hover:bg-black hover:text-white transition-colors py-3 px-8 rounded-full flex items-center justify-center text-xs font-bold uppercase tracking-widest">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

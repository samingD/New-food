import React, { useState, useEffect } from "react";
import { useStore } from "./store";
import {
  Plus,
  Edit2,
  Trash2,
  LogOut,
  Image as ImageIcon,
  Home as HomeIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Admin() {
  const {
    isAdmin,
    loginAdmin,
    logoutAdmin,
    products,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    galleryImages,
    fetchGalleryImages,
    addGalleryImage,
    deleteGalleryImage,
  } = useStore();

  const [email, setEmail] = useState("admin@imaniglobal.com");
  const [password, setPassword] = useState("sammy1122");
  const [loginError, setLoginError] = useState("");
  const [dbConnected, setDbConnected] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    image: "",
    outOfStock: false,
  });

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
      fetchGalleryImages();
      fetch('/api/health').then(r => r.json()).then(d => {
         setDbConnected(d.db_connected !== false);
      }).catch(() => {});
    }
  }, [isAdmin, fetchProducts, fetchGalleryImages]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        loginAdmin(data.token);
        setLoginError("");
      } else {
        setLoginError(
          data.error ||
            "Invalid credentials. Please check your email and password.",
        );
      }
    } catch (err) {
      setLoginError("Failed to connect to the server.");
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentProduct.id) {
      await updateProduct(currentProduct.id, currentProduct);
    } else {
      await addProduct({
        name: currentProduct.name,
        description: currentProduct.description,
        price: currentProduct.price,
        image: currentProduct.image,
        outOfStock: currentProduct.outOfStock,
      });
    }
    setIsEditing(false);
    setCurrentProduct({
      id: "",
      name: "",
      description: "",
      price: 0,
      image: "",
      outOfStock: false,
    });
  };

  const handleEditClick = (product: any) => {
    setCurrentProduct({
      ...product,
      outOfStock: !!product.outOfStock,
    });
    setIsEditing(true);
  };

  const handleAddNewClick = () => {
    setCurrentProduct({
      id: "",
      name: "",
      description: "",
      price: 0,
      image: "",
      outOfStock: false,
    });
    setIsEditing(true);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center px-4 relative">
        <Link
          to="/"
          className="absolute top-8 left-8 flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors"
        >
          <HomeIcon className="w-4 h-4" /> Back to Website
        </Link>
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100 w-full max-w-md hover:shadow-xl transition-shadow duration-300">
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-black mb-2">
              Admin Login
            </h1>
            <p className="text-text-muted text-sm">
              Secure access to IMANIGLOBAL dashboard
            </p>
          </div>

          {loginError && (
            <div className="bg-red-50 text-red-600 p-3 rounded text-sm mb-6 text-center border border-red-100">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-4 rounded-full font-semibold hover:bg-primary shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              Login to Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-8 flex justify-between items-center sticky top-0 z-40">
        <div className="flex items-center gap-6">
          <h1 className="font-bold text-xl text-black flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Admin Dashboard
          </h1>
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-primary transition-colors"
          >
            <HomeIcon className="w-4 h-4" />{" "}
            <span className="hidden sm:inline">Go to Website</span>
          </Link>
        </div>
        <button
          onClick={logoutAdmin}
          className="flex items-center gap-2 text-sm font-semibold text-text-muted hover:text-black transition-colors"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </header>

      <div className="max-w-7xl mx-auto p-8 space-y-12">

        {/* Gallery Management Section */}
        <div className="flex justify-between items-center mt-16 mb-8">
          <h2 className="font-display text-3xl font-bold text-black border-b border-gray-200 pb-2 w-full flex-1">
            Gallery Management
          </h2>
          <label className="cursor-pointer bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-opacity-90 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ml-4 shrink-0">
            <ImageIcon className="w-4 h-4" /> Upload Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const img = new Image();
                    img.onload = () => {
                      const canvas = document.createElement("canvas");
                      const maxWidth = 1000;
                      let scaleSize = maxWidth / img.width;
                      if (scaleSize > 1) scaleSize = 1;
                      canvas.width = img.width * scaleSize;
                      canvas.height = img.height * scaleSize;
                      const ctx = canvas.getContext("2d");
                      ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
                      const dataUrl = canvas.toDataURL("image/jpeg", 0.7);
                      addGalleryImage(dataUrl);
                    };
                    img.src = reader.result as string;
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {galleryImages?.map((img) => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow aspect-square bg-gray-50">
              <img src={img.image} className="w-full h-full object-cover" alt="Gallery" />
              <div className="absolute top-2 right-2 flex items-center justify-end z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to delete this image?')) {
                      deleteGalleryImage(img.id);
                    }
                  }}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg pointer-events-auto"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {!galleryImages?.length && (
            <div className="col-span-full py-12 text-center text-gray-400 bg-gray-50 border border-dashed border-gray-200 rounded-2xl">
              No images in gallery yet. Upload some pictures to display on the home page.
            </div>
          )}
        </div>

        {/* Product Management Section */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="font-display text-3xl font-bold text-black border-b border-gray-200 pb-2 w-full flex-1">
            Product Management
          </h2>
          {!isEditing && (
            <button
              onClick={handleAddNewClick}
              className="bg-primary text-white px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-opacity-90 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ml-4 shrink-0"
            >
              <Plus className="w-4 h-4" /> Add New Product
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-3xl hover:shadow-lg transition-shadow duration-300">
            <h3 className="font-bold text-xl mb-6 text-black">
              {currentProduct.id ? "Edit Product" : "Add New Product"}
            </h3>
            <form onSubmit={handleSaveProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary"
                    value={currentProduct.name}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-black mb-2">
                    Price (USD)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary"
                    value={currentProduct.price}
                    onChange={(e) =>
                      setCurrentProduct({
                        ...currentProduct,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      className="w-5 h-5 cursor-pointer appearance-none checked:bg-black checked:border-black border-2 border-gray-300 rounded transition-colors"
                      checked={currentProduct.outOfStock}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          outOfStock: e.target.checked,
                        })
                      }
                    />
                    {currentProduct.outOfStock && (
                      <svg className="w-3 h-3 text-white absolute left-1 top-1 pointer-events-none" viewBox="0 0 14 10" fill="none">
                        <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-black">
                    Mark as Out of Stock
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary resize-none"
                  value={currentProduct.description}
                  onChange={(e) =>
                    setCurrentProduct({
                      ...currentProduct,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-semibold text-black mb-2">
                  Product Image
                </label>
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4 items-center">
                    <input
                      type="url"
                      className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-primary"
                      placeholder="https://example.com/image.jpg (or upload below)"
                      value={currentProduct.image}
                      onChange={(e) =>
                        setCurrentProduct({
                          ...currentProduct,
                          image: e.target.value,
                        })
                      }
                    />
                    {currentProduct.image && (
                      <div
                        className="w-12 h-12 rounded bg-cover bg-center border border-gray-200 shrink-0"
                        style={{
                          backgroundImage: `url(${currentProduct.image})`,
                        }}
                      ></div>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-text-muted font-semibold uppercase tracking-wider">
                      OR
                    </span>
                    <label className="cursor-pointer bg-gray-100 text-black px-4 py-2 rounded text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2 border border-gray-200">
                      <ImageIcon className="w-4 h-4" /> Upload from Gallery
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              const img = new Image();
                              img.onload = () => {
                                const canvas = document.createElement("canvas");
                                const maxWidth = 800;
                                let scaleSize = maxWidth / img.width;
                                if (scaleSize > 1) scaleSize = 1; // don't upscale
                                canvas.width = img.width * scaleSize;
                                canvas.height = img.height * scaleSize;
                                const ctx = canvas.getContext("2d");
                                ctx?.drawImage(
                                  img,
                                  0,
                                  0,
                                  canvas.width,
                                  canvas.height,
                                );
                                const dataUrl = canvas.toDataURL(
                                  "image/jpeg",
                                  0.7,
                                );
                                setCurrentProduct({
                                  ...currentProduct,
                                  image: dataUrl,
                                });
                              };
                              img.src = reader.result as string;
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="bg-black text-white px-8 py-3 rounded-full font-semibold hover:bg-primary shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  Save Product
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-100 text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-muted">
                      Product
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-muted">
                      Description
                    </th>
                    <th className="p-4 text-xs font-bold uppercase tracking-wider text-text-muted text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-12 h-12 rounded bg-cover bg-center shrink-0"
                            style={{ backgroundImage: `url(${product.image})` }}
                          ></div>
                          <div>
                            <span className="font-bold text-sm text-black block">
                              {product.name}
                            </span>
                            <span className="text-xs text-primary font-semibold mt-1 block">
                              ${product.price}
                            </span>
                            {product.outOfStock && (
                              <span className="text-xs text-red-500 font-bold tracking-wide uppercase mt-1 block">
                                Out of Stock
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-text-muted max-w-xs truncate">
                        {product.description}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(product)}
                            className="p-2 text-gray-400 hover:text-black transition-colors"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              deleteProduct(product.id);
                            }}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td
                        colSpan={3}
                        className="p-8 text-center text-text-muted"
                      >
                        No products found. Add some!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

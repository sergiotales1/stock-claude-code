"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface Product {
  id: number;
  name: string;
  description: string | null;
  quantity: number;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    quantity: 0,
    imageUrl: "",
  });

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products";
      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchProducts();
        setShowForm(false);
        setEditingProduct(null);
        setFormData({ name: "", description: "", quantity: 0, imageUrl: "" });
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || "",
      quantity: product.quantity,
      imageUrl: product.imageUrl || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchProducts();
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const cancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
    setFormData({ name: "", description: "", quantity: 0, imageUrl: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Stock Dashboard
            </h1>
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              ← Back to Home
            </Link>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Add New Product
          </button>
        </div>

        {/* Product Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Quantity *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    {editingProduct ? "Update Product" : "Add Product"}
                  </button>
                  <button
                    type="button"
                    onClick={cancelForm}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 font-semibold py-2 px-4 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="text-gray-500 dark:text-gray-400">Loading products...</div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 mb-4">
              No products found. Add your first product to get started!
            </div>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              Add First Product
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                {product.imageUrl ? (
                  <div className="h-32 mb-4 rounded-lg overflow-hidden relative">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="bg-gray-200 dark:bg-gray-600 h-32 rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-gray-500 dark:text-gray-400">No Image</span>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                )}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-blue-600 dark:text-blue-400 font-medium">
                    Qty: {product.quantity}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ID: {product.id}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
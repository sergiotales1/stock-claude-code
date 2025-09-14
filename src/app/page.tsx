import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Stock Management System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Efficiently manage your inventory with our simple and powerful stock management solution
          </p>
          <Link
            href="/dashboard"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>

      {/* Advantages Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Choose Our System?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📦</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Easy Inventory Tracking
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Keep track of all your products with detailed information and quantities
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Real-time Updates
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get instant updates when stock levels change or new products are added
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 dark:bg-purple-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Simple Dashboard
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Manage everything from one clean, intuitive dashboard interface
              </p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 dark:bg-orange-900 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Secure Storage
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your data is safely stored with reliable SQLite database backend
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Products Carousel */}
      <section className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Sample Stock Items
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
              <div className="bg-gray-200 dark:bg-gray-600 h-32 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Laptop Computer
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                High-performance laptop for business use
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                Quantity: 15 units
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
              <div className="bg-gray-200 dark:bg-gray-600 h-32 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Smartphone
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                Latest model smartphone with advanced features
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                Quantity: 32 units
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6">
              <div className="bg-gray-200 dark:bg-gray-600 h-32 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-4xl">🖥️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Desktop Monitor
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                27-inch 4K monitor for professional work
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                Quantity: 8 units
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

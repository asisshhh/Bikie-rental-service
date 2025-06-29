const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-teal-100 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          Welcome to <span className="text-blue-600">Bikie</span>
        </h1>
        <p className="text-xl text-gray-700 mb-8">
          Rent bikes & cars at affordable prices — fast, reliable, and easy.
        </p>
        <a
          href="/vehicles"
          className="bg-blue-600 text-white text-lg px-6 py-3 rounded-2xl shadow-md hover:bg-blue-700 transition"
        >
          Explore Vehicles
        </a>

        <div className="mt-10 text-gray-600 text-sm">
          <p>
            Bikes starting from ₹50/hr · Cars from ₹1500/day · 100% Verified Vehicles
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;

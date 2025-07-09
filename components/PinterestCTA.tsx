export default function PinterestCTA() {
  return (
    <section className="py-16 bg-gradient-to-br from-red-50 to-pink-50">
      <div className="container-custom text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-6xl mb-6">📌</div>
          <h2 className="text-4xl font-bold mb-4">Save Your Favorite Finds</h2>
          <p className="text-xl text-gray-600 mb-8">
            Pin TV deals and room designs to your Pinterest boards. Never lose a great find again!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">📺</div>
              <h3 className="font-bold mb-2">TV Deals Board</h3>
              <p className="text-sm text-gray-600">Save the best TV deals for easy comparison</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">🏠</div>
              <h3 className="font-bold mb-2">Room Ideas</h3>
              <p className="text-sm text-gray-600">Collect room designs that inspire you</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-3xl mb-3">💡</div>
              <h3 className="font-bold mb-2">Buying Guides</h3>
              <p className="text-sm text-gray-600">Keep helpful guides for future reference</p>
            </div>
          </div>
          
          <button className="btn-primary bg-red-600 hover:bg-red-700">
            Follow Us on Pinterest →
          </button>
          
          <p className="mt-6 text-sm text-gray-500">
            Pro tip: Hover over any deal or room design to see the Pin button!
          </p>
        </div>
      </div>
    </section>
  );
}
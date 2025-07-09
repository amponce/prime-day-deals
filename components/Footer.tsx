export default function Footer() {
  return (
    <footer className="bg-dark text-white py-12 mt-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DealRoom</h3>
            <p className="text-gray-400">
              Your source for the best TV deals and room design inspiration.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/deals" className="hover:text-white transition-colors">TV Deals</a></li>
              <li><a href="/rooms" className="hover:text-white transition-colors">Room Designs</a></li>
              <li><a href="/guide" className="hover:text-white transition-colors">Buying Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/deals?tech=oled" className="hover:text-white transition-colors">OLED TVs</a></li>
              <li><a href="/deals?tech=qled" className="hover:text-white transition-colors">QLED TVs</a></li>
              <li><a href="/deals?tech=mini-led" className="hover:text-white transition-colors">Mini-LED TVs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-2xl">📌</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-2xl">📷</span>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-2xl">🐦</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p className="mb-2">
            <strong>Affiliate Disclosure:</strong> We earn commissions from qualifying purchases at no extra cost to you.
          </p>
          <p>&copy; 2025 DealRoom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
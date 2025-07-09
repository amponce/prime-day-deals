export default function Footer() {
  return (
    <footer className="bg-secondary text-white py-12 mt-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">PrimeDealHub</h3>
            <p className="text-gray-300">
              We're a team of tech enthusiasts dedicated to finding and verifying the best TV deals. As authorized Amazon affiliates, we earn from qualifying purchases at no extra cost to you.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/guide" className="text-gray-300 hover:text-white transition-colors">TV Buying Guide</a></li>
              <li><a href="/pinterest" className="text-gray-300 hover:text-white transition-colors">Pinterest Gallery</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Deal Alert Settings</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Price History Tool</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Affiliate Disclosure</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Twitter/X</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Facebook</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">YouTube Reviews</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">RSS Feed</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-600 text-center text-gray-300 text-sm">
          <p>&copy; 2025 PrimeDealHub. All rights reserved. • Amazon and Prime Day are trademarks of Amazon.com, Inc.</p>
        </div>
      </div>
    </footer>
  );
}
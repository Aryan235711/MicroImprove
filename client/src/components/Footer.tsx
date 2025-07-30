import { motion } from "framer-motion";
import { Heart, ExternalLink, Mail, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  const quickLinks = [
    { label: "About the Platform", href: "#" },
    { label: "Scientific Background", href: "#" },
    { label: "Success Stories", href: "#" },
    { label: "FAQ", href: "#" }
  ];

  const supportLinks = [
    { label: "Full Toolkit ($9)", href: "#", icon: <Star className="h-4 w-4" /> },
    { label: "Support This Project", href: "#", icon: <Heart className="h-4 w-4" /> },
    { label: "Contact Us", href: "#", icon: <Mail className="h-4 w-4" /> },
    { label: "ODR Website", href: "#", icon: <ExternalLink className="h-4 w-4" /> }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-2xl font-bold mb-4">The 9 Experiments</h3>
            <p className="text-gray-300 leading-relaxed">
              Transform your brain-body awareness through simple, scientifically-inspired micro-experiments. 
              Start your journey of self-discovery today.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-4">Support & Resources</h4>
            <ul className="space-y-2">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors flex items-center"
                  >
                    {link.icon && <span className="mr-2">{link.icon}</span>}
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div 
          className="border-t border-gray-700 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-center md:text-left mb-4 md:mb-0">
              &copy; 2024 The 9 Experiments. Designed for transformation, one micro-step at a time.
            </p>
            
            <div className="flex space-x-4">
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Heart className="mr-2 h-4 w-4" />
                Donate
              </Button>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <Star className="mr-2 h-4 w-4" />
                Rate Us
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

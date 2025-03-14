// src/components/Footer.tsx
import React from "react";
import { Zap, Github, Package, Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Zap className="h-6 w-6 text-indigo-400 mr-2" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Zaplog
            </span>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <a
              href="https://github.com/MAliHassanDev/zaplog"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-slate-400 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5 mr-2" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.npmjs.com/package/zaplog"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-slate-400 hover:text-white transition-colors"
            >
              <Package className="h-5 w-5 mr-2" />
              <span>npm</span>
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Zaplog. Released under the MIT License.
          </p>

          <div className="flex items-center text-slate-500 text-sm">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500" />
            <span>for better logging</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

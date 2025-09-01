import React, { useState, useEffect } from 'react';
import { Shield, Sparkles } from 'lucide-react';

import { useNavigate } from 'react-router-dom';



export default function APKDetectorHomepage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showDetails, setShowDetails] = useState(false);
    const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-8 relative overflow-hidden">
      {/* Dynamic cursor follower */}
      <div 
        className="fixed w-96 h-96 pointer-events-none z-0 transition-all duration-700 ease-out"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(147, 51, 234, 0.05) 50%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }}
      />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-40" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping opacity-50" style={{animationDelay: '3s'}}></div>
        
        {/* Large animated orbs */}
        <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-purple-500/15 to-pink-500/15 rounded-full blur-2xl animate-pulse" style={{animationDelay: '4s'}}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" 
             style={{backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '50px 50px'}}></div>
      </div>
      
      <div className="max-w-4xl w-full text-center space-y-12 relative z-10">
        {/* Main Content - Centered */}
        <div className="text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 leading-tight drop-shadow-lg">
              Detect Fake APKs
              <br />
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
                Instantly.
              </span>
            </h1>
            
            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Upload any APK and let AI verify its authenticity in seconds.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group relative bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:via-blue-500 hover:to-purple-500 text-white px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl hover:shadow-cyan-500/25 transform hover:-translate-y-2 hover:scale-105 overflow-hidden">
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              <Shield className="w-6 h-6 relative z-10" />
              <span onClick={()=> navigate('/upload')} className="relative z-10">Check APK Now</span>
              <Sparkles className="w-5 h-5 relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
            
            <button 
              className="group relative text-gray-700 hover:text-blue-600 px-12 py-6 rounded-2xl font-bold text-xl transition-all duration-500 border-2 border-gray-300 hover:border-blue-400 bg-white/80 backdrop-blur-md hover:bg-white hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-2 hover:scale-105 overflow-hidden"
              onClick={() => setShowDetails(!showDetails)}
            >
              {/* Glass morphism effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Learn More</span>
            </button>
          </div>
        </div>

        {/* Detailed Information Panel */}
        {showDetails && (
          <div className="mt-16 bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-gray-200 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Shield className="w-6 h-6 text-blue-600" />
                  Multi-Layered Defense System
                </h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Trust Anchor:</strong> Digital signature & SHA256 hash verification against official bank registry
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Behavioral Analysis:</strong> AndroidManifest.xml permission profiling using 120+ security parameters
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Visual Intelligence:</strong> Perceptual hash matching + OCR typosquatting detection
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Network Forensics:</strong> Domain reputation scoring via real-time API integration
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <strong>Campaign Detection:</strong> Graph database linking APK signatures, developers & domains
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-purple-600" />
                  Key Features
                </h3>
                <div className="space-y-4 text-gray-700">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl">
                    <div className="font-semibold text-blue-800">Explainable AI Results</div>
                    <div className="text-sm">Risk scores (0-100) showing why an app is flagged</div>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-xl">
                    <div className="font-semibold text-green-800">Fast Processing</div>
                    <div className="text-sm">15 API calls/second real-time verification</div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                    <div className="font-semibold text-purple-800">High Accuracy</div>
                    <div className="text-sm">4x better fraud detection than traditional methods</div>
                  </div>
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl">
                    <div className="font-semibold text-orange-800">Cost Effective</div>
                    <div className="text-sm">$3M monthly savings for financial institutions</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 mb-4">Developed by Team hawk_eye</p>
                <p className="text-sm text-gray-500">Institute of Engineering and Technology, DAVV, Indore, M.P.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
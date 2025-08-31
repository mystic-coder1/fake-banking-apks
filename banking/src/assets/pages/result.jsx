import { useState } from 'react';

export default function APKAnalysisResult() {
  const [currentResult, setCurrentResult] = useState('fraud');

  const fraudData = {
    fileName: 'banking_app_v2.3.apk',
    fileDetails: 'Size: 15.2 MB • Scanned: Just now',
    checks: [
      { status: 'false', text: 'Malicious signature patterns detected in application code' },
      { status: 'true', text: 'Digital certificate validation passed successfully' },
      { status: 'false', text: 'Suspicious permission requests found (SMS, Call logs)' },
      { status: 'true', text: 'Application source verified from official app store' },
      { status: 'false', text: 'Network traffic analysis reveals data harvesting behavior' }
    ],
    result: {
      type: 'fraud',
      icon: '⚠️',
      title: 'FRAUDULENT APK DETECTED',
      description: 'This application is identified as a fraudulent banking app designed to steal user credentials and financial information. Do not install or use this application.'
    }
  };

  const authenticData = {
    fileName: 'hdfc_mobile_banking_official.apk',
    fileDetails: 'Size: 28.7 MB • Scanned: Just now',
    checks: [
      { status: 'true', text: 'No malicious signatures found in application code' },
      { status: 'false', text: 'Certificate authority validation requires manual review' },
      { status: 'true', text: 'Standard banking permissions detected (required for functionality)' },
      { status: 'false', text: 'Minor security flags detected in background processes' },
      { status: 'true', text: 'Secure encrypted communication protocols implemented' }
    ],
    result: {
      type: 'authentic',
      icon: '✅',
      title: 'AUTHENTIC BANK APK',
      description: 'This is a legitimate banking application from HDFC Bank with valid digital signatures and standard security implementations. Safe to install and use.'
    }
  };

  const currentData = currentResult === 'fraud' ? fraudData : authenticData;

  const toggleResult = () => {
    setCurrentResult(currentResult === 'fraud' ? 'authentic' : 'fraud');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-5">
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 max-w-2xl w-full text-center">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-3">
          <div className="w-9 h-9 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white text-lg">
            🛡️
          </div>
          <h1 className="text-3xl font-bold text-gray-700">SecureCheck Pro</h1>
        </div>

        {/* File Info */}
        <div className="bg-gray-100 p-5 rounded-xl mb-6">
          <div className="font-bold text-gray-800 text-lg mb-1">
            {currentData.fileName}
          </div>
          <div className="text-gray-600 text-sm">
            {currentData.fileDetails}
          </div>
        </div>

        {/* Analysis Summary */}
        <div className="bg-gray-50 p-6 rounded-2xl mb-8 text-left">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Security Analysis Report
          </h2>
          
          <div className="space-y-3">
            {currentData.checks.map((check, index) => (
              <div key={index} className="flex items-center gap-3 py-2 border-b border-gray-200 last:border-b-0">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                  check.status === 'true' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {check.status === 'true' ? '✓' : '✗'}
                </div>
                <div className="text-gray-700">
                  {check.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Final Result */}
        <div className={`p-8 rounded-2xl mb-6 animate-pulse ${
          currentData.result.type === 'fraud' 
            ? 'bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-400 text-red-700'
            : 'bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-400 text-green-700'
        }`}>
          <div className="text-5xl mb-4">{currentData.result.icon}</div>
          <div className="text-2xl font-bold mb-3">{currentData.result.title}</div>
          <div className="text-base leading-relaxed opacity-90">
            {currentData.result.description}
          </div>
        </div>

        {/* Toggle Button */}
        <button 
          onClick={toggleResult}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200"
        >
          Analyze Different Sample
        </button>
      </div>
    </div>
  );
}
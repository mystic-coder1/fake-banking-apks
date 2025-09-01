import React, { useState, useRef } from 'react';
import { Upload, Shield, AlertTriangle, CheckCircle, FileText, Scan, X, Download, ArrowLeft } from 'lucide-react';

export default function APKUploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileUpload = (file) => {
    if (file && file.name.endsWith('.apk')) {
      setUploadedFile(file);
      setAnalysisResult(null);
      setShowResults(false);
    } else {
      alert('Please upload a valid APK file');
    }
  };

  const handleFileInputChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  const startAnalysis = async () => {
    if (!uploadedFile) return;
    
    setIsAnalyzing(true);
    setShowResults(false);
    
    // Simulate analysis with random results for demo
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const isFake = Math.random() > 0.6;
    const riskScore = isFake ? Math.floor(Math.random() * 40) + 60 : Math.floor(Math.random() * 30) + 10;
    
    const result = {
      isFake,
      riskScore,
      fileName: uploadedFile.name,
      fileSize: `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB`,
      detectedIssues: isFake ? [
        'Suspicious permission requests',
        'Code obfuscation detected',
        'Network connections to unknown servers',
        'Missing official signatures'
      ] : [
        'Standard banking permissions',
        'Valid digital signatures',
        'Secure network protocols'
      ],
      recommendations: isFake ? [
        'Do not install this application',
        'Report to your bank\'s security team',
        'Scan your device for malware'
      ] : [
        'Application appears legitimate',
        'Verify download source',
        'Keep app updated'
      ]
    };
    
    setAnalysisResult(result);
    setIsAnalyzing(false);
    setShowResults(true);
  };

  const resetUpload = () => {
    setUploadedFile(null);
    setAnalysisResult(null);
    setShowResults(false);
    setIsAnalyzing(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes) => {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <button className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition-colors mx-auto">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </button>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Detect Fake APKs
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent block">
              Instantly.
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Upload any APK and let AI verify its authenticity in seconds.
          </p>
          <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
            <span className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
              Real-time Analysis
            </span>
            <span className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
              AI-Powered Detection
            </span>
            <span className="flex items-center">
              <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
              99.2% Accuracy
            </span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          {!showResults ? (
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/50">
              {/* Upload Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                  Upload APK File for Analysis
                </h2>
                
                <div
                  className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
                    dragActive
                      ? 'border-blue-500 bg-blue-50'
                      : uploadedFile
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".apk"
                    onChange={handleFileInputChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  
                  {uploadedFile ? (
                    <div className="space-y-4">
                      <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                      <div>
                        <p className="text-xl font-semibold text-gray-800">{uploadedFile.name}</p>
                        <p className="text-gray-600">{formatFileSize(uploadedFile.size)}</p>
                      </div>
                      <button
                        onClick={resetUpload}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        <X className="h-5 w-5 mx-auto" />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className={`h-16 w-16 mx-auto ${dragActive ? 'text-blue-500' : 'text-gray-400'}`} />
                      <div>
                        <p className="text-xl font-semibold text-gray-800 mb-2">
                          {dragActive ? 'Drop your APK file here' : 'Upload APK File'}
                        </p>
                        <p className="text-gray-600">
                          Drag and drop your APK file here, or click to browse
                        </p>
                        <p className="text-sm text-gray-500 mt-2">
                          Supports: .apk files (Max 100MB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Analysis Button */}
              {uploadedFile && (
                <div className="text-center">
                  <button
                    onClick={startAnalysis}
                    disabled={isAnalyzing}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-8 rounded-2xl transition-all duration-300 flex items-center mx-auto space-x-2 shadow-lg transform hover:scale-105 disabled:scale-100"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Scan className="h-5 w-5" />
                        <span>Check APK Now</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Loading Animation */}
              {isAnalyzing && (
                <div className="mt-8 bg-gray-50 rounded-2xl p-6 border">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="animate-pulse h-2 bg-cyan-400 rounded w-1/4"></div>
                      <span className="text-gray-700 text-sm">Extracting APK contents...</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="animate-pulse h-2 bg-blue-400 rounded w-1/2"></div>
                      <span className="text-gray-700 text-sm">Analyzing permissions and signatures...</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="animate-pulse h-2 bg-purple-400 rounded w-1/3"></div>
                      <span className="text-gray-700 text-sm">Running ML-based threat detection...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Info */}
              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="bg-white/60 rounded-2xl p-6 border border-white/30 shadow-sm">
                  <Shield className="h-8 w-8 text-cyan-500 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Secure Analysis</h3>
                  <p className="text-gray-600 text-sm">
                    Your files are analyzed in a secure sandbox environment and automatically deleted after processing.
                  </p>
                </div>
                <div className="bg-white/60 rounded-2xl p-6 border border-white/30 shadow-sm">
                  <Scan className="h-8 w-8 text-purple-500 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">AI Detection</h3>
                  <p className="text-gray-600 text-sm">
                    Advanced machine learning models trained on thousands of banking malware samples.
                  </p>
                </div>
                <div className="bg-white/60 rounded-2xl p-6 border border-white/30 shadow-sm">
                  <FileText className="h-8 w-8 text-green-500 mb-3" />
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Detailed Reports</h3>
                  <p className="text-gray-600 text-sm">
                    Comprehensive analysis with actionable security recommendations and threat indicators.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Results Section */
            <div className="space-y-6">
              {/* Results Header */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
                    <FileText className="h-6 w-6 mr-2 text-cyan-500" />
                    Analysis Results
                  </h2>
                  <button
                    onClick={resetUpload}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                  <div>
                    <span className="text-gray-500">File Name:</span> <span className="font-medium">{analysisResult?.fileName}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">File Size:</span> <span className="font-medium">{analysisResult?.fileSize}</span>
                  </div>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className={`bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border ${
                analysisResult?.isFake 
                  ? 'border-red-200 bg-red-50/50' 
                  : 'border-green-200 bg-green-50/50'
              }`}>
                <div className="flex items-center mb-6">
                  {analysisResult?.isFake ? (
                    <div className="bg-red-100 p-3 rounded-full mr-4">
                      <AlertTriangle className="h-8 w-8 text-red-600" />
                    </div>
                  ) : (
                    <div className="bg-green-100 p-3 rounded-full mr-4">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                  )}
                  <div>
                    <h3 className="text-3xl font-bold text-gray-800">
                      {analysisResult?.isFake ? 'THREAT DETECTED' : 'SAFE APPLICATION'}
                    </h3>
                    <p className={`text-lg font-medium ${analysisResult?.isFake ? 'text-red-600' : 'text-green-600'}`}>
                      Risk Score: {analysisResult?.riskScore}/100
                    </p>
                  </div>
                </div>
                
                {/* Risk Score Bar */}
                <div className="mb-6">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all duration-1000 ${
                        analysisResult?.riskScore > 60 
                          ? 'bg-gradient-to-r from-red-400 to-red-600' 
                          : analysisResult?.riskScore > 30
                          ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                          : 'bg-gradient-to-r from-green-400 to-green-600'
                      }`}
                      style={{ width: `${analysisResult?.riskScore}%` }}
                    ></div>
                  </div>
                </div>

                <p className="text-gray-700 text-lg">
                  {analysisResult?.isFake 
                    ? 'This application exhibits characteristics commonly found in fake banking apps. Do not install.'
                    : 'This application appears to be legitimate and follows standard banking app security practices.'
                  }
                </p>
              </div>

              {/* Detailed Analysis */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Detected Issues */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <div className={`p-2 rounded-full mr-3 ${analysisResult?.isFake ? 'bg-red-100' : 'bg-green-100'}`}>
                      <AlertTriangle className={`h-5 w-5 ${analysisResult?.isFake ? 'text-red-600' : 'text-green-600'}`} />
                    </div>
                    {analysisResult?.isFake ? 'Security Issues' : 'Security Features'}
                  </h3>
                  <ul className="space-y-3">
                    {analysisResult?.detectedIssues.map((issue, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className={`h-2 w-2 rounded-full mt-2 flex-shrink-0 ${
                          analysisResult?.isFake ? 'bg-red-500' : 'bg-green-500'
                        }`}></div>
                        <span className="text-gray-700">{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Recommendations */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Shield className="h-5 w-5 text-blue-600" />
                    </div>
                    Recommendations
                  </h3>
                  <ul className="space-y-3">
                    {analysisResult?.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg transform hover:scale-105">
                    <Download className="h-5 w-5" />
                    <span>Download Report</span>
                  </button>
                  <button 
                    onClick={resetUpload}
                    className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold py-3 px-6 rounded-2xl transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg transform hover:scale-105"
                  >
                    <Upload className="h-5 w-5" />
                    <span>Analyze Another File</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-gray-500 text-sm">
          <p>Powered by advanced machine learning • Protecting users from financial fraud</p>
        </div>
      </div>
    </div>
  );
}
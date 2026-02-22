import React, { useState } from 'react';

function App() {
  // Initialize state with 28 empty values
  const [features, setFeatures] = useState(Array(28).fill(""));
  const [result, setResult] = useState(null);

  const handleChange = (index, value) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ features: features.map(Number) }),
    });
    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">Person Classifier</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {features.map((val, i) => (
              <div key={i}>
                <label className="block text-xs font-medium text-gray-500 uppercase">Feature {i + 1}</label>
                <input
                  type="number"
                  required
                  className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  value={val}
                  onChange={(e) => handleChange(i, e.target.value)}
                />
              </div>
            ))}
          </div>
          
          <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Analyze Data
          </button>
        </form>

        {result && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <h2 className="text-lg text-green-800 font-bold">Prediction: {result.class_name}</h2>
            <p className="text-green-600 text-sm">Confidence: {(result.confidence * 100).toFixed(2)}%</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import axios from 'axios';

export default function ShortenForm() {
  const [url, setUrl] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [validity, setValidity] = useState(30);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCopy = () => {
    if (result && result.shortLink) {
        navigator.clipboard.writeText(result.shortLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/shorturls`, {
        url,
        shortcode: shortcode || undefined,
        validity,
      });
      setResult(res.data);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'An unexpected error occurred.';
      setError(errorMessage);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          URL Shortener
        </h1>
        <p className="mt-2 text-gray-600">
          Create short and manageable links.
        </p>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">Your Long URL</label>
            <input
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/very-long-url"
              required
              type="url"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="validity" className="block text-sm font-medium text-gray-700 mb-1">Validity (in minutes)</label>
            <input
              id="validity"
              type="number"
              value={validity}
              onChange={(e) => setValidity(e.target.value)}
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
          >
            {loading ? 'Processing...' : 'Shorten'}
          </button>
        </form>
      </div>
      
      {error && (
        <div className="mt-4 bg-red-100 text-red-800 p-4 rounded-md border border-red-200">
            <p>{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Success! Here is your link:</h3>
          <div className="flex items-center justify-between bg-gray-100 p-3 rounded-md border">
            <a href={result.shortLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium truncate hover:underline">
              {result.shortLink}
            </a>
            <button
              onClick={handleCopy}
              className={`px-3 py-1 text-sm font-medium rounded-md ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
              }`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Expires on: {new Date(result.expiry).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
}


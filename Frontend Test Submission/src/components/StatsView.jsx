import React, { useState } from 'react';
import axios from 'axios';

export default function StatsView() {
  const [code, setCode] = useState('');
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    if (!code) {
        setError("Please enter a shortcode to view its stats.");
        return;
    }
    setLoading(true);
    setError('');
    setStats(null);
    try {
      const res = await axios.get(`/shorturls/${code}`);
      setStats(res.data);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Could not find a URL with that shortcode.';
      setError(errorMessage);
      setStats(null);
    } finally {
        setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
        fetchStats();
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Link Statistics</h1>
        <p className="mt-2 text-gray-600">
          Enter a shortcode to see how it's performing.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
            <input
              value={code}
              onChange={e => setCode(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter shortcode"
              className="w-full flex-grow px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={fetchStats}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
            >
              {loading ? 'Searching...' : 'Get Stats'}
            </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md border border-red-200">
            <p>{error}</p>
        </div>
      )}

      {stats && (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-500">Original URL</h3>
            <a href={stats.originalUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">{stats.originalUrl}</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t pt-4">
              <div>
                  <h4 className="text-sm font-semibold text-gray-500">Total Clicks</h4>
                  <p className="text-2xl font-bold text-gray-800">{stats.totalClicks}</p>
              </div>
              <div>
                  <h4 className="text-sm font-semibold text-gray-500">Created At</h4>
                  <p className="text-gray-800">{new Date(stats.createdAt).toLocaleString()}</p>
              </div>
               <div>
                  <h4 className="text-sm font-semibold text-gray-500">Expires At</h4>
                  <p className="text-gray-800">{new Date(stats.expiry).toLocaleString()}</p>
              </div>
          </div>
          
          <div className="border-t pt-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Click History</h3>
            {stats.clickDetails.length > 0 ? (
                <ul className="space-y-3">
                  {stats.clickDetails.map((click, i) => (
                    <li key={i} className="p-3 bg-gray-50 border rounded-md text-sm text-gray-700">
                      <span>{new Date(click.timestamp).toLocaleString()}</span>
                      <span className="mx-2 text-gray-400">|</span>
                      <span>{click.browser || 'Unknown'}</span>
                      <span className="mx-2 text-gray-400">|</span>
                      <span>{click.location || 'Unknown'}</span>
                    </li>
                  ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-center py-2">This link hasn't been clicked yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}


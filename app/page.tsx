'use client';
import { useState, useEffect } from 'react';
import { Tree } from '@/types/tree';
import { useTheme } from 'next-themes';

export default function Home() {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    type: '',
    isFruitful: false,
  });

  useEffect(() => {
    setMounted(true);
    fetchTrees();
  }, []);

  const fetchTrees = async () => {
    const response = await fetch('/api/trees');
    const data = await response.json();
    setTrees(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/trees', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      setFormData({ name: '', age: '', type: '', isFruitful: false });
      fetchTrees();
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Tree Management System
          </h1>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </div>
        
        {/* Add Tree Form */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8 transition-colors duration-200">
          <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
            Add New Tree
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                  Age
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-200">
                Type
              </label>
              <input
                type="text"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full border rounded-lg px-4 py-2.5 bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-200"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.isFruitful}
                onChange={(e) => setFormData({ ...formData, isFruitful: e.target.checked })}
                className="w-4 h-4 text-blue-500 dark:text-blue-400 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 dark:focus:ring-blue-400"
              />
              <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
                Is Fruitful
              </label>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              Add Tree
            </button>
          </form>
        </div>

        {/* Trees List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-colors duration-200">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Trees List
            </h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {trees.length === 0 ? (
              <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                No trees added yet. Add your first tree above!
              </div>
            ) : (
              trees.map((tree) => (
                <div 
                  key={tree.id} 
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {tree.name}
                  </h3>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-300">
                    <p className="flex items-center">
                      <span className="mr-2">🌳</span>
                      Age: {tree.age} years
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">🌲</span>
                      Type: {tree.type}
                    </p>
                    <p className="flex items-center">
                      <span className="mr-2">{tree.isFruitful ? '🍎' : '🌱'}</span>
                      Fruitful: {tree.isFruitful ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { FolderCode, Download, Check, Copy, FileCode, Sparkles, Code2 } from 'lucide-react';
import { CodeViewer } from './CodeViewer';

export const CodeFilesHub: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>('PlaylistCard.jsx');

  const files = [
    {
      name: 'PlaylistCard.jsx',
      task: 'Task 1: GitHub Copilot',
      description: 'React playlist card showing name, creator & song count',
      jsxCode: `// PlaylistCard.jsx - Exercise 1 Solution
import React from 'react';

export function PlaylistCard({ name, creator, songCount, coverUrl, onPlay }) {
  return (
    <div className="playlist-card border rounded-2xl p-4 bg-slate-900 text-slate-100 max-w-sm">
      <img src={coverUrl || 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b'} alt={name} className="w-full aspect-square rounded-xl object-cover mb-3" />
      <h3 className="font-bold text-lg">{name}</h3>
      <p className="text-sm text-slate-400">Created by {creator}</p>
      <div className="mt-3 pt-2 border-t border-slate-800 text-xs text-cyan-400 font-semibold">
        {songCount} Songs
      </div>
    </div>
  );
}

export default PlaylistCard;`,
      jsCode: `// PlaylistCard.js - JavaScript ES6 + PropTypes Solution
import React from 'react';
import PropTypes from 'prop-types';

export function PlaylistCard({ name, creator, songCount, coverUrl }) {
  return (
    <div className="playlist-card">
      <img src={coverUrl} alt={name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
      <h3>{name}</h3>
      <p>By {creator}</p>
      <span>{songCount} Tracks</span>
    </div>
  );
}

PlaylistCard.propTypes = {
  name: PropTypes.string.isRequired,
  creator: PropTypes.string.isRequired,
  songCount: PropTypes.number.isRequired,
  coverUrl: PropTypes.string
};

export default PlaylistCard;`
    },
    {
      name: 'FlipkartProductCard.jsx',
      task: 'Task 2: Flipkart & ChatGPT',
      description: 'Flipkart-style product card with rating, price & discount',
      jsxCode: `// FlipkartProductCard.jsx - Exercise 2 Solution
import React from 'react';

export function FlipkartProductCard({ title, price, originalPrice, discountPercent, rating, reviewCount, imageUrl, deliveryTime }) {
  return (
    <div className="flex gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 max-w-xl">
      <img src={imageUrl} alt={title} className="w-36 h-36 object-contain rounded-lg bg-slate-950 p-2" />
      <div className="flex-1">
        <h3 className="font-semibold text-base line-clamp-2">{title}</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded font-bold">{rating} ★</span>
          <span className="text-xs text-slate-400">({reviewCount?.toLocaleString()} ratings)</span>
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xl font-bold">₹{price?.toLocaleString('en-IN')}</span>
          {originalPrice && <span className="text-xs text-slate-500 line-through">₹{originalPrice}</span>}
          <span className="text-xs text-emerald-400 font-bold">{discountPercent}% OFF</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">{deliveryTime}</p>
      </div>
    </div>
  );
}

export default FlipkartProductCard;`,
      jsCode: `// FlipkartProductCard.js - Exercise 2 ES6 JavaScript Solution
import React from 'react';
import PropTypes from 'prop-types';

export function FlipkartProductCard({ title, price, rating, imageUrl }) {
  return (
    <div className="flipkart-product">
      <img src={imageUrl} alt={title} style={{ width: 120, height: 120 }} />
      <h4>{title}</h4>
      <p>Rating: {rating} / 5</p>
      <strong>₹{price}</strong>
    </div>
  );
}

FlipkartProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number,
  imageUrl: PropTypes.string.isRequired
};

export default FlipkartProductCard;`
    },
    {
      name: 'useRestaurants.js',
      task: 'Task 3: Zomato Custom Hook',
      description: 'Custom React hook for fetching & searching Zomato restaurants',
      jsxCode: `// useRestaurants.js - Exercise 3 Custom Hook Solution
import { useState, useEffect, useCallback } from 'react';

export function useRestaurants(initialCity = 'New Delhi') {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    try {
      const res = await fetch(\`/api/restaurants?city=\${encodeURIComponent(initialCity)}\`, {
        signal: controller.signal
      });
      if (!res.ok) throw new Error('Failed to load restaurants');
      const data = await res.json();
      setRestaurants(data.restaurants || []);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Error loading restaurant data');
      }
    } finally {
      setLoading(false);
    }
  }, [initialCity]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const filtered = restaurants.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.cuisine.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return { restaurants: filtered, loading, error, searchQuery, setSearchQuery, refetch: fetchRestaurants };
}

export default useRestaurants;`,
      jsCode: `// useRestaurants.js - Exercise 3 ES6 JS Version
import { useState, useEffect } from 'react';

export function useRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch('/api/restaurants')
      .then(res => res.json())
      .then(data => {
        if (isMounted) {
          setRestaurants(data);
          setLoading(false);
        }
      });
    return () => { isMounted = false; };
  }, []);

  return { restaurants, loading };
}

export default useRestaurants;`
    },
    {
      name: 'ZomatoListing.jsx',
      task: 'Task 3: Zomato UI View',
      description: 'React UI component consuming useRestaurants custom hook',
      jsxCode: `// ZomatoListing.jsx - Exercise 3 UI View Component Solution
import React from 'react';
import { useRestaurants } from './useRestaurants';

export function ZomatoListing() {
  const { restaurants, loading, error, searchQuery, setSearchQuery } = useRestaurants('Delhi NCR');

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search cuisine or restaurant..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-slate-100"
      />

      {loading && <p className="text-slate-400">Loading restaurants...</p>}
      {error && <p className="text-rose-400">{error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {restaurants.map(res => (
          <div key={res.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4">
            <img src={res.imageUrl} alt={res.name} className="w-full aspect-video rounded-xl object-cover mb-2" />
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-100">{res.name}</h3>
              <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded">{res.rating} ★</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">{res.cuisine?.join(', ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ZomatoListing;`,
      jsCode: `// ZomatoListing.js - Exercise 3 JS UI View Component
import React from 'react';
import { useRestaurants } from './useRestaurants';

export function ZomatoListing() {
  const { restaurants, loading } = useRestaurants();
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {restaurants.map(r => <div key={r.id}>{r.name}</div>)}
    </div>
  );
}`
    },
    {
      name: 'useVideos.js',
      task: 'Task 4: Copilot YouTube Hook',
      description: 'Custom React hook for YouTube video fetching & search filtering',
      jsxCode: `// useVideos.js - Exercise 4 Copilot Refactored Hook
import { useState, useEffect, useCallback } from 'react';

export function useVideos(defaultTerm = '') {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(defaultTerm);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    try {
      const res = await fetch('/api/youtube/videos', { signal: controller.signal });
      if (!res.ok) throw new Error('API fetch failed');
      const data = await res.json();
      setVideos(data.videos || []);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Error loading videos');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const filtered = videos.filter(v =>
    v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.channelName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return { videos: filtered, loading, error, searchTerm, setSearchTerm, refetch: fetchVideos };
}

export default useVideos;`,
      jsCode: `// useVideos.js - Exercise 4 ES6 Hook Solution
import { useState, useEffect } from 'react';

export function useVideos() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch('/api/videos').then(r => r.json()).then(setVideos);
  }, []);
  return { videos };
}`
    },
    {
      name: 'YouTubeVideoList.jsx',
      task: 'Task 4: YouTube UI View',
      description: 'React YouTube video feed component consuming useVideos hook',
      jsxCode: `// YouTubeVideoList.jsx - Exercise 4 Component Solution
import React from 'react';
import { useVideos } from './useVideos';

export function YouTubeVideoList() {
  const { videos, loading, error, searchTerm, setSearchTerm } = useVideos();

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search videos..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        className="w-full bg-slate-900 border border-slate-800 p-3 rounded-xl text-slate-100"
      />

      {loading && <p className="text-slate-400">Loading videos...</p>}
      {error && <p className="text-rose-400">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videos.map(v => (
          <div key={v.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-3">
            <img src={v.thumbnailUrl} alt={v.title} className="w-full aspect-video rounded-xl object-cover mb-2" />
            <h4 className="font-bold text-sm text-slate-100 line-clamp-2">{v.title}</h4>
            <p className="text-xs text-slate-400 mt-1">{v.channelName} • {v.views}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default YouTubeVideoList;`,
      jsCode: `// YouTubeVideoList.js - Exercise 4 ES6 Component
import React from 'react';
import { useVideos } from './useVideos';

export function YouTubeVideoList() {
  const { videos } = useVideos();
  return (
    <div>
      {videos.map(v => <h4 key={v.id}>{v.title}</h4>)}
    </div>
  );
}`
    },
    {
      name: 'ProductList.production.jsx',
      task: 'Task 5: Production Refactoring',
      description: 'Production-ready component with AbortController & PropTypes',
      jsxCode: `// ProductList.production.jsx - Exercise 5 Solution
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export function ProductList({ category = 'all' }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    fetch(\`/api/products?cat=\${category}\`, { signal: controller.signal })
      .then(r => r.json())
      .then(d => {
        setProducts(d);
        setIsLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') setIsLoading(false);
      });
    return () => controller.abort();
  }, [category]);

  if (isLoading) return <p>Loading catalog...</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map(p => (
        <div key={p.id} className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
          <h4>{p.name}</h4>
          <p>₹{p.price}</p>
        </div>
      ))}
    </div>
  );
}

ProductList.propTypes = {
  category: PropTypes.string
};

export default ProductList;`,
      jsCode: `// ProductList.production.js - Exercise 5 ES6 JS Solution
import React from 'react';
import PropTypes from 'prop-types';

export function ProductList({ products }) {
  if (!products || products.length === 0) return <p>No products</p>;
  return (
    <div>
      {products.map(p => <div key={p.id}>{p.name}</div>)}
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ProductList;`
    }
  ];

  const activeFileData = files.find(f => f.name === selectedFile) || files[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Overview Header */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <FolderCode className="w-3.5 h-3.5" />
              Complete Code Repository
            </div>
            <h2 className="text-2xl font-bold text-slate-100">
              Full Standalone JSX & JS Code Files Hub
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Browse, copy, or download all clean standalone React code files for Exercises 1 to 5. Available in both modern <strong>JSX</strong> and standard <strong>ES6 JavaScript (with PropTypes)</strong> formats.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left File Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 mb-3 border-b border-slate-800 pb-2">
              <FileCode className="w-4 h-4 text-cyan-400" />
              Solution Source Files ({files.length})
            </h3>

            <div className="space-y-2">
              {files.map((file) => {
                const isSelected = selectedFile === file.name;
                return (
                  <button
                    key={file.name}
                    onClick={() => setSelectedFile(file.name)}
                    className={`w-full text-left p-3 rounded-xl transition border ${
                      isSelected
                        ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold">{file.name}</span>
                      <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400 font-sans">
                        {file.task.split(':')[0]}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 font-sans line-clamp-1">
                      {file.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Code Display Viewer */}
        <div className="lg:col-span-8">
          <CodeViewer
            filename={activeFileData.name}
            jsxCode={activeFileData.jsxCode}
            jsCode={activeFileData.jsCode}
            description={activeFileData.description}
          />
        </div>

      </div>
    </div>
  );
};

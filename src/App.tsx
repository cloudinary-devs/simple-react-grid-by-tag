import './App.css';
import { useEffect, useState } from 'react';

// Cloudinary configuration
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'jackie-df',
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  secure: true
});

interface CloudinaryResource {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  asset_id: string;
  tags?: string[];
}

function App() {
  const [images, setImages] = useState<CloudinaryResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        
        // Search for images tagged with "mcptest2"
        const result = await cloudinary.search
          .expression('resource_type:image AND tags=mcptest2')
          .sort_by('created_at', 'desc')
          .max_results(30)
          .execute();

        setImages(result.resources || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching images from Cloudinary:', err);
        setError('Failed to load images from Cloudinary');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Loading Images...</h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-red-600">Error</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mt-4">My Cloudinary Gallery</h1>
        <p className="text-gray-600 mt-2">
          Images tagged with "mcptest2" ({images.length} found)
        </p>
      </header>

      <main>
        {images.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 text-lg">
              No images found with the tag "mcptest2"
            </p>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.asset_id} className="group cursor-pointer">
                <a href={image.secure_url} target="_blank" rel="noopener noreferrer">
                  <div className="overflow-hidden rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300">
                    <img
                      src={image.secure_url}
                      alt={image.public_id}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="p-3 bg-white">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {image.public_id}
                      </p>
                      <p className="text-xs text-gray-500">
                        {image.width} × {image.height} • {image.format.toUpperCase()}
                      </p>
                      {image.tags && image.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {image.tags.slice(0, 3).map((tag, index) => (
                            <span
                              key={index}
                              className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                          {image.tags.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{image.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;

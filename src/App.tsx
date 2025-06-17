import './App.css';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';
import { cld } from './cloudinary.config';
import { useCloudinaryImages } from './hooks/useCloudinaryImages';

function App() {
  const { images, loading, error } = useCloudinaryImages('mcp1');

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mt-4">Winter Collection</h1>
          <p className="mt-4">Loading images...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold mt-4">Winter Collection</h1>
          <p className="mt-4 text-red-500">Error loading images: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mt-4">Winter Collection</h1>
        <img
          src="https://placehold.jp/d2d4ea/d2d4ea/300x100.jpg"
          alt="Placeholder"
          className="w-full h-auto rounded"
        />
      </header>

      <main>
        <section className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-3 gap-2">
          {images.map((image) => {
            // Create Cloudinary image instance
            const cloudinaryImage = cld.image(image.public_id);
            
            // Apply transformations for consistent display
            cloudinaryImage
              .resize(fill().width(400).height(400).gravity(focusOn(face())))
              .format('auto')
              .quality('auto');

            // Generate the direct URL for full-size image
            const fullSizeUrl = `https://res.cloudinary.com/jackie-df/image/upload/v${image.version}/${image.public_id}.${image.format}`;

            return (
              <a 
                key={image.public_id} 
                href={fullSizeUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block hover:opacity-75 transition-opacity"
              >
                <AdvancedImage
                  cldImg={cloudinaryImage}
                  className="w-full h-auto rounded shadow-md"
                  alt={`Image ${image.public_id}`}
                />
              </a>
            );
          })}
        </section>
      </main>
    </div>
  );
}

export default App;

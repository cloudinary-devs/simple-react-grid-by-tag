import './App.css';
import { AdvancedImage } from '@cloudinary/react';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { focusOn } from '@cloudinary/url-gen/qualifiers/gravity';
import { face } from '@cloudinary/url-gen/qualifiers/focusOn';
import { cld } from './cloudinary.config';
import { useCloudinaryImages } from './hooks/useCloudinaryImages';

// Define the tag used to filter images from Cloudinary
const CLOUDINARY_TAG = 'mcp1';
const BANNER_TAG = 'winter-banner';

function App() {
  // Fetch images for banner and gallery
  const { images: bannerImages } = useCloudinaryImages(BANNER_TAG);
  const { images, loading, error } = useCloudinaryImages(CLOUDINARY_TAG);

  // Determine which image to use for the banner
  const bannerPublicId = bannerImages && bannerImages.length > 0
    ? bannerImages[0].public_id
    : (images && images.length > 0 ? images[0].public_id : null);

  let bannerImg = null;
  if (bannerPublicId) {
    bannerImg = cld.image(bannerPublicId);
    bannerImg.resize(
      fill()
        .aspectRatio('4:1')
        .gravity('auto')
    ).format('auto').quality('auto');
  }

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
        {bannerImg ? (
          <div className="w-full aspect-[4/1] rounded overflow-hidden">
            <AdvancedImage
              cldImg={bannerImg}
              className="w-full h-full object-cover"
              alt="Banner"
            />
          </div>
        ) : (
          <div className="w-full aspect-[4/1] bg-gray-200 rounded flex items-center justify-center">
            <span className="text-gray-400">No banner image found</span>
          </div>
        )}
      </header>

      <main>
        <section className="grid grid-cols-1 md:grid-cols-4 sm:grid-cols-3 gap-2">
          {images.map((image) => {
            // Create Cloudinary image instance
            const cloudinaryImage = cld.image(image.public_id);
            cloudinaryImage
              .resize(
                fill()
                  .width(400)
                  .height(400)
                  .gravity('auto:face')
              )
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

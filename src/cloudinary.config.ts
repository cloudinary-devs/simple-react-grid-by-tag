import { Cloudinary } from '@cloudinary/url-gen';

// Cloudinary cloud name for client-side operations
const cloudName = 'jackie-df';

export const cld = new Cloudinary({
  cloud: {
    cloudName: cloudName,
  },
});

// Export cloud name for client-side listing URLs
export const cloudinaryConfig = {
  cloudName: cloudName,
}; 
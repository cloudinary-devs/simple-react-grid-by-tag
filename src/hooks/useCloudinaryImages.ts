import { useState, useEffect } from 'react';
import { cloudinaryConfig } from '../cloudinary.config';

interface CloudinaryImage {
  asset_id: string;
  public_id: string;
  version: number;
  format: string;
  width: number;
  height: number;
  type: string;
  created_at: string;
  metadata?: any[];
  asset_folder?: string;
}

interface CloudinaryListResponse {
  resources: CloudinaryImage[];
  updated_at: string;
}

export const useCloudinaryImages = (tag: string) => {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);

        // Use Cloudinary's client-side listing feature
        const listUrl = `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/list/${tag}.json`;
        
        const response = await fetch(listUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.status} ${response.statusText}`);
        }
        
        const data: CloudinaryListResponse = await response.json();
        setImages(data.resources || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch images');
        console.error('Error fetching Cloudinary images:', err);
      } finally {
        setLoading(false);
      }
    };

    if (tag) {
      fetchImages();
    }
  }, [tag]);

  return { images, loading, error };
}; 
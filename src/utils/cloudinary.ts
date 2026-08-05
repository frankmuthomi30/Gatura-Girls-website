/**
 * Utility functions for uploading photos directly to Cloudinary
 */

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
}

const STORAGE_KEY = 'st_teresa_cloudinary_config';

/**
 * Get stored Cloudinary configuration from LocalStorage or return default
 */
export function getStoredCloudinaryConfig(): CloudinaryConfig {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.cloudName) {
        return parsed;
      }
    }
  } catch (e) {
    // fallback
  }
  return {
    cloudName: '',
    uploadPreset: ''
  };
}

/**
 * Save Cloudinary configuration to LocalStorage
 */
export function saveCloudinaryConfig(config: CloudinaryConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Failed to save Cloudinary config:', e);
  }
}

/**
 * Compress image file via HTML Canvas to a lightweight base64 JPEG data URL (~80-150KB)
 */
export async function compressImageFileToDataUrl(file: File, maxDim = 1000, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDim) {
            height = Math.round(height * (maxDim / width));
            width = maxDim;
          }
        } else {
          if (height > maxDim) {
            width = Math.round(width * (maxDim / height));
            height = maxDim;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL('image/jpeg', quality));
        } else {
          resolve(event.target?.result as string);
        }
      };
      img.onerror = () => resolve(event.target?.result as string);
      img.src = event.target?.result as string;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Upload a File object directly to Cloudinary unsigned upload API endpoint
 */
export async function uploadToCloudinary(
  file: File,
  cloudName: string,
  uploadPreset: string
): Promise<{ url: string; publicId: string; width?: number; height?: number }> {
  if (!cloudName || !cloudName.trim()) {
    throw new Error('Cloudinary Cloud Name is missing. Please configure your Cloud Name in Admin Settings.');
  }
  if (!uploadPreset || !uploadPreset.trim()) {
    throw new Error('Cloudinary Upload Preset is missing. Please configure your Upload Preset in Admin Settings.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset.trim());
  formData.append('folder', 'school_gallery');

  const endpoint = `https://api.cloudinary.com/v1_1/${cloudName.trim()}/image/upload`;
  
  let response;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      body: formData
    });
  } catch (error) {
    throw new Error('Network error: Could not reach Cloudinary. Please check your internet connection.');
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    let message = errorData.error?.message || `Cloudinary upload failed with status ${response.status}`;
    
    if (message.includes('whitelisted for unsigned uploads')) {
      message = `Cloudinary Upload Preset Error: Preset "${uploadPreset}" is not configured for Unsigned Uploads in Cloudinary Dashboard. (Go to Settings -> Upload -> Add/Edit Upload Preset -> Set Signing Mode to "Unsigned").`;
    }
    
    throw new Error(message);
  }

  const data = await response.json();
  
  if (!data.secure_url) {
    throw new Error('Cloudinary upload did not return a secure URL.');
  }

  let optimizedUrl = data.secure_url;
  if (optimizedUrl.includes('/upload/') && !optimizedUrl.includes('f_auto,q_auto')) {
    optimizedUrl = optimizedUrl.replace('/upload/', '/upload/f_auto,q_auto/');
  }

  return {
    url: optimizedUrl,
    publicId: data.public_id,
    width: data.width,
    height: data.height
  };
}

/**
 * Ensures a Cloudinary URL has f_auto,q_auto for optimal delivery
 */
export function optimizeCloudinaryUrl(url: string | undefined): string {
  if (!url) return '';
  if (url.includes('res.cloudinary.com') && url.includes('/upload/') && !url.includes('f_auto,q_auto')) {
    return url.replace('/upload/', '/upload/f_auto,q_auto/');
  }
  return url;
}

import { User } from 'firebase/auth';
import { doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/FirebaseConfig';
import { supabase } from '../lib/SupaBase';

/**
 * Interface for image upload options
 */
export interface UploadImageOptions {
  file: File | Blob;
  user: User;
  path?: string;
  fileName?: string;
  metadata?: Record<string, any>;
}

/**
 * Interface for upload result
 */
export interface UploadResult {
  url: string;
  path: string;
  fileName: string;
  metadata?: Record<string, any>;
}

/**
 * Validate if the provided object is a valid File or Blob
 * @param file - The file to validate
 * @returns boolean indicating if file is valid
 */
const isValidFile = (file: any): boolean => {
  return file instanceof Blob;
};

/**
 * Process image file using FileReader
 * @param file - The image file to process
 * @returns Promise resolving to the processed file data
 */
const processImageFile = (file: File | Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!isValidFile(file)) {
      reject(new Error("Provided parameter is not a File or Blob"));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = () => {
      reject(new Error("Error reading file"));
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Generate unique filename for storage
 * @param file - The file to generate name for
 * @param prefix - Optional prefix for the filename
 * @returns Generated filename with timestamp
 */
const generateUniqueFileName = (file: File | Blob, prefix = ''): string => {
  const timestamp = new Date().getTime();
  const fileName = file instanceof File ? file.name : `blob_${timestamp}.jpg`;
  return `${prefix}${timestamp}_${fileName}`;
};

/**
 * Uploads a profile picture to Supabase Storage and updates Firestore
 * @param file - The image file to upload
 * @param user - The user object (from Firebase Auth or UserStore)
 * @returns Promise resolving to the download URL
 */
export const uploadProfilePicture = async (file: File | Blob, user: User): Promise<string> => {
  if (!isValidFile(file)) {
    throw new Error("Provided parameter is not a File or Blob");
  }
  
  if (!user) throw new Error('No user is signed in');
  
  try {
    // Process the image file
    await processImageFile(file);
    
    // Generate a unique filename
    const timestamp = new Date().getTime();
    const fileName = file instanceof File 
      ? `profile/${user.uid}/${timestamp}_${file.name}`
      : `profile/${user.uid}/${timestamp}_profile.jpg`;
    
    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from('s3')
      .upload(`IndustrialPainter/${fileName}`, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) throw error;
    
    // Construct the public URL
    const storedImageUrl = `https://ygupauzziwowdsjuizev.supabase.co/storage/v1/object/public/s3/IndustrialPainter/${fileName}`;
    
    // Update user document in Firestore with the new image path
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
      await updateDoc(userDocRef, {
        photoURL: storedImageUrl,
        photoPath: fileName,
        updatedAt: new Date()
      });
    } else {
      await setDoc(userDocRef, {
        photoURL: storedImageUrl,
        photoPath: fileName,
        createdAt: new Date()
      });
    }
    
    return storedImageUrl;
  } catch (error: any) {
    console.error('Error uploading profile picture:', error);
    throw new Error(`Failed to upload profile picture: ${error.message}`);
  }
};

/**
 * General-purpose image upload function for any type of image
 * @param options - Upload options (file, user, path, fileName, metadata)
 * @returns Promise resolving to upload result with URL and path
 */
export const uploadImage = async (options: UploadImageOptions): Promise<UploadResult> => {
  const { file, user, path = 'images', fileName, metadata = {} } = options;
  
  if (!isValidFile(file)) {
    throw new Error("Provided parameter is not a File or Blob");
  }
  
  if (!user) throw new Error('No user is signed in');
  
  try {
    // Process the image file using FileReader
    await processImageFile(file);
    
    // Generate a unique filename if one wasn't provided
    const finalFileName = fileName || generateUniqueFileName(file);
    const supabasePath = `IndustrialPainter/${path}/${user.uid}/${finalFileName}`;
    
    // Upload to Supabase
    const { data, error } = await supabase.storage
      .from('s3')
      .upload(supabasePath, file, {
        cacheControl: '3600',
        upsert: true
      });
    
    if (error) throw error;
    
    // Construct the public URL
    const storedImageUrl = `https://ygupauzziwowdsjuizev.supabase.co/storage/v1/object/public/s3/${supabasePath}`;
    
    // Store metadata in Firestore if needed
    if (Object.keys(metadata).length > 0) {
      const imageDocRef = doc(db, 'images', `${user.uid}_${finalFileName}`);
      await setDoc(imageDocRef, {
        userId: user.uid,
        url: storedImageUrl,
        path: supabasePath,
        fileName: finalFileName,
        metadata,
        createdAt: new Date()
      });
    }
    
    return {
      url: storedImageUrl,
      path: supabasePath,
      fileName: finalFileName,
      metadata
    };
  } catch (error: any) {
    console.error('Error uploading image:', error);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

/**
 * Downloads an image from Supabase
 * @param path - The path to the image in Supabase storage
 * @returns Promise resolving to the file data
 */
export const downloadImage = async (path: string): Promise<Blob | null> => {
  try {
    const { data, error } = await supabase.storage
      .from('s3')
      .download(path);
    
    if (error) throw error;
    
    return data;
  } catch (error: any) {
    console.error('Error downloading image:', error);
    throw new Error(`Failed to download image: ${error.message}`);
  }
};

/**
 * Deletes an image from Supabase and removes reference from Firestore
 * @param path - The path to the image in Supabase storage
 * @param user - The user who owns the image
 * @returns Promise resolving to success status
 */
export const deleteImage = async (path: string, user: User): Promise<boolean> => {
  if (!user) throw new Error('No user is signed in');
  
  try {
    // Delete from Supabase
    const { error } = await supabase.storage
      .from('s3')
      .remove([path]);
    
    if (error) throw error;
    
    // Remove from Firestore if it exists
    const fileName = path.split('/').pop();
    if (fileName) {
      const imageDocRef = doc(db, 'images', `${user.uid}_${fileName}`);
      const imageDoc = await getDoc(imageDocRef);
      if (imageDoc.exists()) {
        await updateDoc(imageDocRef, { deleted: true, deletedAt: new Date() });
      }
    }
    
    return true;
  } catch (error: any) {
    console.error('Error deleting image:', error);
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

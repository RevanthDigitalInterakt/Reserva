import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';

const pathStorageInFirebase = 'user/profile/image/';
export class FirebaseService {
  /**
   * Save image profile
   * @param {any} file
   * @returns {any}
   */
  public async createFS(file: any): Promise<string> {
    const fileExtension = file?.uri?.split('.').pop();

    const fileName = `${uuid.v4()}.${fileExtension}`;

    const reference = storage().ref(`${pathStorageInFirebase}${fileName}`);

    const pathToFileOnDevice = `${file.uri}`;

    const uploading = reference.putFile(pathToFileOnDevice);

    uploading.on('state_changed', (taskSnapshot: any) => {
    });

    await uploading.then(() => {
    });

    return reference.fullPath;
  }

  /**
   * Delete image profile
   * @param {string} imageRef
   * @returns {any}
   */
  public async deleteFS(imageRef: string): Promise<void> {
    const reference = storage().ref(`${imageRef}`);

    await reference.delete();
  }

  /**
   * Get URL image profile
   * @param {string} imageRef
   * @returns {string}
   */
  public async getUrlFS(imageRef: string): Promise<string> {
    const url = await storage().ref(`${imageRef}`).getDownloadURL();
    return url;
  }
}

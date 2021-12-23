import AsyncStorage from '@react-native-community/async-storage';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';

const pathStorageInFirebase = 'user/profile/image/';
export class FirebaseService {
  /**
   * Save image profile
   * @param {any} file
   * @returns {any}
   */
  public async createFS(file: any): Promise<void> {
    const fileExtension = file.uri.split('.').pop();

    const fileName = `${uuid.v4()}.${fileExtension}`;

    const reference = storage().ref(`${pathStorageInFirebase}${fileName}`);

    await AsyncStorage.setItem('@Image_Profile', reference.fullPath);

    const pathToFileOnDevice = `${file.uri}`;

    const uploading = reference.putFile(pathToFileOnDevice);

    uploading.on('state_changed', (taskSnapshot: any) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );
    });

    uploading.then(() => {
      console.log('Image uploaded to the bucket!');
    });
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
    const ref = storage().ref(`${imageRef}`);
    const url = await ref.getDownloadURL();

    return url;
  }
}

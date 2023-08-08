import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

/**
 * Opções para salva e recuperar dados do storage
 *
 * @typeParam key - Chave do dado
 * @typeParam value - Valor do dado
 * @typeParam isJSON - Dado é um JSON
 *
 */
export type GetSetOptions = {
  key: StorageServiceKeys;
  value?: string;
  isJSON?: boolean;
};

export enum StorageServiceKeys {
  /**
   * Chave para armazenar o token do usuário
   */
  INSTALLATION_TOKEN = 'installationToken',
  /**
   * Chave para armazenar o profile do usuário
   */
  PROFILE = 'profile',
  /**
   * Cookie de autenticação do usuário na API da VTEX
   */
  COOKIE = 'cookie',
}

export class StorageService {
  /**
   * Retorna o token de instalação único do usuário no app
   *
   * @method getInstallationToken
   * @memberof StorageService
   * @throws {Error} Caso não seja possível obter o token de instalação
   * @returns Token de instalação único do usuário no app
   * @static
   * @async
   * @example
   * ```
   * const installationToken = await StorageService.getInstallationToken();
   * ```
   *
   */
  static async getInstallationToken(): Promise<string> {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(StorageServiceKeys.INSTALLATION_TOKEN)
        .then((value) => {
          if (value) {
            resolve(value);
          } else {
            reject(new Error('No installation token'));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Salva o token de instalação único do usuário no app
   *
   * @method setInstallationToken
   * @memberof StorageService
   * @throws {Error} Caso não seja possível salvar o token de instalação
   * @returns Se o token de instalação foi salvo com sucesso
   * @static
   * @async
   * @example
   * ```
   * const isSaved = await StorageService.setInstallationToken();
   * ```
   *
   */
  static async setInstallationToken(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const installationToken = uuid.v4() as string;

      AsyncStorage.setItem(
        StorageServiceKeys.INSTALLATION_TOKEN,
        installationToken,
      )
        .then(() => {
          resolve(true);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Busca um item do storage
   *
   * Caso `isJSON` seja `true`, o `value` será convertido para `JSON` antes de ser retornado
   *
   * @method getItem
   * @memberof StorageService
   * @param {GetSetOptions} options Opções para buscar o item
   * @throws {Error} Caso não seja possível obter o item
   * @returns Item do storage
   * @typeReturn T Tipo do item a ser buscado
   * @static
   * @async
   * @example
   * ```
   * const profile = await StorageService
   * .getItem<Profile>({ key: StorageServiceKeys.PROFILE, isJSON: true });
   * ```
   *
   */
  static async getItem<T>({ key, isJSON }: GetSetOptions): Promise<T> {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(key)
        .then((value) => {
          if (value) {
            resolve(isJSON ? JSON.parse(value) : value);
          } else {
            reject(new Error(`No data found for key: ${key}`));
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Salva um item no storage
   *
   * Caso o item já exista, ele será sobrescrito
   *
   * Caso `isJSON` seja `true`, o `value` deve ser um objeto e
   * será convertido para `string` antes de ser salvo
   *
   * @method setItem
   * @memberof StorageService
   * @param {GetSetOptions} options Opções para salvar o item
   * @throws {Error} Caso não seja possível salvar o item
   * @returns Se o item foi salvo com sucesso
   * @static
   * @async
   * @example
   * ```
   * const isSaved = await StorageService
   * .setItem({ key: StorageServiceKeys.PROFILE, value: profile, isJSON: true });
   * ```
   *
   */
  static async setItem({
    key,
    value,
    isJSON,
  }: GetSetOptions): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (value) {
        AsyncStorage.setItem(key, isJSON ? JSON.stringify(value) : value)
          .then(() => {
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        reject(new Error('Value is required'));
      }
    });
  }

  /**
   * Busca vários itens do storage de uma vez
   *
   * Caso `isJSON` seja `true`, o `value` será convertido para `JSON` antes de ser retornado
   *
   * @method multiGet
   * @memberof StorageService
   * @param {GetSetOptions} options Array de opções para buscar os itens
   * @throws {Error} Caso não seja possível obter os itens
   * @returns Array de itens do storage
   * @typeReturn T[] Tipo dos itens a serem buscados
   * @static
   * @async
   * @example
   * ```
   * const profiles = await StorageService.multiGet<Profile>([
   *  { key: StorageServiceKeys.PROFILE, isJSON: true },
   *  { key: StorageServiceKeys.INSTALLATION_TOKEN },
   * ]);
   * ```
   *
   */
  static async multiGet<T>(options: GetSetOptions[]): Promise<T> {
    const promises = options.map((option: GetSetOptions) => AsyncStorage.getItem(option.key));
    const processResult = (result: any) => {
      const resultObj: any = {};
      result.map((value: string, i: number) => {
        if (options[i].isJSON) {
          resultObj[options[i].key] = JSON.parse(value);
        } else {
          resultObj[options[i].key] = value;
        }
        return true;
      });
      return resultObj;
    };

    return Promise.all(promises).then(
      (result) => {
        const value = processResult(result);
        return Promise.resolve(value);
      },
      (errors) => Promise.reject(errors),
    );
  }
}

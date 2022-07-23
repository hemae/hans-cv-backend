import {readFileSync} from 'fs'
import configGetter, {DatabaseFolderName} from '../configGetter'


export function jsonFileReader<FileNameType>(folderName: DatabaseFolderName) {
    return function (fileName: FileNameType): Record<string, any>[] {
        return JSON.parse(readFileSync(`${configGetter(folderName)}/${fileName}.json`, 'utf-8'))
    }
}

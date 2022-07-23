import {writeFileSync} from 'fs'
import configGetter, {DatabaseFolderName} from '../configGetter'


type OptionsType<FileName> = {
    fileName: FileName
    folderName: DatabaseFolderName
    data: Record<string, any>
}

export function jsonFileWriter<FileName>(options: OptionsType<FileName>): void {

    const {
        fileName,
        folderName,
        data
    } = options

    const path = `${configGetter(folderName)}/${fileName}.json`
    writeFileSync(path, JSON.stringify(data), 'utf-8')
}

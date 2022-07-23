import config from 'config'

export type RoutesFolder = 'routes'

export type DatabaseDataFolderName =
    'sections'
    | 'educations'
    | 'experiences'
    | 'languages'
    | 'links'
    | 'projects'
    | 'skills'

    | 'admin-code'
    | 'admins'

export type DatabaseFolderName = DatabaseDataFolderName


export type ImagesFolderName =
    'images'
    | 'skillsImages'
    | 'sectionsImages'
    | 'experiencesImages'
    | 'educationsImages'
    | 'languagesImages'
    | 'linksImages'
    | 'projectsImages'

export type FolderName = DatabaseFolderName | RoutesFolder | ImagesFolderName

type Server = 'port'
    | 'baseUrl'
    | 'apiV'

type JwtSecret =
    'jwtSecret'
    | 'jwtPassword'

type PasswordSecret =
    'passwordSecret'

type App =
    'appName'

type ConfigParam =
    Server
    | FolderName
    | JwtSecret
    | PasswordSecret
    | ImagesFolderName
    | App

export default function configGetter<ReturnedType>(param: ConfigParam): ReturnedType | undefined {
    return config.get(param)
}

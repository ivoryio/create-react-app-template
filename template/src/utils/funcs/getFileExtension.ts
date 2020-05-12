export const getFileExtension = (path: string) =>
  path.match(/(?:.+..+[^/]+$)/gi) != null ? path.split('.').slice(-1)[0] : 'null'

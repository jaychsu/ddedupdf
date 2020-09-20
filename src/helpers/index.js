export const isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i)

export const isBrowser = new Function('try { return this === window; } catch(e) { return false; }')

export const isNode = new Function('try { return this === global; } catch(e) { return false; }')

export const isString = str => typeof str === 'string'

export function getExtension(filename) {
  return (filename || '').split('.').slice(-1)[0]
}

export const supportedTags = [
  'complex_hard',
  'complex_normal',
  'complex_easy',
  'forecast',
  'frequency',
]

export function deepFetch(target, path, defaultValue = undefined) {
  if (!target || !Array.isArray(path)) {
    return defaultValue
  }

  return path.reduce((level, key) => (
    (level && level.hasOwnProperty(key)) ? level[key] : defaultValue
  ), target)
}

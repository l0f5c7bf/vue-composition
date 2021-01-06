function parseKey(key) {
  const arr = key.split('.')
  return {
    name: arr.pop() || key,
    path: arr.join('/')
  }
}

export default function (key) {
  try {
    const { name, path } = parseKey(key)
    const module = require(`../../../../api/${path}.js`)
    return {
      moduleConfig: module.default,
      APIConfig: module[name]
    }
  } catch (e) {
    throw new Error(e)
  }
}

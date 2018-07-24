/**
 * 存储localStorage
 */
export const setStorage = (name, content) => {
  if (!name) return;
  //if (!content) return;

  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStorage = name => {
  if (!name) return;
  return JSON.parse(window.localStorage.getItem(name));
}

/**
 * 删除localStorage
 */
export const removeStorage = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}
/**
 * 清空LocalStorage
 */
export const clearStorage = () => {
  window.localStorage.clear();
}

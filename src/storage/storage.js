export function saveItem(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

export function loadItem(key) {
  return localStorage.getItem(key);
}

export function clearItem() {
  return localStorage.clear();
}

export function isLogin() {
  return loadItem("accessToken") !== null;
}

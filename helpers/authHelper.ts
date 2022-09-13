export function setStateFromLocal(store: any): boolean {
  const token = localStorage.getItem("userToken");
  const userName = localStorage.getItem("userName");
  if (userName && token) {
    store.commit("AUTHENTICATED", { token, user: userName });
    return true
  }
  return false;
}
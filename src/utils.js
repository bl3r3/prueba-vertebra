export const getLocalStorageItems = (key) => {
  const items = JSON.parse(localStorage.getItem(key)) ?? []
  return items.filter((item) => !!item)
}

export class StorageAPI {
  loadJSON = (key) => {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : [];
  };

  saveJSON = (key, obj) => {
    localStorage.setItem(key, JSON.stringify(obj));
  };

  joinJSON = (key, obj) => {
    const currentData = this.loadJSON(key);
    localStorage.setItem(key, JSON.stringify([...currentData, obj]));
  };

  updateJSON = (id, key) => {
    const currentData = this.loadJSON(key);
    const newData = currentData.filter((e) => e.id !== id);
    this.saveJSON(key, newData);
  };

  replaceJSON = (srcKey, destKey, id) => {
    const srcData = this.loadJSON(srcKey);
    const item = srcData.find((e) => e.id === id);
    this.joinJSON(destKey, item);
  };

  editJSON = (key, { id, text }) => {
    const currentData = this.loadJSON(key);
    const newData = currentData.map((e) => {
      if (e.id === id) {
        e.text = text;
      }
      return e;
    });
    this.saveJSON(key, newData);
  };
}

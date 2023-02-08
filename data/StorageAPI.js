export class StorageAPI {
  constructor(key) {
    this.key = key;
    this.state = { prev: [], current: this.loadJSON(this.key) };
    this.subscribers = [];
  }

  setState() {
    if (this.state.current.length) {
      this.state.prev = this.state.current.slice();
    }
    this.state.current = this.loadJSON(this.key);
    this.notify();
  }

  subscribe(subs) {
    this.subscribers.push(subs);
  }

  notify() {
    this.subscribers.forEach((subs) => {
      subs.signal(this.state);
    });
  }

  loadJSON = (key) => {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key))
      : [];
  };

  saveJSON = (obj) => {
    localStorage.setItem(this.key, JSON.stringify(obj));
    this.setState();
  };

  joinJSON = (obj) => {
    localStorage.setItem(
      this.key,
      JSON.stringify([...this.state.current, obj])
    );
    this.setState();
  };

  updateJSON = (id) => {
    const { current } = this.state;
    const newData = current.filter((e) => e.id !== id);
    this.saveJSON(newData);
  };

  editJSON = ({ id, text }) => {
    const { current } = this.state;
    const newData = current.map((e) => {
      if (e.id === id) {
        e.text = text;
      }
      return e;
    });
    this.saveJSON(newData);
  };
}

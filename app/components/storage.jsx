class Storage {
  constructor(storage, index) {
    this._storage = storage;
    this._index = index;
  }
  get storage() {
    return this._storage;
  }
  get index() {
    return this._index;
  }
  set index(value) {
    this._index = value;
  }
  log() {
    console.log(this._storage);
  }
  add(id, content, completed) {
    this.storage.push({
      id: id,
      content: content,
      completed: completed,
    });
    this.addPostInDB(this.storage[this.storage.length - 1]);
  }
  load(id, content, completed) {
    this.storage.push({
      id: id,
      content: content,
      completed: completed,
    });
  }
  complete(id) {
    this.storage.forEach((elem) => {
      if (elem.id === id) {
        if (elem.completed == true) {
          elem.completed = false;
          this.updatePostInDB(elem);
        } else {
          elem.completed = true;
          this.updatePostInDB(elem);
        }
      }
    });
  }
  edit(id, content) {
    this.storage.forEach((elem) => {
      if (elem.id === id) {
        elem.content = content;
        this.updatePostInDB(elem);
      }
    });
  }
  delete(id) {
    this.storage.forEach((elem, i) => {
      if (elem.id === id) {
        this.deletePostInDB(elem);
        this.storage.splice(i, 1);
      }
    });
  }
  async addPostInDB(elem) {
    let url = "http://localhost:3000";
    const response = await fetch(`${url}/addpost`, {
      mode: "no-cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: elem.id,
        content: elem.content,
        completed: elem.completed,
      }),
    });
    const responseText = await response.text();
    console.log(responseText);
  }
  async updatePostInDB(elem) {
    let url = "http://localhost:3000";
    const response = await fetch(`${url}/editpost`, {
      mode: "no-cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: elem.id,
        content: elem.content,
        completed: elem.completed,
      }),
    });
    const responseText = await response.text();
    console.log(responseText);
  }

  async deletePostInDB(elem) {
    let url = "http://localhost:3000";
    const response = await fetch(`${url}/deletepost`, {
      mode: "no-cors",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: elem.id,
        content: elem.content,
        completed: elem.completed,
      }),
    });
    const responseText = await response.text();
    console.log(responseText);
  }
}

module.exports = Storage;
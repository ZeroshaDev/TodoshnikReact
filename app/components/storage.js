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
    this.apiCall(this.storage[this.storage.length - 1], "/addpost");
  }
  async load() {
    let posts;
    await fetch(`${process.env.URL}/getposts`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        posts = data;
        console.log(data);
      });

    posts.forEach((elem) => {
      this.storage.push({
        id: elem.id,
        content: elem.content,
        completed: elem.completed,
      });
    });
  }
  complete(id) {
    this.storage.forEach((elem) => {
      if (elem.id === id) {
        if (elem.completed == true) {
          elem.completed = false;
          this.apiCall(elem, "/editpost");
        } else {
          elem.completed = true;
          this.apiCall(elem, "/editpost");
        }
      }
    });
  }
  edit(id, content) {
    this.storage.forEach((elem) => {
      if (elem.id === id) {
        elem.content = content;
        this.apiCall(elem, "/editpost");
      }
    });
  }
  delete(id) {
    this.storage.forEach((elem, i) => {
      if (elem.id === id) {
        this.apiCall(elem, "/deletepost");
        this.storage.splice(i, 1);
      }
    });
  }
  //апиколл название
  async apiCall(elem, path) {
    let url = process.env.URL;
    const response = await fetch(url + path, {
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

export default Storage;
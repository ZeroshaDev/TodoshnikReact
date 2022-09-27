import React from "react";
class Storage {
    constructor(storage, index) {
      this._storage = storage;
      this._index = index;
      this._token = "";
    }
    clear(){
      this._storage = [];
      this._index = 0;
      this._token = "";
    }
    get token() {
      return this._token;
    }
    set token(value) {
      this._token = value;
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
    tokenSetter(tk) {
      this.token = tk;
    }
    log() {
      console.log(this._storage);
      console.log(this._token);
    }
    add(id, content, completed) {
      this.storage.push({
        id: id,
        content: content,
        completed: completed,
      });
      this.apiCall(
        this.storage[this.storage.length - 1],
        "/tasks/addpost",
        "POST"
      );
    }
    async load() {
      let posts;
      await fetch(`${process.env.URL}/tasks/getposts`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${this.token}`,
        },
      })
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
            this.apiCall(elem, "/tasks/editpost", "PUT");
          } else {
            elem.completed = true;
            this.apiCall(elem, "/tasks/editpost", "PUT");
          }
        }
      });
    }
    edit(id, content) {
      this.storage.forEach((elem) => {
        if (elem.id === id) {
          elem.content = content;
          this.apiCall(elem, "/tasks/editpost", "PUT");
        }
      });
    }
    delete(id) {
      this.storage.forEach((elem, i) => {
        if (elem.id === id) {
          this.apiCall(elem, "/tasks/deletepost", "DELETE");
          this.storage.splice(i, 1);
        }
      });
    }
  
    async apiCall(elem, path, met) {
      let url = process.env.URL;
      const response = await fetch(url + path, {
        method: met,
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${this.token}`,
        },
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
const MyContext = React.createContext({
  store: new Storage([], 0),
});



export default MyContext;

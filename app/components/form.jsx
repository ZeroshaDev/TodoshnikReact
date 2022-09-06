const React = require("react");
const Task = require("./task.jsx");
const Storage = require("./storage.jsx");

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.clickAddBtn = this.clickAddBtn.bind(this);
    this.textBoxOnChange = this.textBoxOnChange.bind(this);
    this.state = {
      list: [],
      content: "",
      keyCounter: 0,
      storage: new Storage([], 0),
    };
    this.loadNotates(this.state.storage);
  }
  clickAddBtn(event) {
    if (this.state.content !== "") {
      let mas = this.state.list;
      let key = this.state.keyCounter + 1;
      this.state.storage.add(key,this.state.content,false);
      let newTask = <Task key={key} id={key} content={this.state.content} completed={false} storage={this.state.storage}/>;
      mas.push(newTask);
      this.setState({ list: mas, keyCounter: key });
      event.target.previousSibling.value = "";
      this.setState({ content: "" });
    } else {
      alert("In textBox mast be some information");
    }
  }
  textBoxOnChange(event) {
    if (event.key === "Enter") {
      const e = new Event("click", { bubbles: true });
      event.target.nextSibling.dispatchEvent(e);
    }
    if (event.key === "Escape") {
      event.target.value = "";
      event.target.blur();
    }
    this.setState({ content: event.target.value });
  }
  async loadNotates(storage) {
    let posts;
    let url = "http://localhost:3000";
    await fetch(`${url}/getposts`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        posts = data;
        console.log(data);
      });

    posts.forEach((elem) => {
      storage.load(elem.id, elem.content, elem.completed);
      let mas = this.state.list;
      let newTask = <Task key={elem.id} id={elem.id} content={elem.content} completed={elem.completed} storage={this.state.storage}/>;
      mas.push(newTask);
      this.setState({ list: mas, keyCounter: elem.id });
    });
  }
  render() {
    this.state.storage.log();
    return (
      <div>
        <input
          type="text"
          placeholder="Input something"
          onKeyUp={this.textBoxOnChange}
        />
        <button onClick={this.clickAddBtn}>Add</button>
        <ul>{this.state.list}</ul>
      </div>
    );
  }
}

module.exports = Form;

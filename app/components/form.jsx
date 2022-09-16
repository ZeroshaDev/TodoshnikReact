import React from "react";
import Task from "./task.jsx";
import Storage from "./storage.js";
import uuid from "react-uuid";

const store = new Storage([], 0);
//юайди 4 библиотеку
//импорты вместо реквайр
//добавить линтер(ESlint) и притиер
// страничка логина и пометка тасок для владельца
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      content: ""
    };
  }
  handleRefresh = () => {
    this.setState({
      list: store.storage,
    });
  };
  handleClickAddBtn = () => {
    const { content} = this.state;
    if (content !== "") {
      store.add(uuid(), content, false);
      this.setState({ content: "" });
      this.handleRefresh();
    } else {
      alert("In field mast be some information");
    }
  };
  handleChange = (event) => {
    this.setState({ content: event.target.value });
  };
  handleKeyUp = (event) => {
    if (event.key === "Enter") {
      this.handleClickAddBtn();
    }
    if (event.key === "Escape") {
      event.target.blur();
      this.setState({ content: "" });
    }
  };
  async componentDidMount() {
    await store.load();
    this.handleRefresh();
  }
  render() {
    //this.state.storage.log();
    const { list, content } = this.state;

    return (
      <div>
        <input
          type="text"
          placeholder="Input something"
          onKeyUp={this.handleKeyUp}
          onChange={this.handleChange}
          value={content}
        />
        <button onClick={this.handleClickAddBtn}>Add</button>
        <ul>
          {list.map((elem) => (
            <Task
              key={elem.id}
              id={elem.id}
              content={elem.content}
              completed={elem.completed}
              storage={store}
              refresh={this.handleRefresh}
            />
          ))}
        </ul>
      </div>
    );
  }
}

export default Form;

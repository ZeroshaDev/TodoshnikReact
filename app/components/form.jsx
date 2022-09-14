const React = require("react");
const Task = require("./task.jsx");
const Storage = require("./storage.js");

const store = new Storage([], 0);
//юайди 4 библиотеку
//импорты вместо реквайр
//добавить линтер(ESlint) и притиер 
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      content: "",
      keyCounter: 0,
    };
  }
  handleRefresh = () => {
    this.setState({
      list: store.storage,
      keyCounter:
        store.storage.length > 0
          ? store.storage[store.storage.length - 1].id
          : 0,
    });
  };
  handleClickAddBtn = (event) => {
    if (event.target.previousSibling.value !== "") {
      store.add(
        this.state.keyCounter + 1,
        event.target.previousSibling.value,
        false
      );
      this.handleRefresh();
      event.target.previousSibling.value = "";
    } else {
      alert("In textBox mast be some information");
    }
  };
  handleKeyUp = (event) => {
    if (event.key === "Enter") {
      const e = new Event("click", { bubbles: true });
      event.target.nextSibling.dispatchEvent(e);
    }
    if (event.key === "Escape") {
      event.target.value = "";
      event.target.blur();
    }
  };
  async componentDidMount() {
    await store.load();
    this.handleRefresh();
  }
  render() {
    //this.state.storage.log();
    return (
      <div>
        <input
          type="text"
          placeholder="Input something"
          onKeyUp={this.handleKeyUp}
        />
        <button onClick={this.handleClickAddBtn}>Add</button>
        <ul>
          {this.state.list.map((elem) => (
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

module.exports = Form;

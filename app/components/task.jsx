const React = require("react");


class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nowOnChange: false, content: ""};
  }
  deleteOnClic = () => {
    this.props.storage.delete(this.props.id);
    this.props.refresh();
  };
  doneOnClick = () => {
    this.props.storage.complete(this.props.id);
    this.props.refresh();
  };
  editOnClick = () => {
    if (this.state.nowOnChange) {
      this.props.storage.edit(this.props.id, this.state.content)};
    this.setState({ nowOnChange: !this.state.nowOnChange });
    this.props.refresh();
  };
  handleOnKeyUp = (e) => {
    this.setState({ content: e.target.value });
    if (e.key === "Enter") {
      this.editOnClick();
    }
    if (e.key === "Escape") {
      //проблема! создать для инпука или дива отдельный компонент 
      this.editOnClick();
    }
  };

  render() {
    return (
      <li>
        <button onClick={this.doneOnClick} className="doneBtn">
          {this.props.completed === true ? "Uncomplete" : "Complete"}
        </button>
        //таск тайтл отдельный компонент
        {!this.state.nowOnChange ? (
          <div
            className={
              this.props.completed === true ? "content done" : "content "
            }
            onClick={this.editOnClick}
          >
            {this.props.content}
          </div>
        ) : (
          <input
            type="text"
            defaultValue={this.props.content}
            onKeyUp={this.handleOnKeyUp}
          ></input>
        )}
        <button onClick={this.editOnClick} disabled={this.props.completed}>
          {!this.state.nowOnChange ? "Edit" : "Save"}
        </button>
        <button onClick={this.deleteOnClic}>Delete</button>
      </li>
    );
  }
}

module.exports = Task;

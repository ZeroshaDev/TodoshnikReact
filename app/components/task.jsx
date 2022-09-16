import React from "react";
import Content from "./content.jsx";

class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nowOnChange: false, content: "" };
  }
  deleteOnClic = () => {
    const { storage, refresh } = this.props;
    storage.delete(this.props.id);
    refresh();
  };
  doneOnClick = () => {
    const { storage, refresh } = this.props;
    storage.complete(this.props.id);
    refresh();
  };
  editOnClick = () => {
    const { storage, refresh, id } = this.props;
    const { content, nowOnChange } = this.state;
    if (nowOnChange) {
      storage.edit(id, content);
    }
    this.setState({ nowOnChange: !nowOnChange });
    refresh();
  };

  contentSetter = (updatedContent) => {
    this.setState({ content: updatedContent });
  };

  nowOnChangeSetter = () => {
    this.setState({ nowOnChange: false });
  };
  render() {
    const { completed, content } = this.props;
    const { nowOnChange } = this.state;
    return (
      <li>
        <button onClick={this.doneOnClick} className="doneBtn">
          {completed ? "Uncomplete" : "Complete"}
        </button>
        <Content
          completed={completed}
          content={content}
          nowOnChange={nowOnChange}
          editOnClick={this.editOnClick}
          contentSetter={this.contentSetter}
          nowOnChangeSetter={this.nowOnChangeSetter}
        />
        <button onClick={this.editOnClick} disabled={completed}>
          {!nowOnChange ? "Edit" : "Save"}
        </button>
        <button onClick={this.deleteOnClic}>Delete</button>
      </li>
    );
  }
}

export default Task;

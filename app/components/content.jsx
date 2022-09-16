import React from "react";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: this.props.content };
  }
  handleOnKeyUp = (e) => {
    const { value } = e.target;
    const { contentSetter, editOnClick, nowOnChangeSetter, content } =
      this.props;

    contentSetter(value);
    this.setState({ content: value });
    if (e.key === "Enter") {
      contentSetter(value);
      this.setState({ content: value });
      editOnClick();
    }
    if (e.key === "Escape") {
      this.setState({ content: content });
      nowOnChangeSetter();
    }
  };

  render() {
    const { nowOnChange, editOnClick, completed } = this.props;
    const { content } = this.state;
    return (
      <div>
        {!nowOnChange ? (
          <div
            className={completed ? "content done" : "content "}
            onClick={editOnClick}
          >
            {content}
          </div>
        ) : (
          <input
            type="text"
            defaultValue={content}
            onKeyUp={this.handleOnKeyUp}
          ></input>
        )}
      </div>
    );
  }
}

export default Content;

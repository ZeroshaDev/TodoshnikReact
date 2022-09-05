const React = require("react");
class Task extends React.Component {
  constructor(props) {
    super(props);
    this.state = { completed: "content" };
    this.doneOnClicke = this.doneOnClick.bind(this);
    this.editOnClick = this.editOnClick.bind(this);
    this.contentOnClick = this.contentOnClick.bind(this);
  }
  deleteOnClic(event) {
    event.target.parentNode.remove();
  }
  doneOnClick(event) {
    if (event.target.textContent === "Uncomplite") {
      event.target.textContent = "Complite";
      event.target.nextSibling.nextSibling.disabled = false;
    } else {
      event.target.textContent = "Uncomplite";
      event.target.nextSibling.nextSibling.disabled = true;
    }
    event.target.nextSibling.classList.toggle("done");
  }
  editOnClick(e) {
    if (e.target.previousSibling.classList.contains("content")) {
      const redBox = document.createElement("input");
      redBox.value = e.target.previousSibling.textContent;
      e.target.previousSibling.replaceWith(redBox);
      let memory = redBox.value;
      const btn = e.target;
      e.target.previousSibling.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          const event = new Event("click", { bubbles: true });
          btn.dispatchEvent(event);
        }
        if (e.key === "Escape") {
          e.target.value = memory;
          e.target.blur();
          const event = new Event("click", { bubbles: true });
          btn.dispatchEvent(event);
        }
      });
      e.target.textContent = "Save changes";
      e.target.previousSibling.previousSibling.disabled = true;
      e.target.nextSibling.disabled = true;
    } else {
      e.target.previousSibling.value = e.target.previousSibling.value.trim();
      if (e.target.previousSibling.value.length != 0) {
        const redContent = document.createElement("div");
        redContent.classList.add("content");
        redContent.textContent = e.target.previousSibling.value;
        // storage.edit(id, redContent.textContent)
        redContent.addEventListener("click", () => {
          const event = new Event("click", { bubbles: true });
          e.target.dispatchEvent(event);
        });
        e.target.previousSibling.replaceWith(redContent);
        e.target.textContent = "Change";
        e.target.previousSibling.previousSibling.disabled = false;
        e.target.nextSibling.disabled = false;
      } else {
        alert("Input something");
      }
    }
  }
  contentOnClick(e) {
    const event = new Event("click", { bubbles: true });
    e.target.nextSibling.dispatchEvent(event);
  }
  render() {
    if (this.props.completed === true) {
      this.setState({ completed: "content done" });
    }
    return (
      <li>
        <button onClick={this.doneOnClick} className="doneBtn">
          Complete
        </button>
        <div className={this.state.completed} onClick={this.contentOnClick}>
          {this.props.content}
        </div>
        <button onClick={this.editOnClick}>Edit</button>
        <button onClick={this.deleteOnClic}>Delete</button>
      </li>
    );
  }
}

module.exports = Task;

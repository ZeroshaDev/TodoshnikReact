import React from "react";
import Task from "./task.jsx";
//import Storage from "./storage.js";
import uuid from "react-uuid";
import Windowd from "./login/windowd.jsx";
import MyContext from "./MyContext.jsx";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
//const store = new Storage([], 0);

//добавить линтер(ESlint) и притиер

class Form extends React.Component {
  static contextType = MyContext;
  constructor(props) {
    super(props);
    this.state = {
      list: "",
      content: "",
      logined: true,
    };
  }
  handleRefresh = () => {
    console.log("refresh");
    this.setState({ list: "1" });
    // this.setState({
    //   list: this.context.store.storage,
    // });
  };
  handleClickAddBtn = () => {
    const { content } = this.state;
    if (content !== "") {
      this.context.store.add(uuid(), content, false);
      this.setState({ content: "" });
      this.handleRefresh();
    } else {
      alert("In field mast be some information");
    }
  };
  handleClickLogOutBtn = () => {
    this.setState({ logined: false });
    this.context.store.clear();
  };
  chengeLoginedOnTrue = () => {
    this.setState({ logined: true });
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

  loader = async () => {
    this.context.store.log();
    await this.context.store.load();
    this.handleRefresh();
  };
  render() {
    const { content } = this.state;
    return (
      <BrowserRouter>
        {this.context.store.token ? (
          <Routes>
            <Route
              path="/login"
              element={
                <div>
                  <Windowd
                    storage={this.context.store}
                    loader={this.loader}
                    chengeLoginedOnTrue={this.chengeLoginedOnTrue}
                  />
                </div>
              }
            />
            <Route
              path="/main"
              element={
                <div>
                  {!this.state.logined ? <Navigate to="/login"></Navigate> : ""}
                  <input
                    type="text"
                    placeholder="Input something"
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleChange}
                    value={content}
                  />
                  <button onClick={this.handleClickAddBtn}>Add</button>
                  <button onClick={this.handleClickLogOutBtn}>LogOut</button>
                  <ul>
                    <MyContext.Provider value={this.context}>
                      <MyContext.Consumer>
                        {({ store }) =>
                          store.storage.map((elem) => (
                            <Task
                              key={elem.id}
                              id={elem.id}
                              content={elem.content}
                              completed={elem.completed}
                              storage={store}
                              refresh={this.handleRefresh}
                            />
                          ))
                        }
                      </MyContext.Consumer>
                    </MyContext.Provider>
                  </ul>
                </div>
              }
            />
            <Route path="/error" element={<div>ERROR!!!</div>} />
            {this.context.store.token ? (
              ""
            ) : (
              <Route path="*" element={<Navigate to="/login"></Navigate>} />
            )}
          </Routes>
        ) : (
          <Routes>
            <Route
              path="/login"
              element={
                <div>
                  <Windowd
                    storage={this.context.store}
                    loader={this.loader}
                    chengeLoginedOnTrue={this.chengeLoginedOnTrue}
                  />
                </div>
              }
            />
            <Route path="*" element={<Navigate to="/login"></Navigate>} />
          </Routes>
        )}
      </BrowserRouter>
    );
  }
}

export default Form;

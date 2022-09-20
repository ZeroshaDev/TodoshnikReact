import React from "react";

class Windowd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { display: true,login:"", password: "" };
  }
  handleClickLogin = async () => {
    let token;
    await fetch(process.env.URL + "/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username:this.state.login,
        password:this.state.password
      }),
    }).then(function (response) {
      return response.json();
    })
    .then(function (data) {
      token = data;
    });
    this.props.storage.tokenSetter(token.token);
    this.setState({ display: false });
    this.props.loader();
  };
  handleClickRegister = async () => {
    let token;
    await fetch(process.env.URL + "/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username:this.state.login,
        password:this.state.password
      }),
    }).then(function (response) {
      return response.json();
    })
    .then(function (data) {
      token = data;
    });
    this.props.storage.tokenSetter(token.token);
    this.setState({ display: false });
    this.props.loader();
  };


  inputLogin=(e)=>{
    this.setState({login: e.target.value});
  };
  inputPassword=(e)=>{
    this.setState({password: e.target.value});
  };

  render() {
    return (
      <div className={this.state.display ? "modal" : "hidden"}>
        <div className="modalContent">
          <h2>Please authorizate for using app!</h2>
          <div className="modalInput">
            <input type="text" placeholder="Please enter your login" onChange={this.inputLogin}></input>
          </div>
          <div className="modalInput">
            <input type="text" placeholder="Please enter your password" onChange={this.inputPassword}></input>
          </div>
          <div className="modalInput">
            <button className="loginBtn" onClick={this.handleClickLogin}>
              Login
            </button>
            <button className="loginBtn" onClick={this.handleClickRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Windowd;

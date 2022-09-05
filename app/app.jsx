const ReactDOM = require("react-dom/client");
const React = require("react");
const Form=require("./components/form.jsx");
  
ReactDOM.createRoot(
    document.getElementById("app")
)
.render(
    <div>
        <Form/>
    </div>
);
import React from "react";
import ReactDOM from "react-dom";
import { withMemoize } from "../src";

const Input = ({ value, onChange, name }) => {
  console.log("rendered:", name);
  return (
    <div>
      <input value={value} onChange={e => onChange(e.target.value)} />
    </div>
  );
};

const MemoInput = withMemoize(Input);

const Drawer = ({ inputs }) => {
  return (
    <div>
      {inputs.map((input, idx) => (
        <React.Fragment key={idx}>{input}</React.Fragment>
      ))}
    </div>
  );
};

const App = () => {
  const [data, setData] = React.useState({});

  const getProps = name => {
    return {
      name,
      value: data[name] || "",
      onChange: data => setData(prev => ({ ...prev, [name]: data }))
    };
  };
  return (
    <Drawer
      inputs={[
        <Input {...getProps("first")} />,
        <Input {...getProps("second")} />,
        <MemoInput {...getProps("third")} />,
        <MemoInput {...getProps("fourth")} />
      ]}
    />
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

module.hot.accept();

import { useState } from "react";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(formatPhNumber(event.target.value));
  };

  return (
    <>
      <input
        type="tel"
        value={value}
        onChange={onChange}
        placeholder="(+65) 9999 9999"
      />
      <button onClick={() => setValue("")} disabled={value.length === 0}>
        X
      </button>
    </>
  );
}

export default App;

const formatPhNumber = (phNumberRaw: string) => {
  // remove non digits
  // format the ph number

  let output = "";
  // capital D: non digits, small d: digits
  const str = phNumberRaw.replace(/[^\d+]/g, "");

  // formatting
  if (str.length > 0) {
    output += "(";
    // Note that substring fn will not include the char at 3 in the output
    output += str.substring(0, 3);
  }

  if (str.length > 3) {
    output += ") ";
    output += str.substring(3, 7);
  }

  if (str.length > 7) {
    output += " ";
    // After 11 rest of the strings will be ignored
    output += str.substring(7, 11);
  }
  return output;
};

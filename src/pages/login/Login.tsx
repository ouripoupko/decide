import { ChangeEvent, useState } from "react";
import styles from "./Login.module.scss"

export default function Login() {
    console.log('rendering login')
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([] as string[]);

  // Sample suggestions
  const options = ["https://gdi.gloki.contact"];

  // Handle input change
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      setSuggestions(
        options.filter((option) =>
          option.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setSuggestions([]);
  };

  return (
    <div className={styles["login-container"]}>
      <div>gloKi: {"tester"}</div>
      <button>Create</button>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Start typing..."
      />
      {suggestions.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 0,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            backgroundColor: "white",
            border: "1px solid #ccc",
            maxHeight: "150px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{
                padding: "8px",
                cursor: "pointer",
                backgroundColor: "#f9f9f9",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#eee")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#f9f9f9")
              }
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <button>Login</button>
    </div>
  );
}

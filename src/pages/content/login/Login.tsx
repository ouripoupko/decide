import { ChangeEvent, useState } from "react";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";

function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch (e) {
    return false;
  }
}

export default function Login() {
  const [gloki, setGloki] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([] as string[]);
  const navigate = useNavigate();

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

  const generateGloki = () => {
    const pad = new Uint8Array(32);
    crypto.getRandomValues(pad);
    setGloki(
      Array.from(pad, (value) => value.toString(16).padStart(2, "0")).join("")
    );
  };

  const login = () => {
    if (gloki.length > 2 && isValidUrl(inputValue)) {
      localStorage.setItem("server", inputValue);
      localStorage.setItem("agent", gloki);
      const redirectTo =
        sessionStorage.getItem("redirectAfterLogin") || "/main";
      sessionStorage.removeItem("redirectAfterLogin");
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <div className={styles["login-container"]}>
      <div>gloKi: {gloki}</div>
      <button onClick={generateGloki}>Create</button>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Start typing..."
      />
      {suggestions.length > 0 && (
        <ul>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
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
      <button onClick={login}>Login</button>
    </div>
  );
}

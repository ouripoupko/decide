// Login.tsx
import { ChangeEvent, useState } from "react";
import styles from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import Header from "src/pages/containers/gdiMain/header/Header";


const toggleMenu = () => {
  console.log("click");
};

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

  const options = ["https://gdi.gloki.contact"];

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
      const redirectTo = sessionStorage.getItem("redirectAfterLogin") || "/main";
      sessionStorage.removeItem("redirectAfterLogin");
      navigate(redirectTo, { replace: true });
    }
  };

  return (
      <div className={styles.loginContainer}>
        <Header onMenuToggle={toggleMenu} />
        <div className={styles.topElement}>
          <div className={styles.logo}>Welcome</div>
          <button className={styles.createButton} onClick={generateGloki}>
            Create
          </button>
          <div className={styles.glokiId}>{gloki}</div>
        </div>

        <div className={styles.inputSection}>
          <div className={styles.title}>Enter server:</div>
          <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="e.g. https://gdi.gloki.contact"
          />
          {suggestions.length > 0 && (
              <ul className={styles.suggestions}>
                {suggestions.map((suggestion, index) => (
                    <li
                        key={index}
                        onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </li>
                ))}
              </ul>
          )}
          <button className={styles.loginButton} onClick={login}>
            Login
          </button>
        </div>

        <div className={styles.bottomElement}>
          <div className={styles.footer}></div>
          <div className={styles.footerOutline}></div>
        </div>
      </div>
  );
}
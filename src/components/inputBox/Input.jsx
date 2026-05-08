import { useTheme } from "../../context/Appearance";
import "./Input.css";

export default function Input({ value, onChange }) {

  const { theme } = useTheme();

  return (
    <div
      className={`search-container mb-2 ${
        theme ? "light-input" : "dark-input"
      }`}
    >

      <i className="fa-solid fa-magnifying-glass search-icon"></i>

      <input
        type="text"
        value={value}
        onChange={onChange}
        className="search-input"
        placeholder="Search"
      />

      {value && (
        <i
          className="fa-solid fa-xmark clear-btn"
          onClick={() => onChange({ target: { value: "" } })}
        ></i>
      )}

    </div>
  );
}
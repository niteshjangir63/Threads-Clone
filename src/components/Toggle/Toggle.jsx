import { useTheme } from "../../context/Appearance";
import "./Toggle.css";

export default function Toggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`threads-toggle ${theme ? "light" : "dark"}`}
      onClick={toggleTheme}
    >
      <div className="threads-circle"></div>
    </button>
  );
}
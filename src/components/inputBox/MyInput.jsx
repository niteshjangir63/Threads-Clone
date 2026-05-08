import { useTheme } from "../../context/Appearance";

export default function MyInput({
  value,
  onChange,
  onKeyDown,
  placeholder = "Add comments",
}) {

  const { theme } = useTheme();

  return (
    <input
      type="text"
      className={`order-0 bg-transparent border-0 w-100 ml-auto mt-auto ${
        theme ? "text-dark" : "text-light"
      }`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      style={{
        outline: "none",
        boxShadow: "none",
      }}
    />
  );
}
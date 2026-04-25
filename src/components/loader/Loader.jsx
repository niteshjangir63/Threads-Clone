export default function Loader({ size = "sm", color = "white" }) {
  return (
    <div
      className={`spinner-border spinner-border-${size}`}
      role="status"
      style={{ color }}
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}
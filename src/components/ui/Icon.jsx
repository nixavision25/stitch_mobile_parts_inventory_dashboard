export default function Icon({ name, className = "", size }) {
  const style = size ? { fontSize: size } : undefined;
  return (
    <span className={`material-symbols-outlined ${className}`} style={style} aria-hidden="true">
      {name}
    </span>
  );
}

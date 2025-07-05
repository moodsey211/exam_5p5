import "./spinner.css";

export default function Spinner() {
  return (
    <div className="fallback-spinner">
      <div className="loading component-loader">
        <div className="effect-1 effects" />
        <div className="effect-2 effects" />
        <div className="effect-3 effects" />
      </div>
    </div>
  );
}
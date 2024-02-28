import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-slate-100/35 backdrop-blur-md">
      <div className="spinner"></div>
    </div>
  );
};
export default LoadingSpinner;

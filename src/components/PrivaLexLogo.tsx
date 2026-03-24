const PrivaLexLogo = ({ className = "", variant = "default" }: { className?: string; variant?: "default" | "white" }) => {
  return (
    <div className={className}>
      <img
        src="/Logo/12.png"
        alt="PrivaLex Advisory"
        style={{
          height: "44px",
          width: "auto",
          filter: variant === "white" ? "brightness(0) invert(1)" : "none",
        }}
      />
    </div>
  );
};

export default PrivaLexLogo;

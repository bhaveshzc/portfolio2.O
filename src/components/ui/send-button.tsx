import React from "react";
import "./send-button.css";

interface SendButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  submitted?: boolean;
  text?: string;
  type?: "submit" | "button" | "reset";
  className?: string;
}

export const Button: React.FC<SendButtonProps> = ({
  submitted = false,
  text = "Send",
  type = "submit",
  className = "",
  ...props
}) => {
  return (
    <div className={`send-btn-wrapper ${className}`}>
      <button
        type={type}
        className={`send-airplane-btn ${submitted ? "is-submitted" : ""}`}
        disabled={submitted}
        {...props}
      >
        <div className="svg-wrapper-1 flex items-center">
          <div className={`svg-wrapper flex items-center ${submitted ? "airplane-glide-flight" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={22}
              height={22}
              className="airplane-svg origin-center"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              />
            </svg>
          </div>
        </div>

        {!submitted ? (
          <span className="btn-text-content">{text}</span>
        ) : (
          <span className="btn-sent-content flex items-center gap-1.5">
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sent-check-icon"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Sent!</span>
          </span>
        )}
      </button>
    </div>
  );
};

export default Button;
export { Button as SendButton };

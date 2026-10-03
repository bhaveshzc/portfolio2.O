import "./send-button.css";

const Button = ({
  submitted = false,
  text = "Send",
  type = "submit",
  className = "",
  ...props
}) => {
  return (
    <div className={`send-btn-wrapper ${className}`}>
      <button type={type} className="send-airplane-btn" {...props}>
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={22}
              height={22}
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              />
            </svg>
          </div>
        </div>
        <span className="btn-text-content">
          {submitted ? "Sent!" : text}
        </span>
      </button>
    </div>
  );
};

export default Button;
export { Button as SendButton };

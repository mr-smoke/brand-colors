import { getContrast } from "../helpers";

const CopyNotification = ({ color }) => {
  return (
    <div
      className="copy-notification"
      style={{
        backgroundColor: `#${color}`,
        color: `${getContrast(color)}`,
      }}
    >
      <p>Copied to clipboard</p>
    </div>
  );
};

export default CopyNotification;

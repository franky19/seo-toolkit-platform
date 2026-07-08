
import React from "react";

interface CopyButtonProps {
  textToCopy: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ textToCopy }) => {
  const handleClick = () => {
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <button onClick={handleClick}>Copy</button>
  );
};

export default CopyButton;

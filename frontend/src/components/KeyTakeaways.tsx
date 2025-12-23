import React from 'react';

type KeyTakeawaysProps = {
  takeaways?: string[];
};

const KeyTakeaways: React.FC<KeyTakeawaysProps> = ({
  takeaways = [
    "Key concept summary from this chapter",
    "Important connections to other modules",
    "Practical applications of the concepts"
  ]
}) => {
  return (
    <div className="key-takeaways">
      <h3>Key Takeaways</h3>
      <ul>
        {takeaways.map((takeaway, index) => (
          <li key={index}>{takeaway}</li>
        ))}
      </ul>
    </div>
  );
};

export default KeyTakeaways;
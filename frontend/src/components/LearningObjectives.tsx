import React from 'react';

type LearningObjectivesProps = {
  objectives?: string[];
};

const LearningObjectives: React.FC<LearningObjectivesProps> = ({
  objectives = [
    "Understand the key concepts covered in this chapter",
    "Apply the concepts to practical robotic scenarios",
    "Identify the connections to previous and future modules"
  ]
}) => {
  return (
    <div className="learning-objectives">
      <h3>Learning Objectives</h3>
      <ul>
        {objectives.map((objective, index) => (
          <li key={index}>{objective}</li>
        ))}
      </ul>
    </div>
  );
};

export default LearningObjectives;
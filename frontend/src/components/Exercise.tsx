import React from 'react';

type ExerciseProps = {
  title?: string;
  description?: string;
};

const Exercise: React.FC<ExerciseProps> = ({
  title = "Hands-on Exercise",
  description = "Apply the concepts learned in this chapter by completing the following exercise."
}) => {
  return (
    <div className="exercise">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="exercise-content">
        <p>Try implementing a simple example related to the concepts covered in this chapter.</p>
        <p>Consider how these concepts connect to previous modules and how they might be used in future applications.</p>
      </div>
    </div>
  );
};

export default Exercise;
import React from 'react';

interface BackgroundSurveyProps {
  formData: {
    softwareBackgroundLevel: string;
    hardwareBackgroundLevel: string;
  };
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const BackgroundSurvey: React.FC<BackgroundSurveyProps> = ({ formData, onChange }) => {
  return (
    <div className="background-survey">
      <h3>Tell Us About Your Background</h3>
      <p>This helps us personalize your learning experience.</p>

      <div className="survey-questions">
        <div className="question-group">
          <label htmlFor="softwareBackgroundLevel">
            <strong>Software Background:</strong> How would you rate your experience with programming and software development?
          </label>
          <select
            id="softwareBackgroundLevel"
            name="softwareBackgroundLevel"
            value={formData.softwareBackgroundLevel}
            onChange={onChange}
          >
            <option value="beginner">Beginner - Just starting out or learning the basics</option>
            <option value="intermediate">Intermediate - Some experience, comfortable with basic concepts</option>
            <option value="advanced">Advanced - Experienced developer with deep knowledge</option>
          </select>
        </div>

        <div className="question-group">
          <label htmlFor="hardwareBackgroundLevel">
            <strong>Hardware Background:</strong> How would you rate your experience with physical hardware, robotics, or electronics?
          </label>
          <select
            id="hardwareBackgroundLevel"
            name="hardwareBackgroundLevel"
            value={formData.hardwareBackgroundLevel}
            onChange={onChange}
          >
            <option value="beginner">Beginner - Little to no experience with hardware</option>
            <option value="intermediate">Intermediate - Some experience with electronics or robotics</option>
            <option value="advanced">Advanced - Experienced with hardware design and implementation</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default BackgroundSurvey;
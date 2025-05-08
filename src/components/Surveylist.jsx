import React from 'react';

export default function SurveyList({ surveys, deleteSurvey }) {
  if (surveys.length === 0) {
    return <p className="text-black-500 text-[20px] text-sm">No surveys created yet.</p>;
  }

  return (
    <div >
      <h2 className="text-xl font-semibold mb-2">Surveys Created</h2>
      <ul>
        {surveys.map((survey) => (
          <li
            key={survey.id}
            className="border p-3 mb-2 rounded flex justify-between"
          >
            <div>
              <h3 className="font-bold mb-1 text-[35px]">{survey.name}</h3>
              <p>Age: {survey.age}</p>
              <p>Mobile: {survey.mobile}</p>
              <p>Address: {survey.address}</p>
              <p>Village: {survey.village}</p>
              <p>Occupation: {survey.occupation}</p>
            </div>
            <button
              onClick={() => deleteSurvey(survey.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 h-fit"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

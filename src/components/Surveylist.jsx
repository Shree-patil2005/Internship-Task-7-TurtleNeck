import React, { useState, useEffect } from 'react';

export default function SurveyList({ surveys, deleteSurvey, startEdit }) {
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState('');

  useEffect(() => {
    if (deleteSuccessMessage) {
      const timer = setTimeout(() => {
        setDeleteSuccessMessage('');
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [deleteSuccessMessage]);

  const handleDelete = (id) => {
    deleteSurvey(id);
    setDeleteSuccessMessage('Survey deleted successfully!');
  };

  if (surveys.length === 0) {
    return <p className="text-black-500 text-[20px] text-sm">No surveys created yet.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Surveys Created</h2>
      {deleteSuccessMessage && <p className="mb-2 font-semibold text-red-500">{deleteSuccessMessage}</p>}
      <ul>
        {surveys.map((survey) => (
          <li
            key={survey.id}
            className="border p-3 mb-2 rounded flex justify-between items-center"
          >
            <div>
              <h3 className="font-bold mb-1 text-[35px]">{survey.name}</h3>
              <p>Age: {survey.age}</p>
              <p>Mobile: {survey.mobile}</p>
              <p>Address: {survey.address}</p>
              <p>Village: {survey.village}</p>
              <p>Occupation: {survey.occupation}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => startEdit(survey)}
                className="bg-yellow-500 text-black px-3 py-1 rounded hover:bg-yellow-700 h-fit"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(survey.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 h-fit"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
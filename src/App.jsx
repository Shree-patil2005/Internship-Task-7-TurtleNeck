import React, { useState } from 'react';
import SurveyForm from './components/Survey';
import SurveyList from './components/Surveylist';

function App() {
  const [surveys, setSurveys] = useState([]);
  const addSurvey = (survey) => setSurveys([...surveys, survey]);
  const deleteSurvey = (id) => setSurveys(surveys.filter((s) => s.id !== id));

  return (
    <> 
      <header className="text-center mb-6 bg-blue-500 p-2 w-full">
        <h1 className="text-[50px] font-bold text-white">PESONAL INFO SURVEY</h1>
        <p className="text-[30px] text-white"> YOUR INPUTS WILL HELP US TO MANAGE THE PUBLICITY</p>
      </header>
      <div className="max-w-xl mx-auto p-2"> 
        <SurveyForm addSurvey={addSurvey} />
        <SurveyList surveys={surveys} deleteSurvey={deleteSurvey} />
      </div>
      <footer className="text-center p-3 bg-blue-500 text-white text-[20px] text-sm">
        &copy; 2025 Personal Info Survey. All Rights Reserved.
      </footer>
    </>
  );
}

export default App;

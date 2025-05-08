import React, { useState, useEffect } from 'react';

export default function SurveyForm({
  addSurvey,
  editSurvey,
  surveyToEdit,
  clearSurveyToEdit,
  surveys, 
}) {
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [village, setVillage] = useState('');
  const [occupation, setOccupation] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (surveyToEdit) {
      setFirstName(surveyToEdit.name.split(' ')[0] || '');
      setMiddleName(surveyToEdit.name.split(' ')[1] || '');
      setLastName(surveyToEdit.name.split(' ').slice(2).join(' ') || '');
      setAge(String(surveyToEdit.age));
      setMobile(surveyToEdit.mobile);
      setAddress(surveyToEdit.address);
      setVillage(surveyToEdit.village);
      setOccupation(surveyToEdit.occupation);
      setSuccessMessage(''); 
    } else {
      setFirstName('');
      setMiddleName('');
      setLastName('');
      setAge('');
      setMobile('');
      setAddress('');
      setVillage('');
      setOccupation('');
      setSubmitted(false);
      setSuccessMessage(''); 
    }
  }, [surveyToEdit]);

  const handleSave = () => {
    setSubmitted(true);

    let hasError = false;

    if (!firstName) hasError = true;
    if (!lastName) hasError = true;
    if (!age || isNaN(Number(age)) || Number(age) < 0 || age.length > 3) hasError = true;
    if (!mobile || isNaN(Number(mobile)) || mobile.length < 10 || mobile.length > 12) hasError = true;
    if (!address) hasError = true;
    if (!village) hasError = true;
    if (!occupation) hasError = true;

    if (hasError) {
      setSuccessMessage(''); 
      return;
    }

    const updatedSurvey = {
      id: surveyToEdit ? surveyToEdit.id : Date.now(),
      name: `${firstName} ${middleName} ${lastName}`.trim(),
      age: parseInt(age),
      mobile: mobile,
      address,
      village,
      occupation,
    };

    
    if (!surveyToEdit && surveys.some((s) => s.name === updatedSurvey.name && s.mobile === updatedSurvey.mobile)) {
      setSuccessMessage('Error: This survey has already been submitted.');
      return;
    }

    if (surveyToEdit) {
      editSurvey(updatedSurvey); 
      clearSurveyToEdit();
      setSuccessMessage('Survey saved successfully!');
    } else {
      addSurvey(updatedSurvey);
      setSuccessMessage('Survey created successfully!');
    }

    setFirstName('');
    setMiddleName('');
    setLastName('');
    setAge('');
    setMobile('');
    setAddress('');
    setVillage('');
    setOccupation('');
    setSubmitted(false);
  };

  const handleCancel = () => {
    setFirstName('');
    setMiddleName('');
    setLastName('');
    setAge('');
    setMobile('');
    setAddress('');
    setVillage('');
    setOccupation('');
    setSubmitted(false);
    clearSurveyToEdit();
    setSuccessMessage('Action cancelled successfully!');
  };

  const getInputClassName = (baseClass, hasError) => {
    return `${baseClass} ${submitted && hasError ? 'border-red-500' : ''}`;
  };

  return (
    <div className="mb-6 border p-4 rounded">
      {successMessage && <p className={`mb-2 font-semibold ${successMessage.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>{successMessage}</p>}
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={getInputClassName("w-1/3 p-2 border rounded", !firstName)}
          required
        />
        <input
          type="text"
          placeholder="Middle Name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
          className={getInputClassName("w-1/3 p-2 border rounded", !middleName)}
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={getInputClassName("w-1/3 p-2 border rounded", !lastName)}
          required
        />
      </div>
      <div className="mb-2">
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => {
            if (e.target.value.length <= 3) {
              setAge(e.target.value);
            }
          }}
          className={getInputClassName(
            "w-full p-2 border rounded",
            !age || isNaN(Number(age)) || Number(age) < 0 || age.length > 3
          )}
          maxLength={3}
          required
        />
      </div>
      <div className="mb-2">
        <input
          type="number"
          placeholder="Mobile Number"
          value={mobile}
          onChange={(e) => {
            if (e.target.value.length <= 12) {
              setMobile(e.target.value);
            }
          }}
          className={getInputClassName(
            "w-full p-2 border rounded",
            !mobile || isNaN(Number(mobile)) || mobile.length < 10 || mobile.length > 12
          )}
          required
        />
      </div>
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className={getInputClassName("w-full p-2 mb-2 border rounded", !address)}
        required
      />
      <input
        type="text"
        placeholder="Village Name"
        value={village}
        onChange={(e) => setVillage(e.target.value)}
        className={getInputClassName("w-full p-2 mb-2 border rounded", !village)}
        required
      />
      <input
        type="text"
        placeholder="Occupation"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
        className={getInputClassName("w-full p-2 mb-2 border rounded", !occupation)}
        required
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded block mx-auto ${
            surveyToEdit ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-green-500 hover:bg-green-700 text-white'
          }`}
          type="submit"
        >
          {surveyToEdit ? 'Save' : 'Create'}
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 block mx-auto"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
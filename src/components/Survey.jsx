import React, { useState } from 'react';

export default function SurveyForm({ addSurvey }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [village, setVillage] = useState('');
  const [occupation, setOccupation] = useState('');

  const handleCreate = () => {
    if (!name || !age || !mobile || !address || !village || !occupation) {
      alert('Please fill in all fields.');
      return;
    }

    const newSurvey = {
      id: Date.now(),
      name,
      age,
      mobile,
      address,
      village,
      occupation,
    };

    addSurvey(newSurvey);
    setName('');
    setAge('');
    setMobile('');
    setAddress('');
    setVillage('');
    setOccupation('');
  };

  const handleCancel = () => {
    setName('');
    setAge('');
    setMobile('');
    setAddress('');
    setVillage('');
    setOccupation('');
  };

  return (
    <div className="mb-6 border p-4 rounded">
      <input
        type="text"
        placeholder="Enter your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="Enter your Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="Mobile Number"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="Enter your Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="Name of your Village"
        value={village}
        onChange={(e) => setVillage(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="text"
        placeholder="Enter your Occupation"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <div className="flex gap-2 mt-2">
        <button
          onClick={handleCreate}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 block mx-auto"
        >
          Create
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

import React, { useState, useEffect } from 'react';

const NotesFetcher = () => {
  const [branch, setBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [noteUrl, setNoteUrl] = useState('');


  const branches = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'];
  const semesters = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];
  const subjects = {
    'Computer Science': ['Data Structures', 'Algorithms', 'Database Management'],
    'Electrical Engineering': ['Circuit Theory', 'Digital Electronics', 'Power Systems'],
    'Mechanical Engineering': ['Thermodynamics', 'Fluid Mechanics', 'Machine Design'],
  };

  
  const fetchNoteUrl = (branch, semester, subject) => {
    
    return `https://drive.google.com/file/d/EXAMPLE_FILE_ID/preview`;
  };

  useEffect(() => {
    if (branch && semester && subject) {
      const url = fetchNoteUrl(branch, semester, subject);
      setNoteUrl(url);
    }
  }, [branch, semester, subject]);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
     
      <div className="w-full md:w-1/4 bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-4">Select Notes</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Branch</label>
          <select 
            value={branch} 
            onChange={(e) => setBranch(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select Branch</option>
            {branches.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Semester</label>
          <select 
            value={semester} 
            onChange={(e) => setSemester(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select Semester</option>
            {semesters.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Subject</label>
          <select 
            value={subject} 
            onChange={(e) => setSubject(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select Subject</option>
            {branch && subjects[branch]?.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      
      <div className="w-full md:w-3/4 p-6">
        {noteUrl ? (
          <iframe 
            src={noteUrl}
            className="w-full h-full border-0 rounded-lg shadow-lg"
            title="Notes Viewer"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a branch, semester, and subject to view notes.
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesFetcher;
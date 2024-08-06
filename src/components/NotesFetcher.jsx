import React, { useState, useEffect, useMemo } from 'react';

// Loader component to display a spinning loader animation
const Loader = () => (
  <div 
    style={{
      border: '5px solid #f3f3f3',
      borderTop: '5px solid #8b5cf6',
      borderRadius: '50%',
      width: '30px',
      height: '30px',
      animation: 'spin 1s linear infinite',
    }}
  />
);

// URL mapping object for notes
const notesData = {
  'Computer Science': {
    '1st': {
      'Data Structures': 'https://drive.google.com/file/d/1SS5MaD4KCwUohBHeCVRUV7ObYm3YsUhy/preview',
      'Algorithms': 'https://drive.google.com/file/d/1UmAMexnm7l8hQhWWSg32KFW4qAfiSbSn/preview',
    },
    '2nd': {
      'Database Management': 'https://drive.google.com/file/d/19ewOImi4XGOfRDDXwxU5Zf-Hyh6bxH9K/preview',
    },
  },
  'Electrical Engineering': {
    '1st': {
      'Circuit Theory': 'https://drive.google.com/file/d/1PHhkQmGfSbfFzsp1Wel8gzrWwwbz2cEz/preview',
    },
    '2nd': {
      'Digital Electronics': 'https://drive.google.com/file/d/1ojxmEW0msFeWQpDVXW7tZVY7u-dGqPoj/preview',
    },
  },
  'Mechanical Engineering': {
    '1st': {
      'Thermodynamics': 'https://drive.google.com/file/d/1vn8V8RmCMwCRteqajccIpEP2I-kYu5_r/preview',
    },
    '2nd': {
      'Fluid Mechanics': 'https://drive.google.com/file/d/1ktOkT33TEtnVeq34ee3a0_ND2aFkJVWo/preview',
    },
  },
};

// Main NotesFetcher component
const NotesFetcher = () => {
  const [branch, setBranch] = useState(''); // Selected branch
  const [semester, setSemester] = useState(''); // Selected semester
  const [subject, setSubject] = useState(''); // Selected subject
  const [noteUrl, setNoteUrl] = useState(''); // URL for fetched notes
  const [currentStep, setCurrentStep] = useState(1); // Step tracking
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Mock data for dropdown options
  const branches = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering'];
  const semesters = ['1st', '2nd']; // Reduced options to 2 semesters

  // Function to fetch the note URL
  const fetchNoteUrl = (branch, semester, subject) => {
    setLoading(true); // Set loading state
    setError(null); // Clear any previous errors
    try {
      // Retrieve URL from the notesData object
      const url = notesData[branch]?.[semester]?.[subject] || null;
      if (!url) throw new Error('Notes are currently being prepared and will be available soon.');
      return url;
    } catch (err) {
      setError(err.message); // Set error message
      return null;
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Handle "Get Notes" button click
  const handleGetNotes = () => {
    if (branch && semester && subject) {
      const url = fetchNoteUrl(branch, semester, subject); // Fetch notes URL
      setNoteUrl(url); // Set fetched notes URL
    }
  };

  // Update current step based on selected branch, semester, and subject
  useEffect(() => {
    if (branch) setCurrentStep(2);
    if (semester) setCurrentStep(3);
    if (subject) setCurrentStep(4);
  }, [branch, semester, subject]);

  // Memoized function to get subject options based on selected branch
  const subjectOptions = useMemo(() => {
    return branch ? Object.keys(notesData[branch]?.[semester] || {}) : [];
  }, [branch, semester]);

  // Render a select box with provided options and labels
  const renderSelectBox = (label, value, setter, options, disabled = false) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <select 
          value={value} 
          onChange={(e) => setter(e.target.value)}
          disabled={disabled}
          className={`
            block w-full px-3 py-2 text-base 
            border rounded-full shadow-sm 
            focus:outline-none focus:ring-2 focus:ring-purple-500 
            ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-gray-200 cursor-pointer'}
            text-gray-800
          `}
        >
          <option value="">Select {label}</option>
          {options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        {value && value !== '' && (
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-purple-500">
            ✓
          </span>
        )}
      </div>
    </div>
  );

  // Render each step in the process
  const renderStep = (stepNumber, title, content) => (
    <div className="mb-6">
      <div className={`step mb-2 ${currentStep === stepNumber ? 'text-purple-600 font-semibold' : 'text-gray-500'}`}>
        {title}
      </div>
      {content}
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900">
      {/* Sidebar with gradient background */}
      <div className="w-full md:w-1/3 p-6 shadow-md overflow-y-auto"
        style={{
          background: 'linear-gradient(-130deg, rgba(267,153,230,1) 4%, rgba(238,181,152,1) 30%, rgba(237,232,244,1) 60%)'
        }}
      >
        <div className="mb-6">
          <p className="text-3xl text-gray-800 font-Roca">All of your notes in one place</p>
        </div>
        
        {renderStep(1, "Select your branch", renderSelectBox("Branch", branch, setBranch, branches))}
        
        {branch && renderStep(2, "Choose semester", renderSelectBox("Semester", semester, setSemester, semesters))}
        
        {semester && renderStep(3, "Pick a subject", renderSelectBox("Subject", subject, setSubject, subjectOptions))}
        
        {currentStep === 4 && (
          <div className="text-green-700 font-medium mt-4 p-3 bg-green-200 bg-opacity-80 rounded-lg">
            Great! Your notes are ready to fetch.
          </div>
        )}

        {error && (
          <div className="mt-4 p-3 bg-yellow-200 bg-opacity-80 text-yellow-700 rounded-lg">
            <p className="font-semibold">Hang tight!</p>
            <p>We're currently working on these notes. They will be available soon. Thanks for your patience!</p>
          </div>
        )}

        <div className="mt-8">
          <button 
            className="w-full bg-purple-600 text-white py-3 rounded-full font-medium hover:bg-purple-700 transition duration-300 flex items-center justify-center"
            onClick={handleGetNotes}
            disabled={loading || !(branch && semester && subject)}
          >
            {loading ? <Loader /> : "Get Notes"}
          </button>
        </div>
      </div>

      {/* Main content area */}
      <div className="w-full md:w-2/3 p-6 bg-gray-900 flex items-center justify-center relative">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <Loader />
          </div>
        ) : noteUrl ? (
          <iframe 
            src={noteUrl}
            className="w-full h-full border-0 rounded-lg shadow-lg"
            title="Notes Viewer"
            allow="fullscreen"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 animate-pulse">
            <div className="text-6xl mb-4">📄</div>
            {currentStep < 4 ? (
              `Complete Step ${currentStep} to proceed.`
            ) : (
              'Select a branch, semester, and subject, then click "Get Notes".'
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotesFetcher;

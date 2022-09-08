import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AllMeats from './components/AllMeats';
import CreateMeet from './components/CreateMeet';
import EditMeet from './components/EditMeet';
import InfoMeet from './components/InfoMeet';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AllMeats />} />
        <Route path="/create" element={<CreateMeet />} />
        <Route path="/edit" element={<EditMeet />} />
        <Route path="/info" element={<InfoMeet />} />
      </Routes>
    </div>
  );
}

export default App;

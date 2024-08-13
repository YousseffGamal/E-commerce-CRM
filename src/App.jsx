import React, { useState } from 'react';
import { AuthProvider } from './store/authContext';
import './App.css';

import AppRouter from './Router';

function App() {
  return (
    <AuthProvider>
        <AppRouter />
    </AuthProvider>
  )
  


}

export default App;


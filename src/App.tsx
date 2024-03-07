import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import './App.scss';
import PlainForm from './components/PlainForm';
import ReactHookForm from './components/ReactHookForm';

function App() {
  return (
    <div className="container">
      <PlainForm />
      <ReactHookForm />
    </div>
  );
}

export default App;

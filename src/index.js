import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Loggedin from './middleware/Loggedin';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from './components/navbar';
import Login from './Login';
import Subscription from './Subscription';
import Register from './Register';
import { FilterContextProvider } from './context/filterContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Chat from './Chat';
import Profile from './Profile';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <GoogleOAuthProvider clientId="87856424688-nhil5aauafjgorqfrnt432sf2gg66a4k.apps.googleusercontent.com">
              
      <FilterContextProvider>
        <NavBar>
          <Routes>
            {/* Protected Routes */}
            <Route path="/" element={<Loggedin />}>
              <Route index element={<App />} />
              <Route path="subscription" element={<Subscription />} />
              <Route path="chat" element={<Chat />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* Public Routes */}
           
            <Route path="/login" element={<Login />} />
             
            <Route path="/register" element={<Register />} />
            
          </Routes>
        </NavBar>
      </FilterContextProvider>
      </GoogleOAuthProvider>
    </Router>
  </React.StrictMode>
);

reportWebVitals();

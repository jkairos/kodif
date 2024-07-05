import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Terminal from './Terminal';
import Login from './Login';
import { AuthProvider } from '../contexts/AuthContext';
import './App.css';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Terminal} />
                </Switch>
            </Router>
        </AuthProvider>
    );
};

export default App;

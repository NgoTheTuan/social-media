import Home from './pages/Home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import Messenger from './pages/messenger/Messenger';

import RequireAuth from './components/requireAuth/RequireAuth';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Home />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/profile/:userId"
                    element={
                        <RequireAuth>
                            <Profile />
                        </RequireAuth>
                    }
                />
                <Route
                    path="/messenger"
                    element={
                        <RequireAuth>
                            <Messenger />
                        </RequireAuth>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;

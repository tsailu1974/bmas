import { useNavigate  } from 'react-router-dom';
import './LoginPage.css';
import React, { useState } from 'react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');
    const navigate = useNavigate();
    const handleLogin = async (e) =>  {
        e.preventDefault();
        setError('');
        setLoading(true);

        try{
            const response = await fetch(`${REACT_APP_JWT_AUTH_API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username, password}),
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }

            const data = await response.json();

            localStorage.setItem('token', data.token);
            alert('login successful');

            navigate('/app');

        } catch (err){
            setError(err.message);
        } finally {
            setLoading(false);
          }
    };

    return (
        <div className="login-container">
          <h3 className="login-title">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>User Name</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="error">{error}</div>}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      );

}

export default LoginPage;
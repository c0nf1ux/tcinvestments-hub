import React, { useState } from 'react';
import './LoginRegister.css';

const LoginRegister = ({ onLogin }) => {
 const [isLogin, setIsLogin] = useState(true);
 const [formData, setFormData] = useState({
   username: '',
   email: '',
   password: '',
   firstName: '',
   lastName: ''
 });
 const [isLoading, setIsLoading] = useState(false);
 const [error, setError] = useState('');

 const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

 const handleSubmit = async (e) => {
   e.preventDefault();
   setIsLoading(true);
   setError('');

   try {
     const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(formData)
     });

     const data = await response.json();

     if (response.ok) {
       localStorage.setItem('brainstorm_token', data.token);
       localStorage.setItem('brainstorm_user', JSON.stringify(data.user));
       onLogin(data.user);
     } else {
       setError(data.message || 'Authentication failed');
     }
   } catch (err) {
     setError('Connection failed. Please try again.');
   } finally {
     setIsLoading(false);
   }
 };

 const handleChange = (e) => {
   setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 return (
   <div className="auth-container">
     <div className="auth-card">
       <h2>{isLogin ? 'Login to Brainstorm' : 'Join Brainstorm'}</h2>
       
       <div className="auth-tabs">
         <button 
           className={isLogin ? 'active' : ''}
           onClick={() => setIsLogin(true)}
         >
           Login
         </button>
         <button 
           className={!isLogin ? 'active' : ''}
           onClick={() => setIsLogin(false)}
         >
           Register
         </button>
       </div>

       <form onSubmit={handleSubmit}>
         {!isLogin && (
           <>
             <div className="form-row">
               <input
                 type="text"
                 name="firstName"
                 placeholder="First Name"
                 value={formData.firstName}
                 onChange={handleChange}
                 required
               />
               <input
                 type="text"
                 name="lastName"
                 placeholder="Last Name"
                 value={formData.lastName}
                 onChange={handleChange}
                 required
               />
             </div>
             <input
               type="text"
               name="username"
               placeholder="Username"
               value={formData.username}
               onChange={handleChange}
               required
             />
           </>
         )}
         
         <input
           type="email"
           name="email"
           placeholder="Email"
           value={formData.email}
           onChange={handleChange}
           required
         />
         
         <input
           type="password"
           name="password"
           placeholder="Password"
           value={formData.password}
           onChange={handleChange}
           required
         />

         {error && <div className="error-message">{error}</div>}

         <button type="submit" disabled={isLoading} className="auth-submit">
           {isLoading ? ' Processing...' : (isLogin ? ' Login' : ' Create Account')}
         </button>
       </form>

       <div className="auth-benefits">
         <h4> Premium Features:</h4>
         <ul>
           <li> Portfolio tracking up to $1M+</li>
           <li> Advanced analytics & predictions</li>
           <li> Real-time price alerts</li>
           <li> Mobile scanning & OCR</li>
           <li> Community leaderboards</li>
         </ul>
       </div>
     </div>
   </div>
 );
};

export default LoginRegister;

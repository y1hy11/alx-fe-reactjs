import { useState } from 'react';

const RegistrationForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const validateForm = () => {
        const newErrors = {};

    if (!username) {
        newErrors.username = 'Username is required';
    }
    
    if (!email) {
        newErrors.email = 'Email is required';
    }
    
    if (!password) {
        newErrors.password = 'Password is required';
    }
        
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        
        if (Object.keys(validationErrors).length === 0) {
            console.log('Form submitted:', { username, email, password });
            setUsername('');
            setEmail('');
            setPassword('');
            setErrors({});
        } else {
            setErrors(validationErrors);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={handleChange}
                />
                {errors.username && <span style={{color: 'red'}}>{errors.username}</span>}
            </div>

            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
            </div>

            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                />
                {errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
            </div>

            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import auth from '../auth-service/auth';
import SignUp from './SignUp';

// login page component for user and admin login and registration
const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const clearParamters = () => {
        setEmail(""); // Clear the email input
        setPassword(""); // Clear the password input
    }

    // Function to handle form submission for login and registration to the backend
    const onSubmit = async (e) => {
        e.preventDefault();

        const data = {email, password };
        const url = "http://127.0.0.1:5000/login"; // URL for the login endpoint
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        const response = await fetch(url, options) ;
        if (response.status == 200) { // Successful login
            const data = await response.json();
            if (data.isAdmin) {
                clearParamters();
                auth.setAdminAuthenticated(true); // Set the admin authenticated status
                navigate("/Admin"); // Redirect to Admin page if the user is an admin
            }
            else {
                clearParamters();
                auth.setUserAuthenticated(true); // Set the user authenticated status
                navigate("/Thanks"); // Redirect to Thanks page if the user is not an admin
            }
        } else if (response.status == 401 || response.status == 404) { // unsuccessful login
            alert("Unsuccessful login. \ntry again");
            clearParamters();
        }
    }

    // Render the login form with input fields for email and password
    // and button for signup form
    return (
    <div>
        <h1>Login Page</h1>
        <form onSubmit={onSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input 
                    type="text"
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input 
                    type="password"
                    id="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">{"Login"}</button>
        </form>
        <SignUp /> {/* for registration */}
    </div>
    )
}

export default LoginPage;
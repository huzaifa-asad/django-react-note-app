
import Form from "../components/Form";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <div className="note-create-panel" style={{
                margin: 0,
                minWidth: 400,
                maxWidth: 520,
                width: '100%',
                borderRadius: 22,
                boxShadow: '0 4px 32px #10121a55'
            }}>
                <h2>Register</h2>
                <Form route="/api/user/register/" method="register" />
                <div style={{marginTop: 32, textAlign: 'center'}}>
                    <span style={{color: '#b3b8c5', fontSize: '1rem'}}>
                        Already have an account?{' '}
                        <span
                            className="note-auth-link"
                            style={{color: '#7ecfff', cursor: 'pointer', textDecoration: 'underline', fontWeight: 600}}
                            onClick={() => navigate('/login')}
                        >
                            Login here
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Register;
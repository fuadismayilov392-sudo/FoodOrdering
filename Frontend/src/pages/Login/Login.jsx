import { useState , useContext} from "react";
import {useNavigate } from "react-router-dom";
import {AuthContext} from "../../Context/AuthContext";

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
    e.preventDefault();
  
    };


    const handleSumbit = async (e) => {
        e.preventDefault();
        setError('');
        try{
            await login(email , password);
            navigate("/");

        } catch(err){
            setError(err.response?.data?.error || "Xəta baş verdi");
        }
    };

    return(
    <form onSubmit={handleSumbit}>
      <h2>Giriş</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Şifrə" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Daxil ol</button>
    </form>
    );

}

export default Login;
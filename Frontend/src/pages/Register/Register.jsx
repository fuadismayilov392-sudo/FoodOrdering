import {useState , useContext} from "react";
import { useNavigate} from "react-router-dom";
import {AuthContext} from "../../Context/AuthContext.jsx";

function Register() {
    const [name , setName] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [ error , setError] = useState('');
    const {register} = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSumbit = async (e) =>{
        e.preventDefault();
        setError('');
        try{
            await register(name , email ,password);
            navigate('/');
        } catch(err){
            setError(err.response?.data?.error || 'Xəta baş verdi');

        }

    };

    return(
        <form onSubmit = {handleSumbit}>
            <h2>Qeydiyyat</h2>
            {error && <p style={{color:'red'}}>{error}</p>}
            <input type = 'text' placeholder="AD" value ={name} onChange={(e) => setName(e.target.value)} required/>
            <input type = 'email' placeholder="Email" value = {email} onChange={(e) => setEmail(e.target.value)} required/>
            <input type = 'password' placeholder="Şifrə" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type = 'sumbit' >Qeydiyyatdan keç</button>
        </form>
    );


}

export default Register;
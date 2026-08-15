import { createContext , useState} from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export function AuthProvider({ children}){
    const [user , setUser] = useState(() =>{
        const saved = localStorage.getItem('user');
        try{
            return saved ? JSON.parse(saved) : null;
        } catch (err){
            console.log("JSON parse xətası",err);
            return null;
        }
    });

const register = async (name , email , password) => {
    const res = await axios.post("http://localhost:5000/auth/register" , {name , email , password});
    localStorage.setItem("token" , res.data.token);
    localStorage.setItem("user" , JSON.stringify(res.data.user));
    setUser(res.data.user);
};

const login = async (email , password) =>{
    const res = await axios.post('http://localhost:5000/auth/login', {email , password});
    localStorage.setItem("token" , res.data.token);
    localStorage.setItem("user" , JSON.stringify(res.user));
    setUser(res.data.user);
};

const logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
};

return (
    <AuthContext.Provider value = {{user , register , login , logout }}>
        {children}
    </AuthContext.Provider>

);


}
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import axios from 'axios';
import { Rings } from  'react-loader-spinner';

import logo from '../../assets/logo-trackit.png'
import UserContext from '../../contexts/UserContext';

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const {setImage, setToken} = useContext(UserContext);
    const [disable, setDisable] = useState(false);

    function login(event){
        event.preventDefault();
        setDisable(true);
        const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login';
        const promise = axios.post(URL, {
            email,
            password
        });

        promise.then(response => {
            const {data} = response;
            setImage(data.image);
            setToken(data.token);
            navigate('/hoje');
        });

        promise.catch(erro => {
            alert('Houve um erro no Login! '+ erro.response.status);
            setDisable(false);
        })
    }

    return !disable ? (
        <LoginScreen >
            <img className='logo' src={logo} alt='TrackIt Logo' />
            <h1>TrackIt</h1>
            <form onSubmit={login}  >
                <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" placeholder='senha' value={password} onChange={(e) => setPassword(e.target.value)}  required />
                <button type="submit" >Entrar</button>
            </form>
            <Link to="/cadastro"><p>Não tem uma conta? Cadastre-se!</p></Link>
        </LoginScreen>
    ):(
        <LoginScreen disabled = {disable}>
            <img className='logo' src={logo} alt='TrackIt Logo' />
            <h1>TrackIt</h1>
            <form onSubmit={login}  >
                <input type="email" disabled placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input type="password" disabled placeholder='senha' value={password} onChange={(e) => setPassword(e.target.value)}  required />
                <button type="submit" disabled ><Rings color="#FFFFFF"  width={30} /><Rings color="#FFFFFF"  width={30} /><Rings color="#FFFFFF"  width={30} /></button>
            </form>
            <Link to="/cadastro"><p>Não tem uma conta? Cadastre-se!</p></Link>
        </LoginScreen>
    )
}

const LoginScreen = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Lexend Deca', sans-serif;

    img{
        height: 100px;
        width: 180px;
        margin-top: 68px;
    }
    h1{
        color: #126BA5;
        font-size: 68.982px;
        margin-bottom: 33px;
        font-family: 'Playball', cursive;
    }
    form{
        display: flex;
        flex-direction: column;
        width: 330px;
    }

    form input{
        height: 45px;
        background: #FFFFFF;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        margin-bottom: 6px;
        font-size: 20.976px;
        font-family: 'Lexend Deca', sans-serif;
        padding: 10px;
        opacity: ${props => props.disabled ? '0.5' : '1'};
    }
    input::placeholder{  
        padding-left: 1px;
        color: #DBDBDB;
    }

    form button{
        height: 45px;
        background: #52B6FF;
        border-radius: 4.63636px;
        border: none;
        color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;
        font-size: 20.976px;
        font-family: 'Lexend Deca', sans-serif;
        opacity: ${props => props.disabled ? '0.7' : '1'};
    }
    p{
        color: #52B6FF;
        text-decoration-line: underline;
        font-size: 14px;
    }
`


// font-family: 'Lexend Deca', sans-serif;
// font-family: 'Playball', cursive;
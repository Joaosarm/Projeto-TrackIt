import { Link } from 'react-router-dom'
import styled from 'styled-components';

import logo from '../../assets/logo-trackit.png'

export default function Register(){
    return(
        <RegisterScreen>
            <img className='logo' src={logo} alt='TrackIt Logo' />
            <h1>TrackIt</h1>
            <form>
                <input type="email" placeholder='email' id="email" name="email" />
                <input type="password" placeholder='senha' id="pass" name="password"  required />
                <input type="text" placeholder='nome' id="name" name="name" />
                <input type="url" placeholder='foto' id="image" name="image" />
                <button type="submit">Cadastrar</button>
            </form>
            <Link to="/"><p>Já tem uma conta? Faça login!</p></Link>
        </RegisterScreen>
    )
}

const RegisterScreen = styled.section`
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
    }
    input::placeholder{  
        padding-left: 11px;
        color: #DBDBDB;
    }

    form button{
        height: 45px;
        background: #52B6FF;
        border-radius: 4.63636px;
        border: none;
        color: #FFFFFF;
        margin-bottom: 25px;
        font-size: 20.976px;
        font-family: 'Lexend Deca', sans-serif;
    }
    p{
        color: #52B6FF;
        text-decoration-line: underline;
        font-size: 14px;
    }
`
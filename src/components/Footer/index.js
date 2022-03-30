import styled from 'styled-components';
import { Link } from 'react-router-dom';


export default function Footer(){
    return(
        <AppHeader>
            <Link to={'/habitos'}>Hábitos</Link>
            <Link to={'/historico'}>Histórico</Link>
        </AppHeader>
    )
}

const AppHeader = styled.header`
    position: fixed;
    bottom: 0;
    left: 0;
    height: 34px;
    padding: 22px 30px;
    width: calc(100% - 60px);
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    background: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    a:link{
        color: #52B6FF;
        text-decoration: none;
    }
`
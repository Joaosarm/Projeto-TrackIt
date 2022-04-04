import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useContext } from 'react';
import { buildStyles } from 'react-circular-progressbar';

import 'react-circular-progressbar/dist/styles.css';
import UserContext from '../../contexts/UserContext';


export default function Footer(){
    const {percentage} = useContext(UserContext); 
    return(
        <AppHeader>
            <Link to={'/habitos'}>Hábitos</Link>
            <Link to={'/hoje'} style={{ width: 91, height: 130 }}>
            <CircularProgressbar
            value={percentage}
            text={`Hoje`}
            background
            backgroundPadding={6}
            styles={buildStyles({
            backgroundColor: "#52B6FF",
            textColor: "#fff",
            pathColor: "#fff",
            trailColor: "transparent"
            })}
      />
            </Link>
            <Link to={'/historico'}>Histórico</Link>
        </AppHeader>
    )
}

const AppHeader = styled.footer`
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



{/* <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        background
        backgroundPadding={6}
        styles={buildStyles({
          backgroundColor: "#3e98c7",
          textColor: "#fff",
          pathColor: "#fff",
          trailColor: "transparent"
        })}
      /> */}
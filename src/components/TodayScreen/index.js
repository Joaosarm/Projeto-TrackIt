import styled from "styled-components";
import { useContext } from "react";

import Header from "../Header";
import Footer from "../Footer";
import UserContext from "../../contexts/UserContext";
import { useState } from "react/cjs/react.development";


export default function TodayScreen(){
    const {token} = useContext(UserContext);
    const [todayHabits, setTodayHabits] = useState([])
    const [color, setColor] = useState('#EBEBEB');
    console.log('token = ' + color);

    // function montarHabitos(){
    //     if(todayHabits.length> 0){
    //         return todayHabits.map(habit =>{

    //         })
    //     }
    // }

    function changeColor(){
        if(color === '#EBEBEB'){
            setColor('#8FC549');
        } else{
            setColor('#EBEBEB');
        }
    }


    return(
        <Today>
            <Header />
                <Title color = '#BABABA' >
                    <h2>DIA, 00/00</h2>
                    <h3>Nenhum hábito concluido</h3>
                </Title>
                <Habit color = {color}>
                    <div>
                        <h4>Ler 1 capítulo de livro</h4>
                        <p>Sequência atual: 3 dias</p>
                        <p>Seu recorde: 5 dias</p>
                    </div>
                    <ion-icon onClick={() => changeColor()} name="checkbox"></ion-icon>
                </Habit>
            <Footer />
        </Today>
    )
}

const Today = styled.section`
    height: 100vh;
    width: 100vw;
    background-color: #F2F2F2;
    display:flex;
    flex-direction: column;
    align-items: center;
`

const Habit = styled.article`
    height: 68px;
    width: 314px;
    background: #FFFFFF;
    border-radius: 5px;
    color: #666666;
    font-family: 'Lexend Deca', sans-serif;
    padding: 13px;
    display:flex;
    position: relative;
    align-items: center;

    h4{
        font-size: 20px;
        margin-bottom: 10px;
    }
    p{
        font-size: 13px;
        margin-bottom:3px;
    }
    ion-icon{
        font-size: 75px;
        position: absolute;
        right: 7px;
        color: ${props => props.color}
    }
`

const Title = styled.article`
    margin-top: 98px;
    text-align: left;
    width: 340px;
    margin-bottom: 28px;
    font-family: 'Lexend Deca', sans-serif;

    h2{
        color: #126BA5;
        font-size: 23px;
    }

    h3{
        color: ${props => props.color};
        margin-top: 2px;
    }
`
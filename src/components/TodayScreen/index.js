import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";

import Header from "../Header";
import Footer from "../Footer";
import UserContext from "../../contexts/UserContext";


export default function TodayScreen(){
    const {token} = useContext(UserContext);
    const {percentage, setPercentage} = useContext(UserContext);
    const dateNumber = dayjs().format('DD/MM');
    const dayNumber = dayjs().format('d');
    const [todayHabits, setTodayHabits] = useState([])
    let done = [];
    let contador = 0;

    useEffect(() => update(), []);

    function update(){
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today';
        const promise = axios.get(URL,config);
        promise.then(response => {
            const {data} = response;
            setTodayHabits(data);
        })
        promise.catch(erro => alert(erro));
    }


    function montarHabitos(){
        if(todayHabits.length> 0){
            return todayHabits.map((habit, index) =>{
                if(habit.currentSequence === habit.highestSequence&&habit.currentSequence!==0){
                    return(
                    <Habit key={index} >
                        <div>
                            <h4>{habit.name}</h4>
                            <p>Sequência atual:<font color='#8FC549'>  {habit.currentSequence} dias </font></p>
                            <p>Seu recorde: <font color='#8FC549'>  {habit.highestSequence} dias </font></p>
                        </div>
                        {checkHabit(habit.id, habit.done)}
                    </Habit>
                )}else{
                    return (
                    <Habit key={index} >
                        <div>
                            <h4>{habit.name}</h4>
                            <p>Sequência atual: <font color='#666666'>  {habit.currentSequence} </font> dias</p>
                            <p>Seu recorde: <font color='#666666'>  {habit.highestSequence} dias </font></p>
                        </div>
                        {checkHabit(habit.id, habit.done)}
                    </Habit>)
                }
            })
        }
    }

    function checkHabit(id, selected){
        if (selected) done.push(id);
        contador++;
        if (contador === todayHabits.length) updatePercentage();
        return(
            <CheckButton selected={selected} ><ion-icon key={id} onClick={() => toggleDone(id, selected)} name="checkbox"></ion-icon></CheckButton>
        )
    }

    function updatePercentage(){
        setPercentage(parseInt((done.length/todayHabits.length)*100));
    }

    function toggleDone(id, selected){
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        if(!selected) {
            done.push(id);
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`;
            const promise = axios.post(URL, {}, config);
            promise.then(() => {
                update();
                updatePercentage();
            });
            promise.catch(erro => alert(erro));
        } else {
            const newSelected = done.filter(day => day !== id);
            done = newSelected;
            updatePercentage()
            const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`;
            const promise = axios.post(URL, {}, config);
            promise.then(() => {
                update();
                updatePercentage();
            });
            promise.catch(erro => alert(erro));
        }
    }

    function dateName(){
        switch(dayNumber){
            case '0':
                return 'Domingo';
            case '1':
                return 'Segunda';
            case '2':
                return 'Terça';
            case '3':
                return 'Quarta';
            case '4':
                return 'Quinta';
            case '5':
                return 'Sexta';
            case '6':
                return 'Sábado';
            default:
                return 'Inválido';
        }
    }


    return percentage === 0 ?(
        <Today>
            <Header />
                <Title color = '#BABABA' >
                    <h2>{dateName()}, {dateNumber}</h2>
                    <h3>Nenhum hábito concluido</h3>
                </Title>
                <HabitsofTheDay>
                    {montarHabitos()}
                </HabitsofTheDay>
            <Footer />
        </Today>
    ):(
        <Today>
            <Header />
                <Title color = '#8FC549' >
                    <h2>{dateName()}, {dateNumber}</h2>
                    <h3>{percentage}% dos hábitos concluídos</h3>
                </Title>
                <HabitsofTheDay>
                    {montarHabitos()}
                </HabitsofTheDay>
            <Footer />
        </Today>
    )
}

const Today = styled.section`
    min-height: 100vh;
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
    margin-bottom: 10px;

    h4{
        font-size: 20px;
        margin-bottom: 10px;
    }
    p{
        font-size: 13px;
        margin-bottom:3px;
        
    }
`

const HabitsofTheDay = styled.div`
    padding-bottom: 100px;
`

const CheckButton = styled.div`
    ion-icon{
        font-size: 75px;
        position: absolute;
        right: 7px;
        top: 11px;
        color: ${props => props.selected ? '#8FC549' : '#EBEBEB'}
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
        margin-top: 4px;
    }
`
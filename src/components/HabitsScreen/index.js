import styled from "styled-components";
import { useState, useContext, useEffect } from "react";
import { FallingLines, Rings } from  'react-loader-spinner';

import UserContext from "../../contexts/UserContext";
import Header from "../Header";
import Footer from "../Footer";
import axios from "axios";

export default function HabitsScreen(){
    const [habitList, setHabitList] = useState([]);
    const [addNewHabit,setAddNewHabit] = useState(false);
    const daysButton = ['D','S','T','Q','Q','S','S','D'];
    const [selectedDays, setSelectedDays] = useState([]);
    const [habitName, setHabitName] = useState('');
    const [disable, setDisable] = useState(false);
    

    const {token} = useContext(UserContext);

    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';
        const promise = axios.get(URL,config);
        promise.then(response => {
            const {data} = response;
            setHabitList(data);
        })
        promise.catch(erro => alert(erro));
    }, []);

    function showHabits(){
        if (habitList.length > 0){
            return habitList.map(habit =>{
                const {id, name, days} = habit;
                return (
                <Habit key = {id}>
                    <h3>{name}</h3>
                    <ion-icon onClick={() => deleteHabit(id)} name="trash-outline"></ion-icon>
                    <Days>
                        {daysButton.map((day, index) => habitDays(day, index, days))}
                    </Days>
                </Habit>)
            })
        } else{
            return (
                <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
            )
        }
    }

    function habitDays(day, index, days){
        const selected = days.some(day => day === index);
        return(
            <DayButton key={index} selected={selected}>{day}</DayButton>
        )
    }

    function NewHabitInput(){
        return disable ? (
        <NewHabit disabled = {disable}>
            <input disabled type='text' placeholder='nome do hábito' value={habitName} onChange={(e) => setHabitName(e.target.value)}/>
            <Days>
                {daysButton.map((day, index) => buttons(day, index))}
            </Days>
            <button disabled className="cancel" onClick={() => setAddNewHabit(false)}>Cancelar</button>
            <button disabled onClick={createNewHabit} className="save"><Rings color="#FFFFFF"  width={20} /><Rings color="#FFFFFF"  width={20} /><Rings color="#FFFFFF"  width={20} /></button>
        </NewHabit>
        ):(
            <NewHabit >
            <input  type='text' placeholder='nome do hábito' value={habitName} onChange={(e) => setHabitName(e.target.value)}/>
            <Days>
                {daysButton.map((day, index) => buttons(day, index))}
            </Days>
            <button className="cancel" onClick={() => setAddNewHabit(false)}>Cancelar</button>
            <button onClick={createNewHabit} className="save">Salvar</button>
        </NewHabit>
        )
    }

    function buttons(day, index){
        const selected = selectedDays.some(day => day === index);
        return(
            <DayButton disabled = {disable ? "disabled" : ""} key={index} selected={selected} onClick={() => toggleDay(index)}>{day}</DayButton>
        )
    }

    function toggleDay(index){
        const selected = selectedDays.some(day => day === index);
        if(!selected) {
            setSelectedDays([...selectedDays, index]);
        } else {
        const newSelected = selectedDays.filter(day => day !== index);
        setSelectedDays(newSelected);
        }
    }

    function createNewHabit(){
        setDisable(true);
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';
        if(habitName === '') {
            alert('Faltou escrever o hábito!!');
            setDisable(false);
        }
        else if(selectedDays.length===0) {
            alert('Faltou selecionar os dias!!');
            setDisable(false);
        }
        else{
        const promise = axios.post(URL,{
            name: habitName,
            days: selectedDays
        }, config);
        promise.then(response => {
            const {data} = response;
            setHabitList([...habitList, data]);
            setHabitName('');
            setDisable(false);
            setAddNewHabit(false);
            setSelectedDays([]);
        })
        promise.catch(erro =>{ 
            alert(erro);
            setDisable(false);
        });}
    }

    function deleteHabit(id){
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`;
        const certain = window.confirm('Você quer mesmo deletar esse hábito?');
        if (certain){
            const promise = axios.delete(URL, config);
            promise.then(response => {
                setHabitList([...habitList].filter(habit => habit.id !== id));
            })
            promise.catch(erro => alert(erro));
        }
    }


    return addNewHabit ? (
        <HabitsPage>
            <Header />
                <Title>
                    <h2>Meus hábitos</h2>
                    <ion-icon  name="duplicate"></ion-icon>
                </Title>
                    {NewHabitInput()}
                <Habits>
                    {showHabits()}
                </Habits>
            <Footer />
        </HabitsPage>
    ):(
        <HabitsPage>
            <Header />
                <Title>
                    <h2>Meus hábitos</h2>
                    <ion-icon onClick={() => setAddNewHabit(true)} name="duplicate"></ion-icon>
                </Title>
                <Habits>
                    {showHabits()}
                </Habits>
            <Footer />
        </HabitsPage>
    )
}

const Title = styled.article`
    margin-top: 95px;
    text-align: left;
    width: 340px;
    margin-bottom: 10px;
    font-family: 'Lexend Deca', sans-serif;
    display: flex;
    align-items: center;

    h2{
        color: #126BA5;
        font-size: 23px;
    }

    ion-icon{
        color: #52B6FF;
        font-size: 35px;
        margin-left: 150px;
    }
`

const HabitsPage = styled.section`
    min-height: 100vh;
    width: 100vw;
    background-color: #F2F2F2;
    display:flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Lexend Deca', sans-serif;
    

    p{
        padding: 18px;
        font-size: 18px;
        color: #666666;
    }
`

const Habits = styled.div`
    padding-bottom: 100px;
`

const NewHabit = styled.article`
    min-height: 180px;
    width: 340px;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin-top: 3px;
    margin-bottom: 20px;

    input{
        font-family: 'Lexend Deca', sans-serif;
        margin-top: 18px;
        font-size: 20px;
        padding: 11px;
        height: 45px;
        width: 303px;
        border: 1px solid #D5D5D5;
        box-sizing: border-box;
        border-radius: 5px;
        opacity: ${props => props.disabled ? '0.7' : '1'};
    }

    button{
        font-size: 19px;
        display: flex;
        height: 35px;
        max-width: 84px;
        align-items: center;
        justify-content: center;
        font-family: 'Lexend Deca', sans-serif;
        opacity: ${props => props.disabled ? '0.7' : '1'};
    }

    .cancel{
        background: transparent;
        border: none;
        color: #52B6FF;
        position: absolute;
        bottom: 21px;
        right: 123px;
    }

    .save{
        background: #52B6FF;
        border-radius: 4.63636px;
        border: none;
        color: #FFFFFF;
        padding: 5px 15px;
        position: absolute;
        bottom: 17px;
        right: 16px;
    }
`

const Days = styled.div`
    width: 303px;
    display: flex;
    font-family: 'Lexend Deca', sans-serif;
`

const DayButton = styled.button`
    font-size: 20px;
    margin-right: 4px;
    margin-top: 8px;
    border: 1px solid #D5D5D5;
    box-sizing: border-box;
    border-radius: 5px;
    height: 30px;  
    background: ${props => props.selected ? '#DBDBDB' : '#FFFFFF'};
    color: ${props => props.selected ? '#FFFFFF' : '#DBDBDB'};
`

const Habit = styled.article`
    height: auto;
    width: 295px;
    background: #FFFFFF;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-top: 3px;
    padding: 13px 30px 13px 15px;
    font-size: 19px;

    h3{
        overflow: hidden;
        color: #666666;
        margin-bottom: 6px;
        margin-top: 2px;
    }
    ion-icon{
        position: absolute;
        right: 10px;
        top: 11px;
        color: #666666;
        font-size: 20px;
    }
`
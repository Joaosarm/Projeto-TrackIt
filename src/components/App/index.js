import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Login from "../Login";
import Register from "../Register";
import HabitsScreen from "../HabitsScreen";
import TodayScreen from "../TodayScreen";
import History from "../History";
import UserContext from "../../contexts/UserContext";

export default function App(){
    const [image, setImage] = useState('');
    const [token, setToken] = useState('');
    return(
        <UserContext.Provider value={{ image, setImage, token, setToken }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element ={<Login/>} />
                    <Route path='/cadastro' element ={<Register/>} />
                    <Route path='/habitos' element ={<HabitsScreen/>} />
                    <Route path='/hoje' element ={<TodayScreen/>} />
                    <Route path='/historico' element ={<History/>} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    )
}
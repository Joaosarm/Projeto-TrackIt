import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../Login";
import Register from "../Register";
import HabitsScreen from "../HabitsScreen";
import TodayScreen from "../TodayScreen";
import History from "../History";

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element ={<Login/>} />
                <Route path='/cadastro' element ={<Register/>} />
                <Route path='/habitos' element ={<HabitsScreen/>} />
                <Route path='/hoje' element ={<TodayScreen/>} />
                <Route path='/historico' element ={<History/>} />
            </Routes>
        </BrowserRouter>
    )
}
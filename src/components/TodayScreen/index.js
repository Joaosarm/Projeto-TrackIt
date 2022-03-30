import styled from "styled-components";

import Header from "../Header";
import Footer from "../Footer";


export default function TodayScreen(){
    return(
        <Today>
            <Header />
            
            <Footer />
        </Today>
    )
}

const Today = styled.section`
    height: 100vh;
    width: 100vw;
    background-color: #E5E5E5;
`
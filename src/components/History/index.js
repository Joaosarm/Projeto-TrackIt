import styled from "styled-components"

import Header from "../Header";
import Footer from "../Footer";

export default function History(){
    return (
        <HistoryPage>
            <Header />
            <Title><h2>Histórico</h2></Title>
            <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
            <Footer />
        </HistoryPage>
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
`

const HistoryPage = styled.section`
    height: 100vh;
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
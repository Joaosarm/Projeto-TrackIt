import styled from 'styled-components';

import fota from '../../assets/fota.webp'


export default function Header(){
    return(
        <AppHeader>
            <h1>TrackIt</h1>
            <img src={fota} alt='User'/>
        </AppHeader>
    )
}

const AppHeader = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    height: 50px;
    width: calc(100% - 36px);
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    font-family: 'Playball', cursive;
    font-size: 39px;
    color: #FFFFFF;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 18px;

    img{
        height: 51px;
        width: 51px;
        border-radius: 98.5px;
    }
`
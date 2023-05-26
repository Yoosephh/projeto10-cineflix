import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import axios from "axios"
import { Route, Routes, BrowserRouter } from "react-router-dom"
import React from "react"

export default function App() {
    axios.defaults.headers.common['Authorization'] = 'oeo6PR6eeMEhAS8MNcbBRwIB';
    const [seatNum, setSeatNum] = React.useState([]);
    const [seatsID, setSeatsID] = React.useState([]);
    const [name, setName] = React.useState("");
    const [cpf, setCPF] = React.useState("");
    console.log(seatNum)
    return (
        <BrowserRouter>

            <NavContainer>CINEFLEX</NavContainer>

            <Routes>

                <Route path="/" element={<HomePage  />} />
                <Route path={`/sessoes/:idFilme/`} element={<SessionsPage />} />
                <Route path={`/assentos/:idSessao/`} element={<SeatsPage seatNum={seatNum} setSeatNum={setSeatNum} name={name} setName={setName} cpf={cpf} setCPF={setCPF} seatsID={seatsID} setSeatsID={setSeatsID}/>} />
                <Route path="/sucesso" element={<SuccessPage cpf={cpf} name={name} seatNum={seatNum}/>} />
                
            </Routes>

        </BrowserRouter>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`

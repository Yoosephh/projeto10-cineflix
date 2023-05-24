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
    const [filmID, setFilmID] = React.useState("")
    const [sessionID, setSessionID] = React.useState("")
    return (
        <BrowserRouter>

            <NavContainer>CINEFLEX</NavContainer>

            <Routes>

                <Route path="/" element={<HomePage filmID={filmID} setFilmID={setFilmID} />} />
                <Route path={`/sessoes/${filmID}/`} element={<SessionsPage filmID={filmID} sessionID={sessionID} setSessionID={setSessionID}/>} />
                <Route path="/assentos/idSessao/" element={<SeatsPage />} />
                <Route path="/sucesso/" element={<SuccessPage />} />
                
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

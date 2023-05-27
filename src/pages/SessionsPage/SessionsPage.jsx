import axios from "axios"
import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom";
import styled from "styled-components"

let divHorarios;
export default function SessionsPage({setSessionID}) {
    const parametros = useParams()
    const [sessions, setSessions] = React.useState([])

    useEffect(() =>{
        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${parametros.idFilme}/showtimes`)
        .then((resp) => {
            setSessions(() => {return resp.data})
        })

        .catch((erro) =>{
            console.log(erro.data)
        })}, [parametros.idFilme])
        
        if (sessions && sessions.days) {
            divHorarios = sessions.days.map((item, index) => {
                return(
                    <SessionContainer key={index} data-test="movie-day">
                    {item.weekday} - {item.date}
                        <ButtonsContainer>
                            {item.showtimes.map((itens)=> {
                                return (
                                    <Link data-test="showtime"
                                    key={itens.id}
                                    onClick={() => setSessionID(itens.id)}
                                    to={`/assentos/${itens.id}`}>
                                        <button >{itens.name}</button>
                                    </Link>
                                )
                            })}
                        </ButtonsContainer>
                    </SessionContainer>
                ) ;
            });
        }

    return (
        <PageContainer>
            Selecione o horário
            <div>
                {divHorarios}
            </div>

            <FooterContainer data-test="footer">
                <div>
                    <img src={sessions.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{sessions.title}</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
    div {
        margin-top: 20px;
    }
`
const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        letter-spacing: 0.02em;
        height: 45px;
        width: 80px;
        color: #FFFFFF;
        background: #E8833A;
        border-radius: 3px;
        border: 1px solid #9EADBA;
        cursor: pointer;
    }
    a {
        text-decoration: none;
    }
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;
    background: #DFE6ED;
    border: 1px solid #9EADBA;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`
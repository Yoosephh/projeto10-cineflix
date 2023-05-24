import styled from "styled-components"
import axios from "axios"
import React, { useEffect } from "react";
import { Link } from "react-router-dom";


export default function HomePage({filmID, setFilmID}) {
    let divFilmes;
    function GeraFilmes(){
        
        const [filme, setFilme] = React.useState([])
        useEffect(() =>{
        axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies")
        .then((resp) => {
            setFilme(() => {return resp.data})
            
        })
        .catch((erro) =>{
            console.log(erro.data)
        })}, [])
        const returnFilmes = [...filme]
        console.log(returnFilmes)
        divFilmes = returnFilmes.map(item =>{
            
            return(
                <Link 
                onClick={() => setFilmID(()=> {return item.id})} 
                key={item.id} 
                to={`/sessoes/${item.id}`}>
                    <MovieContainer >
                        <img src={item.posterURL}/>
                    </MovieContainer>
                </Link>
                )
        })       
    }
    
    GeraFilmes()
    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {divFilmes}
            </ListContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`
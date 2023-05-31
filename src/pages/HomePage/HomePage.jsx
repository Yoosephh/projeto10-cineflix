import styled from "styled-components"
import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    const [filmes, setFilmes] = useState([]);
    useEffect(() =>{
        axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies")
        .then((resp) => {
            setFilmes(resp.data)})

        .catch((erro) =>{
            console.log(erro.data)})}

            , [])

    function RenderizaFilmes(){
        
        if(filmes.length){
        return filmes.map(item =>{
            return(
                <Link 
                key={item.id} 
                to={`/sessoes/${item.id}`}>
                    <MovieContainer  data-test="movie">
                        <img src={item.posterURL}/>
                    </MovieContainer>
                </Link>
                )
        })} 
        return <img src="https://cineflex-hardh7xm0-thalesgomest.vercel.app/static/media/loading.961a48fb.gif" alt="carregando" width={64}/>     
    }
    
    return (
        <PageContainer>
            Selecione o filme
            <ListContainer>
                {RenderizaFilmes()}
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
    justify-content: center;
    align-items: center;
    height: calc(100vh - 160px);
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
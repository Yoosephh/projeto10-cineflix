import axios from "axios"
import React,{ useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import styled from "styled-components"
import SeatItems from "./SeatsItems"

export default function SeatsPage({seatsID, setSeatsID, cpf, setCPF, name, setName, setSeatNum, seatNum}) {
    const [seats, setSeats] = React.useState([])
    const parametros = useParams()

    const navigate = useNavigate();

    useEffect(() =>{
        axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametros.idSessao}/seats`)
        .then((resp) => {
            setSeats(() => {return resp.data})
        })
        .catch((erro) =>{
            console.log(erro.data)
        })}, [parametros.idSessao])

        let footerContainer = "";
        if(seats.movie){
            footerContainer = (
            <FooterContainer>
                <div>
                    <img src={seats.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{seats.movie.title}</p>
                    <p>{seats.day.weekday} - {seats.name}</p>
                </div>
            </FooterContainer>
        )
    }
    function submitForm(event){
        event.preventDefault();
        
        const newPost = {
        ids: seatsID,
        name: name,
        cpf: cpf
        }

        if(newPost.ids.length > 0) {
            if(cpf.length === 11){
                axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", newPost)
                .then(()=> {
                    navigate('/sucesso')
                })
                .catch(erro => {
                    console.log(erro.response)
                })
            }else alert('Por favor, digite seu cpf (11 digitos)')
        }else alert('Por favor, selecione um assento')
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)
            
            <SeatsContainer>
                <SeatItems seats={seats.seats} seatsID={seatsID} setSeatsID={setSeatsID} seatNum={seatNum} setSeatNum={setSeatNum}/>
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle className="selecionado" />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle className="disponivel" />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle className="indisponivel" />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                <form onSubmit={submitForm}>
                    <label htmlFor="nome">Nome do Comprador:</label>
                    <input placeholder="Digite seu nome..." 
                    name="nome" 
                    type="text" 
                    required
                    id="nome"
                    value={name}
                    onChange={e => setName(e.target.value)} />

                    <label htmlFor="cpf">CPF do Comprador:</label>
                    <input placeholder="Digite seu CPF..." 
                    name="CPF" 
                    required 
                    type="number"
                    id="cpf"
                    value={cpf}
                    onChange={e => setCPF(e.target.value)}/>

                    <button type="submit">Reservar Assento(s)</button>
                </form>
            </FormContainer>

            {footerContainer}
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
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    .selecionado{
        background: #1AAE9E;
        border: 1px solid #0E7D71;
        border-radius: 12px;
        box-sizing: border-box;
    }
    .disponivel{
        background: #C3CFD9;
        border: 1px solid #808F9D;
        border-radius: 12px;
        box-sizing: border-box;
    }
    .indisponivel {
        background: #FBE192;
        border: 1px solid #F7C52B;
        border-radius: 17px;
        box-sizing: border-box;
    }
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid blue;         
    background-color: lightblue;    
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
    
    .selecionado{
        background: #1AAE9E;
        border: 1px solid #0E7D71;
        border-radius: 12px;
        box-sizing: border-box;
    }
    .disponivel{
        background: #C3CFD9;
        border: 1px solid #808F9D;
        border-radius: 12px;
        box-sizing: border-box;
    }
    .indisponivel {
        background: #FBE192;
        border: 1px solid #F7C52B;
        border-radius: 17px;
        box-sizing: border-box;
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
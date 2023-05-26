import { useState } from "react";
import styled from "styled-components";

export default function SeatItems({seats, setSeatsID, seatsID, setSeatNum, seatNum}) {
    if(seats) {

    const [seatStates, setSeatStates] = useState(seats.map(s => ({
        id: s.id,
        className: s.isAvailable ? 'disponivel' : 'indisponivel',
        name: s.name
    })))

        const handleSeatClick = (id, index) => {
        setSeatStates(prevStates => prevStates.map(s => {
            if (s.id === id) {
            return {
                ...s,
                className: s.className !== 'indisponivel'  ?
                    s.className === 'disponivel'? 'selecionado'
                    : 'disponivel' 
                    : (() => {
                    alert("Esse assento não está disponível");
                    return "indisponivel";
                }) ()
                
            };
            }
            return s;
        }));
        
        if(seatStates[index].className.includes("disponivel") && !seatStates[index].className.includes("indisponivel") ){

            setSeatsID((prevStates) => [...prevStates, id])
            setSeatNum((prevStates) => [...prevStates, seats[index].name])

        } else if (seatStates[index].className.includes("selecionado")) {
            setSeatsID(() => {

                const newSeats = seatsID.filter(item => item !== id)
                return newSeats

            })
            setSeatNum(() => {

                const newSeats = seatNum.filter(item => item !== seats[index].name)
                return newSeats

            })
        }};
        

        let seatItems = seatStates.map((s, index) => (
        
        <SeatItem
            className={s.className}
            key={s.id}
            onClick={() => handleSeatClick(s.id, index)}
        >
            {s.name}
        </SeatItem>
        ));
            
        return (seatItems);
    } else return "Carregando..."} 

const SeatItem = styled.button`
    border-radius: 12px;
    box-sizing: border-box;
    height: 25px;
    width: 25px;

    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
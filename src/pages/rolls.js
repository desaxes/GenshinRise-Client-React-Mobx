import { Button, Container } from "react-bootstrap"
import { StyledBox, StyledImg, StyledTitle } from "../styledComponents/styled-components"
import { useContext, useEffect, useState } from "react"
import { CreateRoll } from "../components/modals/createRoll"
import { getEventRolls, getStandartRolls, getWeaponRolls } from "../http/rollAPI"
import { AppContext } from ".."
import { observer } from "mobx-react-lite"

export const Rolls = observer(() => {
    const { rolls } = useContext(AppContext)
    const [modalOptions, setModalOptions] = useState(false)
    const [standartLegCount, setStandartLegCount] = useState(0)
    const [eventLegCount, setEventLegCount] = useState(0)
    const [weaponLegCount, setWeaponLegCount] = useState(0)
    const createModal = () => {
        // setId(id)
        setModalOptions(true)
    }
    useEffect(() => {
        getStandartRolls().then(res => {
            rolls.setStandartRolls(res.data)
            let counter = 0
            for (let i = 0; i < rolls.standartRolls.rolls.length; i++) {
                if (rolls.standartRolls.rolls[i].stars === 5) {
                    break
                }
                else {
                    counter++
                }
            }
            setStandartLegCount(counter)
        })
        getEventRolls().then(res => {
            rolls.setEventRolls(res.data)
            let counter = 0
            for (let i = 0; i < rolls.eventRolls.rolls.length; i++) {
                if (rolls.eventRolls.rolls[i].stars === 5) {
                    break
                }
                else {
                    counter++
                }
            }
            setEventLegCount(counter)
        })
        getWeaponRolls().then(res => {
            rolls.setWeaponRolls(res.data)
            let counter = 0
            for (let i = 0; i < rolls.weaponRolls.rolls.length; i++) {
                if (rolls.weaponRolls.rolls[i].stars === 5) {
                    break
                }
                else {
                    counter++
                }
            }
            setWeaponLegCount(counter)
        })

    }, [])
    const sRolls = rolls.standartRolls.rolls.map(e => e.isChar ?
        <StyledImg width='65px' br='50%' bg={e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + '/chars/' + e.img} />
        :
        <StyledImg width='65px' br='50%' bg={e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + '/weapons/' + e.img} />)
    const eRolls = rolls.eventRolls.rolls.map(e => e.isChar ?
        <StyledImg width='65px' br='50%' bg={e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + '/chars/' + e.img} />
        :
        <StyledImg width='65px' br='50%' bg={e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + '/weapons/' + e.img} />)
    const wRolls = rolls.weaponRolls.rolls.map(e => e.isChar ?
        <StyledImg width='65px' br='50%' bg={e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + '/chars/' + e.img} />
        :
        <StyledImg width='65px' br='50%' bg={e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + '/weapons/' + e.img} />)
    return (
        <>
            <Container className="mt-5">
                <StyledBox display='flex' dir='column' gap='30px'>
                    {rolls.standartRolls.rolls.length && <StyledBox br='16px' gap='12px' padding='10px' display='flex' dir='column' jstf='center' align='center' border='3px solid yellow' width='100%'>
                        <StyledTitle color='yellow' fz='26px'>Стандартный Баннер</StyledTitle>
                        <StyledBox gap='12px' display='flex' dir='row'>{sRolls}</StyledBox>
                        <StyledTitle color='yellow' fz='26px'>Последняя Крутка : {rolls.standartRolls.rolls[0].year}.{rolls.standartRolls.rolls[0].month}.{rolls.standartRolls.rolls[0].day}</StyledTitle>
                        <StyledTitle color='yellow' fz='26px'>Откручено с последней Леги : {standartLegCount}</StyledTitle>
                        <Button onClick={createModal}
                            variant="outline-warning" style={{ position: 'absolute', right: '10px', bottom: '10px' }}>+</Button>
                    </StyledBox>}
                    {rolls.eventRolls.rolls.length && <StyledBox br='16px' gap='12px' padding='10px' display='flex' dir='column' jstf='center' align='center' border='3px solid yellow' width='100%'>
                        <StyledTitle color='yellow' fz='26px'>Ивентовый Баннер</StyledTitle>
                        <StyledBox gap='12px' display='flex' dir='row'> {eRolls}</StyledBox>
                        <StyledTitle color='yellow' fz='26px'>Последняя Крутка : {rolls.eventRolls.rolls[0].year}.{rolls.eventRolls.rolls[0].month}.{rolls.eventRolls.rolls[0].day}</StyledTitle>
                        <StyledTitle color='yellow' fz='26px'>Откручено с последней Леги : {eventLegCount}</StyledTitle>
                        <Button onClick={createModal}
                            variant="outline-warning" style={{ position: 'absolute', right: '10px', bottom: '10px' }}>+</Button>
                    </StyledBox>}
                    {rolls.weaponRolls.rolls.length && <StyledBox br='16px' gap='12px' padding='10px' display='flex' dir='column' jstf='center' align='center' border='3px solid yellow' width='100%'>
                        <StyledTitle color='yellow' fz='26px'>Оружейный Баннер</StyledTitle>
                        <StyledBox gap='12px' display='flex' dir='row'> {wRolls}</StyledBox>
                        <StyledTitle color='yellow' fz='26px'>Последняя Крутка : {rolls.weaponRolls.rolls[0].year}.{rolls.weaponRolls.rolls[0].month}.{rolls.weaponRolls.rolls[0].day}</StyledTitle>
                        <StyledTitle color='yellow' fz='26px'>Откручено с последней Леги : {weaponLegCount}</StyledTitle>
                        <Button onClick={createModal}
                            variant="outline-warning" style={{ position: 'absolute', right: '10px', bottom: '10px' }}>+</Button>
                    </StyledBox>}
                </StyledBox>
                {modalOptions && <CreateRoll
                    show={true}
                    onHide={() => setModalOptions(false)}
                />}
            </Container>
        </>
    )
}
)
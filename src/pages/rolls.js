import { Button, Container } from "react-bootstrap"
import { StyledBox, StyledImg, StyledTitle } from "../styledComponents/styled-components"
import { useContext, useEffect, useState } from "react"
import { CreateRoll } from "../components/modals/createRoll"
import { getAllEventRolls, getAllStandartRolls, getAllWeaponRolls, getEventRolls, getStandartRolls, getWeaponRolls } from "../http/rollAPI"
import { AppContext } from ".."
import { observer } from "mobx-react-lite"
import gem from '../img/gem.webp'
import emolitva from '../img/emolitva.webp'
import smolitva from '../img/smolitva.webp'
import { Archive } from "../components/modals/archive"

const Rolls = observer(() => {
    const { rolls } = useContext(AppContext)
    const [modalOptions, setModalOptions] = useState(false)
    const [modalArchive, setModalArchive] = useState(false)
    const [standartLegCount, setStandartLegCount] = useState(0)
    const [eventLegCount, setEventLegCount] = useState(0)
    const [weaponLegCount, setWeaponLegCount] = useState(0)
    const [standartRollCount, setStandartRollCount] = useState(0)
    const [eventRollCount, setEventRollCount] = useState(0)
    const [weaponRollCount, setWeaponRollCount] = useState(0)
    const [standartUpdated, setStandartUpdated] = useState(false)
    const [eventUpdated, setEventUpdated] = useState(false)
    const [weaponUpdated, setWeaponUpdated] = useState(false)
    const [bannerType, setBannerType] = useState()
    const createModal = (bannerType) => {
        setBannerType(bannerType)
        setModalOptions(true)
    }
    const createArchiveModal = (bannerType) => {
        setBannerType(bannerType)
        setModalArchive(true)
    }
    useEffect(() => {
        getStandartRolls().then(res => {
            if (res) {
                rolls.setStandartRolls(res.data)
                getAllStandartRolls().then(res => {
                    let counter = 0
                    for (let i = 0; i < res.data.rolls.length; i++) {
                        if (res.data.rolls[i].stars === 5) {
                            break
                        }
                        else {
                            counter++
                        }
                    }
                    setStandartLegCount(counter)
                    setStandartRollCount(res.data.total)
                    setStandartUpdated(false)
                })
            }
        })
    }, [standartUpdated])
    useEffect(() => {
        getEventRolls().then(res => {
            if (res) {
                rolls.setEventRolls(res.data)
                getAllEventRolls().then(res => {
                    let counter = 0
                    for (let i = 0; i < res.data.rolls.length; i++) {
                        if (res.data.rolls[i].stars === 5) {
                            break
                        }
                        else {
                            counter++
                        }
                    }
                    setEventLegCount(counter)
                    setEventRollCount(res.data.total)
                    setEventUpdated(false)
                })
            }
        })
    }, [eventUpdated])
    useEffect(() => {
        getWeaponRolls().then(res => {
            if (res) {
                rolls.setWeaponRolls(res.data)
                getAllWeaponRolls().then(res => {
                    let counter = 0
                    for (let i = 0; i < res.data.rolls.length; i++) {
                        if (res.data.rolls[i].stars === 5) {
                            break
                        }
                        else {
                            counter++
                        }
                    }
                    setWeaponLegCount(counter)
                    setWeaponRollCount(res.data.total)
                    setWeaponUpdated(false)
                })
            }
        })
    }, [weaponUpdated])
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
                    <StyledBox br='16px' gap='12px' padding='10px' display='flex' dir='column' jstf='center' align='center' border='3px solid yellow' width='100%'>
                        <StyledTitle color='yellow' fz='26px'>Стандартный Баннер</StyledTitle>
                        <StyledBox gap='12px' display='flex' dir='row'>{sRolls}</StyledBox>
                        {rolls.standartRolls.rolls.length ? <StyledBox>
                            <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Последняя Молитва : {rolls.standartRolls.rolls[0].year}.{rolls.standartRolls.rolls[0].month}.{rolls.standartRolls.rolls[0].day}</StyledTitle>
                            <StyledTitle
                                color='yellow' fz='22px'
                                dec='underline' fs='italic'>
                                Молитв с последней Леги : {standartLegCount} <StyledImg width={'30px'} src={smolitva} /> /
                                До гаранта нужно ≈ {(90 - standartLegCount) * 160} <StyledImg width={'30px'} src={gem} />
                                {/* или {90-standartLegCount}<StyledImg width={'30px'} src={smolitva}/> */}
                            </StyledTitle>
                            <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Всего Молитв : {standartRollCount}</StyledTitle>
                        </StyledBox> : <StyledTitle color='red' fz='24px'>Нет Данных</StyledTitle>}
                        <Button onClick={() => createModal('standart')}
                            variant="outline-warning" style={{ position: 'absolute', right: '10px', bottom: '10px' }}>+</Button>
                        <Button onClick={() => createArchiveModal('standart')}
                            variant="outline-warning" style={{ position: 'absolute', left: '10px', bottom: '10px' }}>Все Молитвы</Button>
                    </StyledBox>
                    <StyledBox br='16px' gap='12px' padding='10px' display='flex' dir='column' jstf='center' align='center' border='3px solid yellow' width='100%'>
                        <StyledTitle color='yellow' fz='26px'>Ивентовый Баннер</StyledTitle>
                        <StyledBox gap='12px' display='flex' dir='row'> {eRolls}</StyledBox>
                        {rolls.eventRolls.rolls.length ? <StyledBox>
                            <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Последняя Молитва : {rolls.eventRolls.rolls[0].year}.{rolls.eventRolls.rolls[0].month}.{rolls.eventRolls.rolls[0].day}</StyledTitle>
                            <StyledTitle
                                color='yellow' fz='22px'
                                dec='underline' fs='italic'>
                                Молитв с последней Леги : {eventLegCount} <StyledImg width={'30px'} src={emolitva} /> /
                                До гаранта нужно ≈ {(90 - eventLegCount) * 160} <StyledImg width={'30px'} src={gem} />
                                {/* или {90-eventLegCount}<StyledImg width={'30px'} src={emolitva}/> */}
                            </StyledTitle>
                            <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Всего Молитв : {eventRollCount}</StyledTitle>
                        </StyledBox> : <StyledTitle color='red' fz='24px'>Нет Данных</StyledTitle>}
                        <Button onClick={() => createModal('event')}
                            variant="outline-warning" style={{ position: 'absolute', right: '10px', bottom: '10px' }}>+</Button>
                        <Button onClick={() => createArchiveModal('event')}
                            variant="outline-warning" style={{ position: 'absolute', left: '10px', bottom: '10px' }}>Все Молитвы</Button>
                    </StyledBox>
                    <StyledBox br='16px' gap='12px' padding='10px' display='flex' dir='column' jstf='center' align='center' border='3px solid yellow' width='100%'>
                        <StyledTitle color='yellow' fz='26px'>Оружейный Баннер</StyledTitle>
                        <StyledBox gap='12px' display='flex' dir='row'> {wRolls}</StyledBox>
                        {rolls.weaponRolls.rolls.length ? <StyledBox>
                            <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Последняя Молитва : {rolls.weaponRolls.rolls[0].year}.{rolls.weaponRolls.rolls[0].month}.{rolls.weaponRolls.rolls[0].day}</StyledTitle>
                            <StyledTitle
                                color='yellow' fz='22px'
                                dec='underline' fs='italic'>
                                Молитв с последней Леги : {weaponLegCount} <StyledImg width={'30px'} src={emolitva} /> /
                                До гаранта нужно ≈ {(90 - weaponLegCount) * 160} <StyledImg width={'30px'} src={gem} />
                                {/* или {90-weaponLegCount} <StyledImg width={'30px'} src={emolitva}/> */}
                            </StyledTitle>
                            <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Всего Молитв : {weaponRollCount}</StyledTitle>
                        </StyledBox> : <StyledTitle color='red' fz='24px'>Нет Данных</StyledTitle>}
                        <Button onClick={() => createModal('weapon')}
                            variant="outline-warning" style={{ position: 'absolute', right: '10px', bottom: '10px' }}>+</Button>
                        <Button onClick={() => createArchiveModal('weapon')}
                            variant="outline-warning" style={{ position: 'absolute', left: '10px', bottom: '10px' }}>Все Молитвы</Button>
                    </StyledBox>
                </StyledBox>
                {modalOptions && <CreateRoll
                    show={true}
                    onHide={() => setModalOptions(false)}
                    updateStandart={setStandartUpdated}
                    updateEvent={setEventUpdated}
                    updateWeapon={setWeaponUpdated}
                    bannerType={bannerType}
                />}
                {modalArchive && <Archive
                    show={true}
                    onHide={() => setModalArchive(false)}
                    bannerType={bannerType}
                />}
            </Container>
        </>
    )
}
)
export default Rolls
import { Button, Col, Container, Row } from "react-bootstrap"
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
import { getZzzAllEventRolls, getZzzAllStandartRolls, getZzzAllWeaponRolls, getZzzEventRolls, getZzzStandartRolls, getZzzWeaponRolls } from "../http/zzz/rollAPI"
import { getHonkaiAllEventRolls, getHonkaiAllStandartRolls, getHonkaiAllWeaponRolls, getHonkaiEventRolls, getHonkaiStandartRolls, getHonkaiWeaponRolls } from "../http/honkai/rollAPI"

const Rolls = observer(() => {
    const [sCounter, setSCounter] = useState([])
    const { rolls, app } = useContext(AppContext)
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
    const [msv, setMsv] = useState()
    const [mev, setMev] = useState()
    const [mwv, setMwv] = useState()
    const [msev, setMsev] = useState()
    const [meev, setMeev] = useState()
    const [mwev, setMwev] = useState()
    const [sLegs, setSLegs] = useState()
    const [eLegs, setELegs] = useState()
    const [wLegs, setWLegs] = useState()
    const createModal = (bannerType) => {
        setBannerType(bannerType)
        setModalOptions(true)
    }
    const createArchiveModal = (bannerType) => {
        setBannerType(bannerType)
        setModalArchive(true)
    }
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])
    useEffect(() => {
        if (app.game === 'Genshin') {
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
                        setMsv(res.data.middle)
                        setMsev(res.data.epicMiddle)
                        setSLegs(res.data.legs)
                        setStandartUpdated(false)
                    })
                }
            })
        }
        else if (app.game === 'Zzz') {
            getZzzStandartRolls().then(res => {
                if (res) {
                    rolls.setStandartRolls(res.data)
                    getZzzAllStandartRolls().then(res => {
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
                        setMsv(res.data.middle)
                        setMsev(res.data.epicMiddle)
                        setSLegs(res.data.legs)
                        setStandartUpdated(false)
                    })
                }
            })
        }
        else if (app.game === 'Honkai') {
            getHonkaiStandartRolls().then(res => {
                if (res) {
                    rolls.setStandartRolls(res.data)
                    getHonkaiAllStandartRolls().then(res => {
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
                        setMsv(res.data.middle)
                        setMsev(res.data.epicMiddle)
                        setSLegs(res.data.legs)
                        setStandartUpdated(false)
                    })
                }
            })
        }
    }, [standartUpdated, app.game])
    useEffect(() => {
        if (app.game === 'Genshin') {
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
                        setMev(res.data.middle)
                        setMeev(res.data.epicMiddle)
                        setELegs(res.data.legs)
                        setEventUpdated(false)
                    })
                }
            })
        }
        else if (app.game === 'Zzz') {
            getZzzEventRolls().then(res => {
                if (res) {
                    rolls.setEventRolls(res.data)
                    getZzzAllEventRolls().then(res => {
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
                        setMev(res.data.middle)
                        setMeev(res.data.epicMiddle)
                        setELegs(res.data.legs)
                        setEventUpdated(false)
                    })
                }
            })
        }
        else if (app.game === 'Honkai') {
            getHonkaiEventRolls().then(res => {
                if (res) {
                    rolls.setEventRolls(res.data)
                    getHonkaiAllEventRolls().then(res => {
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
                        setMev(res.data.middle)
                        setMeev(res.data.epicMiddle)
                        setELegs(res.data.legs)
                        setEventUpdated(false)
                    })
                }
            })
        }
    }, [eventUpdated, app.game])
    useEffect(() => {
        if (app.game === 'Genshin') {
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
                        setWLegs(res.data.legs)
                        setMwv(res.data.middle)
                        setMwev(res.data.epicMiddle)
                        setWeaponUpdated(false)
                    })
                }
            })
        }
        else if (app.game === 'Zzz') {
            getZzzWeaponRolls().then(res => {
                if (res) {
                    rolls.setWeaponRolls(res.data)
                    getZzzAllWeaponRolls().then(res => {
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
                        setWLegs(res.data.legs)
                        setMwv(res.data.middle)
                        setMwev(res.data.epicMiddle)
                        setWeaponUpdated(false)
                    })
                }
            })
        }
        else if (app.game === 'Honkai') {
            getHonkaiWeaponRolls().then(res => {
                if (res) {
                    rolls.setWeaponRolls(res.data)
                    getHonkaiAllWeaponRolls().then(res => {
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
                        setWLegs(res.data.legs)
                        setMwv(res.data.middle)
                        setMwev(res.data.epicMiddle)
                        setWeaponUpdated(false)
                    })
                }
            })
        }
    }, [weaponUpdated, app.game])
    const sRolls = rolls.standartRolls.rolls.map(e => e.isChar ?
        <StyledImg height={app.game === 'Honkai' && '90px'} style={{ boxShadow: e.stars === 5 ? '0px 0px 10px 10px yellow' : (e.stars === 4 ? '0px 0px 15px 5px violet' : '') }} width='65' br={app.game != 'Honkai' ? '50%' : '16px'} bg={e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/chars/' : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img} />
        :
        <StyledImg height={app.game === 'Honkai' && '90px'} style={{ boxShadow: e.stars === 5 ? '0px 0px 10px 10px yellow' : (e.stars === 4 ? '0px 0px 15px 5px violet' : '') }} width='65px' br={app.game != 'Honkai' ? '50%' : '16px'} bg={e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/weapons/' : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e.img} />)
    const sLegRolls = sLegs?.map(e => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {e.isChar ?
            <StyledImg width='65px' height={app.game === 'Honkai' && '90px'} br={app.game != 'Honkai' ? '50%' : '16px'} bg={'orange'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/chars/' : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img} />
            :
            <StyledImg width='65px' height={app.game === 'Honkai' && '90px'} br={app.game != 'Honkai' ? '50%' : '16px'} bg={'orange'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/weapons/' : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e.img} />}
        <StyledTitle color={e.roll < 40 ? 'green' : (e.roll < 60 ? 'yellow' : 'red')} fz='22px' dec='underline' fs='italic'> {e.roll}</StyledTitle>
    </div>
    )
    const eRolls = rolls.eventRolls.rolls.map(e => e.isChar ?
        <StyledImg height={app.game === 'Honkai' && '90px'} style={{ boxShadow: e.stars === 5 ? '0px 0px 10px 10px yellow' : (e.stars === 4 ? '0px 0px 15px 5px violet' : '') }} width='65px' br={app.game != 'Honkai' ? '50%' : '16px'} bg={e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/chars/' : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img} />
        :
        <StyledImg height={app.game === 'Honkai' && '90px'} style={{ boxShadow: e.stars === 5 ? '0px 0px 10px 10px yellow' : (e.stars === 4 ? '0px 0px 15px 5px violet' : '') }} width='65px' br={app.game != 'Honkai' ? '50%' : '16px'} bg={e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/weapons/' : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e.img} />)
    const eLegRolls = eLegs?.map(e => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {e.isChar ?
            <StyledImg width='65px' height={app.game === 'Honkai' && '90px'} br={app.game != 'Honkai' ? '50%' : '16px'} bg={'orange'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/chars/' : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img} />
            :
            <StyledImg width='65px' height={app.game === 'Honkai' && '90px'} br={app.game != 'Honkai' ? '50%' : '16px'} bg={'orange'} src={process.env.REACT_APP_API_URL + '/weapons/'(app.game === 'Genshin' ? '/weapons/' : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e.img} />}
        <StyledTitle color={e.roll < 40 ? 'green' : (e.roll < 60 ? 'yellow' : 'red')} fz='22px' dec='underline' fs='italic'> {e.roll}</StyledTitle>
    </div>
    )
    const wRolls = rolls.weaponRolls.rolls.map(e => e.isChar ?
        <StyledImg height={app.game === 'Honkai' && '90px'} style={{ boxShadow: e.stars === 5 ? '0px 0px 10px 10px yellow' : (e.stars === 4 ? '0px 0px 15px 5px violet' : '') }} width='65px' br={app.game != 'Honkai' ? '50%' : '16px'} bg={e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/chars/' : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img} />
        :
        <StyledImg height={app.game === 'Honkai' && '90px'} style={{ boxShadow: e.stars === 5 ? '0px 0px 10px 10px yellow' : (e.stars === 4 ? '0px 0px 15px 5px violet' : '') }} width='65px' br={app.game != 'Honkai' ? '50%' : '16px'} bg={e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/weapons/' : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e.img} />)
    const wLegRolls = wLegs?.map(e => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {e.isChar ?
            <StyledImg width='65px' height={app.game === 'Honkai' && '90px'} br={app.game != 'Honkai' ? '50%' : '16px'} bg={'orange'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/chars/' : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img} />
            :
            <StyledImg width='65px' height={app.game === 'Honkai' && '90px'} br={app.game != 'Honkai' ? '50%' : '16px'} bg={'orange'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/weapons/' : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e.img} />}
        <StyledTitle color={e.roll < 40 ? 'green' : (e.roll < 60 ? 'yellow' : 'red')} fz='22px' dec='underline' fs='italic'> {e.roll}</StyledTitle>
    </div>
    )
    return (
        <>
            <Container style={{ textShadow: '2px 2px 2px black' }} className="mt-5 mb-5">
                <StyledBox display='flex' dir='column' gap='30px'>
                    <StyledBox br='16px' gap='12px' padding='10px' display='flex' dir='column' jstf='center' align='center' border='3px solid yellow' width='100%'>
                        <StyledTitle color='yellow' fz='26px'>Стандартный Баннер</StyledTitle>
                        <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Последняя десятка</StyledTitle>
                        <StyledBox gap='12px' display='flex' dir='row'>{sRolls}</StyledBox>
                        {rolls.standartRolls.rolls.length ? <StyledBox margin='25px 0'>
                            <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Последняя Молитва : {rolls.standartRolls.rolls[0].year}.{rolls.standartRolls.rolls[0].month}.{rolls.standartRolls.rolls[0].day}</StyledTitle>
                            <StyledTitle
                                color='yellow' fz='22px'
                                dec='underline' fs='italic'>
                                Молитв с последней Леги : {standartLegCount} <StyledImg width={'30px'} src={smolitva} /> /
                                До гаранта нужно ≈ {(90 - standartLegCount) * 160} <StyledImg width={'30px'} src={gem} />
                                {/* или {90-standartLegCount}<StyledImg width={'30px'} src={smolitva}/> */}
                            </StyledTitle>
                            <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Всего Молитв : {standartRollCount}</StyledTitle>
                            <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Среднее кол-во молитв для Леги : {msv} / Среднее кол-во молитв для Эпиков : {msev}</StyledTitle>
                            <Row md={'auto'} className='mt-3 mb-3 d-flex justify-content-center'
                            >
                                {sLegRolls}
                            </Row>
                        </StyledBox> : <StyledTitle color='red' fz='24px'>Нет Данных</StyledTitle>}
                        <Button onClick={() => createModal('standart')}
                            variant="outline-warning" style={{ position: 'absolute', right: '10px', bottom: '10px' }}>+</Button>
                        <Button onClick={() => createArchiveModal('standart')}
                            variant="outline-warning" style={{ position: 'absolute', left: '10px', bottom: '10px' }}>Все Молитвы</Button>
                    </StyledBox>
                    <StyledBox br='16px' gap='12px' padding='10px' display='flex' dir='column' jstf='center' align='center' border='3px solid yellow' width='100%'>
                        <StyledTitle color='yellow' fz='26px'>Ивентовый Баннер</StyledTitle>
                        <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Последняя десятка</StyledTitle>
                        <StyledBox gap='12px' display='flex' dir='row'> {eRolls}</StyledBox>
                        {rolls.eventRolls.rolls.length ? <StyledBox margin='25px 0'>
                            <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Последняя Молитва : {rolls.eventRolls.rolls[0].year}.{rolls.eventRolls.rolls[0].month}.{rolls.eventRolls.rolls[0].day}</StyledTitle>
                            <StyledTitle
                                color='yellow' fz='22px'
                                dec='underline' fs='italic'>
                                Молитв с последней Леги : {eventLegCount} <StyledImg width={'30px'} src={emolitva} /> /
                                До гаранта нужно ≈ {(90 - eventLegCount) * 160} <StyledImg width={'30px'} src={gem} />
                                {/* или {90-eventLegCount}<StyledImg width={'30px'} src={emolitva}/> */}
                            </StyledTitle>
                            <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Всего Молитв : {eventRollCount}</StyledTitle>
                            <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Среднее кол-во молитв для Леги : {mev} / Среднее кол-во молитв для Эпиков : {meev}</StyledTitle>

                            <Row md={'auto'} className='mt-3 mb-3 d-flex justify-content-center'
                            >
                                {eLegRolls}
                            </Row>
                        </StyledBox> : <StyledTitle color='red' fz='24px'>Нет Данных</StyledTitle>}
                        <Button onClick={() => createModal('event')}
                            variant="outline-warning" style={{ position: 'absolute', right: '10px', bottom: '10px' }}>+</Button>
                        <Button onClick={() => createArchiveModal('event')}
                            variant="outline-warning" style={{ position: 'absolute', left: '10px', bottom: '10px' }}>Все Молитвы</Button>
                    </StyledBox>
                    <StyledBox br='16px' gap='12px' padding='10px' display='flex' dir='column' jstf='center' align='center' border='3px solid yellow' width='100%'>
                        <StyledTitle color='yellow' fz='26px'>Оружейный Баннер</StyledTitle>
                        <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Последняя десятка</StyledTitle>
                        <StyledBox gap='12px' display='flex' dir='row'> {wRolls}</StyledBox>
                        {rolls.weaponRolls.rolls.length ? <StyledBox margin='25px 0'>
                            <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Последняя Молитва : {rolls.weaponRolls.rolls[0].year}.{rolls.weaponRolls.rolls[0].month}.{rolls.weaponRolls.rolls[0].day}</StyledTitle>
                            <StyledTitle
                                color='yellow' fz='22px'
                                dec='underline' fs='italic'>
                                Молитв с последней Леги : {weaponLegCount} <StyledImg width={'30px'} src={emolitva} /> /
                                До гаранта нужно ≈ {(80 - weaponLegCount) * 160} <StyledImg width={'30px'} src={gem} />
                                {/* или {90-weaponLegCount} <StyledImg width={'30px'} src={emolitva}/> */}
                            </StyledTitle>
                            <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Всего Молитв : {weaponRollCount}</StyledTitle>
                            <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Среднее кол-во молитв для Леги : {mwv} / Среднее кол-во молитв для Эпиков : {mwev}</StyledTitle>
                            <Row md={'auto'} className='mt-3 mb-3 d-flex justify-content-center'
                            >
                                {wLegRolls}
                            </Row>
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
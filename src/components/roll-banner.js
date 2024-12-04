import { Button, Container, Row } from "react-bootstrap"
import { StyledBox, StyledImg, StyledTitle } from "../styledComponents/styled-components"
import { useContext, useEffect, useState } from "react"
import { CreateRoll } from "../components/modals/createRoll"
import { getAllEventRolls, getAllStandartRolls, getAllWeaponRolls, getEventRolls, getStandartRolls, getWeaponRolls } from "../http/rollAPI"
import { AppContext } from ".."
import { observer } from "mobx-react-lite"
import { Archive } from "../components/modals/archive"
import { getZzzAllEventRolls, getZzzAllStandartRolls, getZzzAllWeaponRolls, getZzzEventRolls, getZzzStandartRolls, getZzzWeaponRolls } from "../http/zzz/rollAPI"
import { getHonkaiAllEventRolls, getHonkaiAllStandartRolls, getHonkaiAllWeaponRolls, getHonkaiEventRolls, getHonkaiStandartRolls, getHonkaiWeaponRolls } from "../http/honkai/rollAPI"
import genshinGem from '../img/gems/genshin/gems.webp'
import honkaiGem from '../img/gems/honkai/gems.webp'
import zzzGem from '../img/gems/zzz/gems.webp'
import genshinRoll from '../img/gems/genshin/roll.webp'
import honkaiRoll from '../img/gems/honkai/roll.webp'
import zzzRoll from '../img/gems/zzz/roll.webp'
import genshinSRoll from '../img/gems/genshin/sRoll.webp'
import honkaiSRoll from '../img/gems/honkai/sRoll.webp'
import zzzSRoll from '../img/gems/zzz/sRoll.webp'

export const RollBanner = observer((props) => {
    const { app } = useContext(AppContext)
    const [modalOptions, setModalOptions] = useState(false)
    const [modalArchive, setModalArchive] = useState(false)
    const [rolls, setRolls] = useState()
    const [legCount, setLegCount] = useState(0)
    const [rollCount, setRollCount] = useState(0)
    const [updated, setUpdated] = useState(false)
    const [bannerType, setBannerType] = useState()
    const [middleValue, setMiddleValue] = useState()
    const [middleEpicValue, setMiddleEpicValue] = useState()
    const [legs, setLegs] = useState()
    const createModal = (bannerType) => {
        setBannerType(props.bannerType)
        setModalOptions(true)
    }
    const createArchiveModal = (bannerType) => {
        setBannerType(props.bannerType)
        setModalArchive(true)
    }
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])
    useEffect(() => {
        let getRolls
        let getAllRolls
        switch (app.game) {
            case 'Genshin':
                getRolls = (props.bannerType === 'standart' ?
                    getStandartRolls :
                    (props.bannerType === 'event' ? getEventRolls : getWeaponRolls))
                getAllRolls = (props.bannerType === 'standart' ?
                    getAllStandartRolls :
                    (props.bannerType === 'event' ? getAllEventRolls : getAllWeaponRolls))
                break;
            case 'Honkai':
                getRolls = (props.bannerType === 'standart' ?
                    getHonkaiStandartRolls :
                    (props.bannerType === 'event' ? getHonkaiEventRolls : getHonkaiWeaponRolls))
                getAllRolls = (props.bannerType === 'standart' ?
                    getHonkaiAllStandartRolls :
                    (props.bannerType === 'event' ? getHonkaiAllEventRolls : getHonkaiAllWeaponRolls))
                break;
            case 'Zzz':
                getRolls = (props.bannerType === 'standart' ?
                    getZzzStandartRolls :
                    (props.bannerType === 'event' ? getZzzEventRolls : getZzzWeaponRolls))
                getAllRolls = (props.bannerType === 'standart' ?
                    getZzzAllStandartRolls :
                    (props.bannerType === 'event' ? getZzzAllEventRolls : getZzzAllWeaponRolls))
                break;
            default:
                break;
        }
        getRolls().then(res => {
            if (res) {
                setRolls(res.data)
                getAllRolls().then(res => {
                    let counter = 0
                    for (let i = 0; i < res.data.rolls.length; i++) {
                        if (res.data.rolls[i].stars === 5) {
                            break
                        }
                        else {
                            counter++
                        }
                    }
                    setLegCount(counter)
                    setRollCount(res.data.total)
                    setMiddleValue(res.data.middle)
                    setMiddleEpicValue(res.data.epicMiddle)
                    setLegs(res.data.legs)
                    setUpdated(false)
                })
            }
        })
    }, [updated, app.game, props.bannerType])
    const Rolls = rolls?.rolls.map(e => e.isChar ?
        <StyledImg height={app.game === 'Honkai' && '90px'} style={{ boxShadow: e.stars === 5 ? '0px 0px 10px 10px yellow' : (e.stars === 4 ? '0px 0px 15px 5px violet' : '') }} width='65' br={app.game !== 'Honkai' ? '50%' : '16px'} bg={e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/chars/' : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img} />
        :
        <StyledImg height={app.game === 'Honkai' && '90px'} style={{ boxShadow: e.stars === 5 ? '0px 0px 10px 10px yellow' : (e.stars === 4 ? '0px 0px 15px 5px violet' : '') }} width='65px' br={app.game !== 'Honkai' ? '50%' : '16px'} bg={e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/weapons/' : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e.img} />)
    const LegRolls = legs?.map(e => <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {e.isChar ?
            <StyledImg width='65px' height={app.game === 'Honkai' && '90px'} br={app.game !== 'Honkai' ? '50%' : '16px'} bg={'orange'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/chars/' : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img} />
            :
            <StyledImg width='65px' height={app.game === 'Honkai' && '90px'} br={app.game !== 'Honkai' ? '50%' : '16px'} bg={'orange'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/weapons/' : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e.img} />}
        <StyledTitle color={e.roll < 40 ? 'green' : (e.roll < 60 ? 'yellow' : 'red')} fz='22px' dec='underline' fs='italic'> {e.roll}</StyledTitle>
    </div>
    )
    return (
        <>
            <Container style={{ textShadow: '2px 2px 2px black' }} className="mt-2 mb-2">
                <StyledBox br='16px' gap='12px' padding='10px' display='flex' dir='column' jstf='center' align='center' border='3px solid yellow' width='100%'>
                    <StyledTitle color='yellow' fz='26px'>{props.bannerType === 'standart' ? 'Стандартный Баннер' : (props.bannerType === 'event' ? 'Ивентовый Баннер' : 'Оружейный Баннер')}</StyledTitle>
                    <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Последняя десятка</StyledTitle>
                    <StyledBox gap='12px' display='flex' dir='row'>{Rolls}</StyledBox>
                    {rolls?.rolls.length ? <StyledBox margin='25px 0'>
                        <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Последняя Крутка : {rolls.rolls[0].year}.{rolls.rolls[0].month}.{rolls.rolls[0].day}</StyledTitle>
                        <StyledTitle
                            color='yellow' fz='22px'
                            dec='underline' fs='italic'>
                            Круток с последней Леги : {legCount} <StyledImg width={'30px'} src={app.game === 'Genshin' ? (props.bannerType === 'standart' ? genshinSRoll : genshinRoll) : (app.game === 'Honkai' ? (props.bannerType === 'standart' ? honkaiSRoll : honkaiRoll) : (props.bannerType === 'standart' ? zzzSRoll : zzzRoll))} /> /
                            До гаранта нужно ≈ {(90 - legCount) * 160} <StyledImg width={'30px'} src={app.game === 'Genshin' ? (genshinGem) : (app.game === 'Honkai' ? (honkaiGem) : (zzzGem))} />
                        </StyledTitle>
                        <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Всего Круток : {rollCount}</StyledTitle>
                        <StyledTitle color='yellow' fz='22px' dec='underline' fs='italic'>Среднее кол-во круток для Леги : {middleValue} / Среднее кол-во круток для Эпиков : {middleEpicValue}</StyledTitle>
                        <Row md={'auto'} className='mt-3 mb-3 d-flex justify-content-center'
                        >
                            {LegRolls}
                        </Row>
                    </StyledBox> : <StyledTitle color='red' fz='24px'>Нет Данных</StyledTitle>}
                    <Button onClick={() => createModal('standart')}
                        variant="outline-warning" style={{ position: 'absolute', right: '10px', bottom: '10px' }}>+</Button>
                    <Button onClick={() => createArchiveModal('standart')}
                        variant="outline-warning" style={{ position: 'absolute', left: '10px', bottom: '10px' }}>Все Крутки</Button>
                </StyledBox>
                {modalOptions && <CreateRoll
                    show={true}
                    onHide={() => setModalOptions(false)}
                    update={setUpdated}
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
})

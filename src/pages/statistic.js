import { useContext, useEffect, useState } from "react"
import { getEventStatistic, getStandartStatistic, getStatistic, getWeaponStatistic } from "../http/rollAPI"
import { StyledBox, StyledImg, StyledTitle } from "../styledComponents/styled-components"
import { Button, Col, Container, Row } from "react-bootstrap"
import { getCharFromColById, getCharStatistic, getCharsFromCol } from "../http/charAPI"
import onehand from '../img/weapons/1h.webp'
import { AppContext } from ".."
import { getZzzEventStatistic, getZzzStandartStatistic, getZzzWeaponStatistic } from "../http/zzz/rollAPI"
import { observer } from "mobx-react-lite"
import { getZzzCharsFromCol, getZzzCharStatistic } from "../http/zzz/charAPI"

const Statistic = observer(() => {
    const [sRolls, setSRolls] = useState([])
    const [eRolls, setERolls] = useState([])
    const [wRolls, setWRolls] = useState([])
    const [sort, setSort] = useState(false)
    const [charStatistic, setCharStatistic] = useState([])
    const [regionStatistic, setRegionStatistic] = useState([])
    const [col, setCol] = useState()
    const { app } = useContext(AppContext)
    useEffect(() => {
        if (app.game === 'Genshin') {
            getStandartStatistic().then(res => {
                res && setSRolls(res.data)
            })
            getEventStatistic().then(res => {
                res && setERolls(res.data)
            })
            getWeaponStatistic().then(res => {
                res && setWRolls(res.data)
            })
        }
        else if (app.game === 'Zzz') {
            getZzzStandartStatistic().then(res => {
                res && setSRolls(res.data)
            })
            getZzzEventStatistic().then(res => {
                res && setERolls(res.data)
            })
            getZzzWeaponStatistic().then(res => {
                res && setWRolls(res.data)
            })
        }
    }, [app.game])
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])
    useEffect(() => {
        if (app.game === 'Genshin') {
            getCharsFromCol().then(res => {
                setCol(res.data.chars.map(e => e.id))
            })
            getCharStatistic().then(res => { setCharStatistic(res.data.elements.all); setRegionStatistic(res.data.regions.all) })
        }
        if (app.game === 'Zzz') {
            getZzzCharsFromCol().then(res => {
                setCol(res.data.chars.map(e => e.id))
            })
            getZzzCharStatistic().then(res => { setCharStatistic(res.data.elements.all); setRegionStatistic(res.data.regions.all) })
        }
    }, [app.game])
    const charTableCell = charStatistic?.map(
        e => <Col
            style={{ borderLeft: 'yellow solid 2px' }}>
            {e.chars.filter(
                i => sort ? col.some(c => c === i.id) : i
            ).map(
                i =>
                    <StyledImg opacity={col.some(e => e === i.id) ? '100%' : '30%'}
                        style={{ margin: '5px' }} width={'70px'}
                        src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : '/zzz/chars/') + i.img} />)}
        </Col>)
    const regionTableRow = regionStatistic?.map(
        e => <Col
            style={{ border: 'yellow solid 2px' }}>
            {e.chars.filter(
                i => sort ? col.some(c => c === i.id) : i
            ).map(
                i =>
                    <StyledImg br='15px' opacity={col.some(e => e === i.id) ? '100%' : '30%'}
                        style={{ margin: '5px' }} width={'70px'}
                        src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : '/zzz/chars/') + i.img} />)}
        </Col>)

    const srollsComp = sRolls.filter(e => e._id.stars > 3).map(e => e._id.isChar ?
        <StyledBox className='mb-4'>
            <StyledImg width='65px' br='50%' bg={e._id.stars === 5 ? 'orange' : (e._id.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : '/zzz/chars/') + e._id.img} />
            <p style={{ position: 'absolute', top: '100%', right: '38%', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>x{e.count}</p>
        </StyledBox>
        :
        <StyledBox className='mb-4'>
            <StyledImg width='65px' br='50%' bg={e._id.stars === 5 ? 'orange' : (e._id.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : '/zzz/weapons/') + e._id.img} />
            <p style={{ position: 'absolute', top: '100%', right: '38%', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>x{e.count}</p>
        </StyledBox>)
    const erollsComp = eRolls.filter(e => e._id.stars > 3).map(e => e._id.isChar ?
        <StyledBox className='mb-4'>
            <StyledImg width='65px' br='50%' bg={e._id.stars === 5 ? 'orange' : (e._id.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : '/zzz/chars/') + e._id.img} />
            <p style={{ position: 'absolute', top: '100%', right: '38%', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>x{e.count}</p>
        </StyledBox>
        :
        <StyledBox className='mb-4'>
            <StyledImg width='65px' br='50%' bg={e._id.stars === 5 ? 'orange' : (e._id.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : '/zzz/weapons/') + e._id.img} />
            <p style={{ position: 'absolute', top: '100%', right: '38%', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>x{e.count}</p>
        </StyledBox>)
    const wrollsComp = wRolls.filter(e => e._id.stars > 3).map(e => e._id.isChar ?
        <StyledBox className='mb-4'>
            <StyledImg width='65px' br='50%' bg={e._id.stars === 5 ? 'orange' : (e._id.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : '/zzz/chars/') + e._id.img} />
            <p style={{ position: 'absolute', top: '100%', right: '38%', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>x{e.count}</p>
        </StyledBox>
        :
        <StyledBox className='mb-4'>
            <StyledImg width='65px' br='50%' bg={e._id.stars === 5 ? 'orange' : (e._id.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : '/zzz/weapons/') + e._id.img} />
            <p style={{ position: 'absolute', top: '100%', right: '38%', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>x{e.count}</p>
        </StyledBox>)
    return (
        <>
            <Container style={{textShadow: '2px 2px 2px black'}} className="mt-3">
                <Button onClick={() => setSort(!sort)} variant="outline-warning" style={{ position: 'fixed', right: '40px', top: '50%', width: '120px' }}>{sort ? 'Отобразить Персонажей' : 'Скрыть Персонажей'}</Button>
                <StyledTitle fz='26px' align='center' color="yellow">Награды Стандартного Баннера 4★ и 5★</StyledTitle>
                <Row md={'auto'} className='mt-3 mb-3 d-flex justify-content-center'
                >
                    {srollsComp.length ? srollsComp : <StyledTitle color="red" fz='22px'>Нет Данных</StyledTitle>}
                </Row>
                <StyledTitle fz='26px' align='center' color="yellow">Награды Ивентового Баннера 4★ и 5★</StyledTitle>
                <Row md={'auto'} className='mt-3 mb-3 d-flex justify-content-center'
                >
                    {erollsComp.length ? erollsComp : <StyledTitle color="red" fz='22px'>Нет Данных</StyledTitle>}
                </Row>
                <StyledTitle fz='26px' align='center' color="yellow">Награды Оружейного Баннера 4★ и 5★</StyledTitle>
                <Row md={'auto'} className='mt-3 mb-5 d-flex justify-content-center'
                >
                    {wrollsComp.length ? wrollsComp : <StyledTitle color="red" fz='22px'>Нет Данных</StyledTitle>}
                </Row>
                <StyledTitle fz='26px' align='center' color="yellow">Таблица персонажей</StyledTitle>
                {app.game === 'Genshin' && <StyledBox className='mt-3 mb-5'>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}>Анемо</Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}>Гео</Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}>Электро</Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}>Дендро</Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}>Гидро</Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}>Пиро</Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}>Крио</Col>
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        {charTableCell[0]}
                        {charTableCell[1]}
                        {charTableCell[2]}
                        {charTableCell[3]}
                        {charTableCell[4]}
                        {charTableCell[5]}
                        {charTableCell[6]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        {charTableCell[7]}
                        {charTableCell[8]}
                        {charTableCell[9]}
                        {charTableCell[10]}
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                        {charTableCell[11]}
                        {charTableCell[12]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        {charTableCell[13]}
                        {charTableCell[14]}
                        {charTableCell[15]}
                        {charTableCell[16]}
                        {charTableCell[17]}
                        {charTableCell[18]}
                        {charTableCell[19]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        {charTableCell[20]}
                        {charTableCell[21]}
                        {charTableCell[22]}
                        {charTableCell[23]}
                        {charTableCell[24]}
                        {charTableCell[25]}
                        {charTableCell[26]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        {charTableCell[27]}
                        {charTableCell[28]}
                        {charTableCell[29]}
                        {charTableCell[30]}
                        {charTableCell[31]}
                        {charTableCell[32]}
                        {charTableCell[33]}
                    </Row>
                </StyledBox>}
                {app.game === 'Zzz' && <StyledBox className='mt-3 mb-5'>
                    <Row style={{ border: 'yellow solid 2px' }}>
                    <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}>Огонь</Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}>Шок</Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}>Физа</Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}>Лед</Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}>Эфир</Col>
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{color:'yellow', borderLeft: 'yellow solid 2px', height: '160px',display:'flex',alignItems:'center',justifyContent:'center' }}>Аномалия</Col>
                        {charTableCell[0]}
                        {charTableCell[1]}
                        {charTableCell[2]}
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                    <Col style={{color:'yellow', borderLeft: 'yellow solid 2px', height: '160px',display:'flex',alignItems:'center',justifyContent:'center' }}>Нападение</Col>
                        {charTableCell[3]}
                        {charTableCell[4]}
                        {charTableCell[5]}
                        {charTableCell[6]}
                        {charTableCell[7]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                    <Col style={{color:'yellow', borderLeft: 'yellow solid 2px', height: '160px',display:'flex',alignItems:'center',justifyContent:'center' }}>Устрашение</Col>
                        {charTableCell[8]}
                        {charTableCell[9]}
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                        {charTableCell[10]}
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                    <Col style={{color:'yellow', borderLeft: 'yellow solid 2px', height: '160px',display:'flex',alignItems:'center',justifyContent:'center' }}>Поддержка</Col>
                        {charTableCell[11]}
                        {charTableCell[12]}
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                        {charTableCell[13]}
                        {charTableCell[14]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                    <Col style={{color:'yellow', borderLeft: 'yellow solid 2px', height: '160px',display:'flex',alignItems:'center',justifyContent:'center' }}>Оборона</Col>
                        {charTableCell[15]}
                        {charTableCell[16]}
                        {charTableCell[17]}
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                    </Row>
                </StyledBox>}
                <StyledTitle fz='26px' align='center' color="yellow">{app.game === 'Genshin' ? 'Таблица персонажей по регионам' : 'Таблица персонажей по фракциям'}</StyledTitle>
                <StyledBox className="mt-3 mb-5">
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">{app.game === 'Genshin' ? 'Мондштадт' : 'Хитрые Зайцы'}</StyledTitle>{regionTableRow[0]}</StyledBox>
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">{app.game === 'Genshin' ? 'Ли Юэ' : 'Комбинат Белобог'}</StyledTitle>{regionTableRow[1]}</StyledBox>
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">{app.game === 'Genshin' ? 'Инадзума' : 'Виктория'}</StyledTitle>{regionTableRow[2]}</StyledBox>
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">{app.game === 'Genshin' ? 'Сумеру' : 'Отряд Обол'}</StyledTitle>{regionTableRow[3]}</StyledBox>
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">{app.game === 'Genshin' ? 'Фонтейн' : 'Секция 6'}</StyledTitle>{regionTableRow[4]}</StyledBox>
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">{app.game === 'Genshin' ? 'Натлан' : 'Угрозыск'}</StyledTitle>{regionTableRow[5]}</StyledBox>
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">{app.game === 'Genshin' ? 'Снежная' : 'Сыны Калидона'}</StyledTitle>{regionTableRow[6]}</StyledBox>
                </StyledBox>
            </Container>
        </>
    )
})
export default Statistic
import { useEffect, useState } from "react"
import { getEventStatistic, getStandartStatistic, getStatistic, getWeaponStatistic } from "../http/rollAPI"
import { StyledBox, StyledImg, StyledTitle } from "../styledComponents/styled-components"
import { Button, Col, Container, Row } from "react-bootstrap"
import { getCharFromColById, getCharStatistic, getCharsFromCol } from "../http/charAPI"
import onehand from '../img/weapons/1h.webp'

const Statistic = () => {
    const [sRolls, setSRolls] = useState([])
    const [eRolls, setERolls] = useState([])
    const [wRolls, setWRolls] = useState([])
    const [sort, setSort] = useState(false)
    const [charStatistic, setCharStatistic] = useState([])
    const [regionStatistic, setRegionStatistic] = useState([])
    const [col, setCol] = useState()
    useEffect(() => {
        getStandartStatistic().then(res => {
            res && setSRolls(res.data)
        })
        getEventStatistic().then(res => {
            res && setERolls(res.data)
        })
        getWeaponStatistic().then(res => {
            res && setWRolls(res.data)
        })
    }, [])
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])
    useEffect(() => {
        getCharsFromCol().then(res => {
            setCol(res.data.chars.map(e => e.id))
        })
        getCharStatistic().then(res => { setCharStatistic(res.data.elements.all); setRegionStatistic(res.data.regions.all) })
    }, [])
    const charTableCell = charStatistic?.map(
        e => <Col
            style={{ borderLeft: 'yellow solid 2px' }}>
            {e.chars.filter(
                i => sort ? col.some(c => c === i.id) : i
            ).map(
                i =>
                    <StyledImg opacity={col.some(e => e === i.id) ? '100%' : '30%'}
                        style={{ margin: '5px' }} width={'70px'}
                        src={process.env.REACT_APP_API_URL + '/chars/' + i.img} />)}
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
                        src={process.env.REACT_APP_API_URL + '/chars/' + i.img} />)}
        </Col>)

    const srollsComp = sRolls.filter(e => e._id.stars > 3).map(e => e._id.isChar ?
        <StyledBox className='mb-4'>
            <StyledImg width='65px' br='50%' bg={e._id.stars === 5 ? 'orange' : (e._id.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + '/chars/' + e._id.img} />
            <p style={{ position: 'absolute', top: '100%', right: '38%', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>x{e.count}</p>
        </StyledBox>
        :
        <StyledBox className='mb-4'>
            <StyledImg width='65px' br='50%' bg={e._id.stars === 5 ? 'orange' : (e._id.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + '/weapons/' + e._id.img} />
            <p style={{ position: 'absolute', top: '100%', right: '38%', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>x{e.count}</p>
        </StyledBox>)
    const erollsComp = eRolls.filter(e => e._id.stars > 3).map(e => e._id.isChar ?
        <StyledBox className='mb-4'>
            <StyledImg width='65px' br='50%' bg={e._id.stars === 5 ? 'orange' : (e._id.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + '/chars/' + e._id.img} />
            <p style={{ position: 'absolute', top: '100%', right: '38%', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>x{e.count}</p>
        </StyledBox>
        :
        <StyledBox className='mb-4'>
            <StyledImg width='65px' br='50%' bg={e._id.stars === 5 ? 'orange' : (e._id.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + '/weapons/' + e._id.img} />
            <p style={{ position: 'absolute', top: '100%', right: '38%', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>x{e.count}</p>
        </StyledBox>)
    const wrollsComp = wRolls.filter(e => e._id.stars > 3).map(e => e._id.isChar ?
        <StyledBox className='mb-4'>
            <StyledImg width='65px' br='50%' bg={e._id.stars === 5 ? 'orange' : (e._id.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + '/chars/' + e._id.img} />
            <p style={{ position: 'absolute', top: '100%', right: '38%', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>x{e.count}</p>
        </StyledBox>
        :
        <StyledBox className='mb-4'>
            <StyledImg width='65px' br='50%' bg={e._id.stars === 5 ? 'orange' : (e._id.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + '/weapons/' + e._id.img} />
            <p style={{ position: 'absolute', top: '100%', right: '38%', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>x{e.count}</p>
        </StyledBox>)
    return (
        <>
            <Container className="mt-3">
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
                <StyledBox className='mt-3 mb-5'>
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
                </StyledBox>
                <StyledTitle fz='26px' align='center' color="yellow">Таблица персонажей по регионам</StyledTitle>
                <StyledBox className="mt-3 mb-5">
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">Мондштадт</StyledTitle>{regionTableRow[0]}</StyledBox>
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">Ли Юэ</StyledTitle>{regionTableRow[1]}</StyledBox>
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">Инадзума</StyledTitle>{regionTableRow[2]}</StyledBox>
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">Сумеру</StyledTitle>{regionTableRow[3]}</StyledBox>
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">Фонтейн</StyledTitle>{regionTableRow[4]}</StyledBox>
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">Натлан</StyledTitle>{regionTableRow[5]}</StyledBox>
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">Снежная</StyledTitle>{regionTableRow[6]}</StyledBox>
                </StyledBox>
            </Container>
        </>
    )
}
export default Statistic
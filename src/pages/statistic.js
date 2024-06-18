import { useEffect, useState } from "react"
import { getEventStatistic, getStandartStatistic, getStatistic, getWeaponStatistic } from "../http/rollAPI"
import { StyledBox, StyledImg, StyledTitle } from "../styledComponents/styled-components"
import { Col, Container, Row } from "react-bootstrap"
import { getCharFromColById, getCharStatistic, getCharsFromCol } from "../http/charAPI"


const Statistic = () => {
    const [sRolls, setSRolls] = useState([])
    const [eRolls, setERolls] = useState([])
    const [wRolls, setWRolls] = useState([])
    const [charara, setCharara] = useState([])
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
        getCharsFromCol().then(res => {
            setCol(res.data.chars.map(e => e.id))
        })
        getCharStatistic().then(res => setCharara(res.data.elements.all))
    }, [])
    const chururu = charara?.map(e => <Col style={{ borderLeft: 'yellow solid 2px' }}>{e.chars.map(i => <StyledImg opacity={col.some(e => e === i.id) ? '100%' : '30%'} style={{ margin: '5px' }} width={'70px'} src={process.env.REACT_APP_API_URL + '/chars/' + i.img} />)}</Col>)
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
                        <Col style={{ color: 'yellow', textAlign: 'center',borderLeft: 'yellow solid 2px' }}>Анемо</Col>
                        <Col style={{ color: 'yellow', textAlign: 'center',borderLeft: 'yellow solid 2px' }}>Гео</Col>
                        <Col style={{ color: 'yellow', textAlign: 'center',borderLeft: 'yellow solid 2px' }}>Электро</Col>
                        <Col style={{ color: 'yellow', textAlign: 'center',borderLeft: 'yellow solid 2px' }}>Дендро</Col>
                        <Col style={{ color: 'yellow', textAlign: 'center',borderLeft: 'yellow solid 2px' }}>Гидро</Col>
                        <Col style={{ color: 'yellow', textAlign: 'center',borderLeft: 'yellow solid 2px' }}>Пиро</Col>
                        <Col style={{ color: 'yellow', textAlign: 'center',borderLeft: 'yellow solid 2px' }}>Крио</Col>
                    </Row>
                    <Row  style={{ border: 'yellow solid 2px' }}>
                        {chururu[0]}
                        {chururu[1]}
                        {chururu[2]}
                        {chururu[3]}
                        {chururu[4]}
                        {chururu[5]}
                        {chururu[6]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        {chururu[7]}
                        {chururu[8]}
                        {chururu[9]}
                        {chururu[10]}
                        <Col style={{ borderLeft: 'yellow solid 2px',height:'160px' }}></Col>
                        {chururu[11]}
                        {chururu[12]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        {chururu[13]}
                        {chururu[14]}
                        {chururu[15]}
                        {chururu[16]}
                        {chururu[17]}
                        {chururu[18]}
                        {chururu[19]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        {chururu[20]}
                        {chururu[21]}
                        {chururu[22]}
                        {chururu[23]}
                        {chururu[24]}
                        {chururu[25]}
                        {chururu[26]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        {chururu[27]}
                        {chururu[28]}
                        {chururu[29]}
                        {chururu[30]}
                        {chururu[31]}
                        {chururu[32]}
                        {chururu[33]}
                    </Row>
                </StyledBox>
            </Container>
        </>
    )
}
export default Statistic
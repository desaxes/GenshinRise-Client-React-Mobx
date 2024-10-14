import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { observer } from 'mobx-react-lite';
import { getBanner } from '../../http/bannerAPI';
import { StyledImg, StyledTitle } from '../../styledComponents/styled-components';
import { getCharById } from '../../http/charAPI';
import { Col, Row } from 'react-bootstrap';
import { getEventRollsForBanner } from '../../http/rollAPI';
import { AppContext } from '../..';
import { getZzzBanner } from '../../http/zzz/bannerAPI';
import { getZzzCharById } from '../../http/zzz/charAPI';
import { getZzzEventRollsForBanner } from '../../http/zzz/rollAPI';
export const BannerModal = observer((props) => {
    const [banner, setBanner] = useState()
    const [rolls, setRolls] = useState()
    const [char1, setChar1] = useState()
    const [char2, setChar2] = useState()
    const [epicChar1, setEpicChar1] = useState()
    const [epicChar2, setEpicChar2] = useState()
    const [epicChar3, setEpicChar3] = useState()
    const { app } = useContext(AppContext)
    useEffect(() => {
        if (app.game === 'Genshin') {
            getBanner(props.id).then(res => {
                setBanner(res.data)
                getCharById(res.data.charId1).then(res => setChar1(res.data))
                getCharById(res.data.charId2).then(res => setChar2(res.data))
                getCharById(res.data.epicCharId1).then(res => setEpicChar1(res.data))
                getCharById(res.data.epicCharId2).then(res => setEpicChar2(res.data))
                getCharById(res.data.epicCharId3).then(res => setEpicChar3(res.data))
                getEventRollsForBanner(res.data.year, res.data.lmonth, res.data.lday, res.data.hmonth, res.data.hday).then(res => setRolls(res.data))
            })
        }
        if (app.game === 'Zzz') {
            getZzzBanner(props.id).then(res => {
                setBanner(res.data)
                getZzzCharById(res.data.charId1).then(res => setChar1(res.data))
                getZzzCharById(res.data.charId2).then(res => setChar2(res.data))
                getZzzCharById(res.data.epicCharId1).then(res => setEpicChar1(res.data))
                getZzzCharById(res.data.epicCharId2).then(res => setEpicChar2(res.data))
                getZzzCharById(res.data.epicCharId3).then(res => setEpicChar3(res.data))
                getZzzEventRollsForBanner(res.data.year, res.data.lmonth, res.data.lday, res.data.hmonth, res.data.hday).then(res => setRolls(res.data))
            })
        }
    }, [])
    const rewards = rolls?.rolls.map(e => <Col className='mt-3'>
        <StyledImg width='65px' br='50%' bg={e.stars === 5 ? 'orange' : '#4600f6'} src={process.env.REACT_APP_API_URL + (e.isChar ? (app.game === 'Genshin' ? "/chars/" : '/zzz/chars/') : (app.game === 'Genshin' ? "/weapons/" : '/zzz/weapons/')) + e.img} />
    </Col>)
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ paddingTop: '70px', paddingBottom: '70px' }}
        >
            <Modal.Header closeButton style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'yellow' }}>
                    Патч {banner?.patchNumber} - c {banner?.lday}.{banner?.lmonth}.{banner?.year} по {banner?.hday}.{banner?.hmonth}.{banner?.year}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow', flexDirection: 'column' }}>
                <StyledTitle align='center' fz='24px' color='yellow'>Персонажи</StyledTitle>
                <Row md={'auto'} className='mt-3 mb-3 d-flex justify-content-center'
                >
                    <Col style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
                        <StyledImg width='65px' br='50%' bg={'orange'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : '/zzz/chars/') + char1?.img} />
                        <StyledTitle align='center' fz='16px' color='yellow'>{char1?.name}</StyledTitle>
                    </Col>
                    {char2 && <Col style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
                        <StyledImg width='65px' br='50%' bg={'orange'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : '/zzz/chars/') + char2?.img} />
                        <StyledTitle align='center' fz='16px' color='yellow'>{char2?.name}</StyledTitle>
                    </Col>}
                    <Col style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
                        <StyledImg width='65px' br='50%' bg={'#4600f6'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : '/zzz/chars/') + epicChar1?.img} />
                        <StyledTitle align='center' fz='16px' color='yellow'>{epicChar1?.name}</StyledTitle>
                    </Col>
                    <Col style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
                        <StyledImg width='65px' br='50%' bg={'#4600f6'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : '/zzz/chars/') + epicChar2?.img} />
                        <StyledTitle align='center' fz='16px' color='yellow'>{epicChar2?.name}</StyledTitle>
                    </Col>
                    {epicChar3 && <Col style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'10px'}}>
                        <StyledImg width='65px' br='50%' bg={'#4600f6'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : '/zzz/chars/') + epicChar3?.img} />
                        <StyledTitle align='center' fz='16px' color='yellow'>{epicChar3?.name}</StyledTitle>
                    </Col>}
                </Row>
                <StyledTitle align='center' fz='24px' color='yellow'>Полученные Награды</StyledTitle>
                <Row md={'auto'} className='mt-3 mb-3 d-flex justify-content-center'
                >
                    {rewards}
                </Row>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow' }}>
                <StyledTitle align='center' fz='24px' color='yellow'> Получено Наград: {rewards?.length}</StyledTitle>
                <StyledTitle align='center' fz='24px' color='yellow'> Потрачено Молитв: {rolls?.total}</StyledTitle>
            </Modal.Footer>
        </Modal>)
})
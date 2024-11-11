import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { observer } from 'mobx-react-lite';
import { getBanner } from '../../http/bannerAPI';
import { StyledImg, StyledTitle } from '../../styledComponents/styled-components';
import { getCharById } from '../../http/charAPI';
import { Col, Row } from 'react-bootstrap';
import { getEventRollsForBanner, getWeaponRollsForBanner } from '../../http/rollAPI';
import { AppContext } from '../..';
import { getZzzBanner } from '../../http/zzz/bannerAPI';
import { getZzzCharById } from '../../http/zzz/charAPI';
import { getZzzEventRollsForBanner, getZzzWeaponRollsForBanner } from '../../http/zzz/rollAPI';
import { getHonkaiBanner } from '../../http/honkai/bannerAPI';
import { getHonkaiCharById } from '../../http/honkai/charAPI';
import { getHonkaiEventRollsForBanner, getHonkaiWeaponRollsForBanner } from '../../http/honkai/rollAPI';
export const BannerModal = observer((props) => {
    const [banner, setBanner] = useState()
    const [rolls, setRolls] = useState({ rolls: [], total: 0 })
    const [wRolls, setWRolls] = useState({ rolls: [], total: 0 })
    const [char1, setChar1] = useState()
    const [char2, setChar2] = useState()
    const [char3, setChar3] = useState()
    const [char4, setChar4] = useState()
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
                getWeaponRollsForBanner(res.data.year, res.data.lmonth, res.data.lday, res.data.hmonth, res.data.hday).then(res => setWRolls(res.data))
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
                getZzzWeaponRollsForBanner(res.data.year, res.data.lmonth, res.data.lday, res.data.hmonth, res.data.hday).then(res => setWRolls(res.data))
            })
        }
        if (app.game === 'Honkai') {
            getHonkaiBanner(props.id).then(res => {
                setBanner(res.data)
                getHonkaiCharById(res.data.charId1).then(res => setChar1(res.data))
                getHonkaiCharById(res.data.charId2).then(res => setChar2(res.data))
                getHonkaiCharById(res.data.charId3).then(res => setChar3(res.data))
                getHonkaiCharById(res.data.charId4).then(res => setChar4(res.data))
                getHonkaiCharById(res.data.epicCharId1).then(res => setEpicChar1(res.data))
                getHonkaiCharById(res.data.epicCharId2).then(res => setEpicChar2(res.data))
                getHonkaiCharById(res.data.epicCharId3).then(res => setEpicChar3(res.data))
                getHonkaiEventRollsForBanner(res.data.year, res.data.lmonth, res.data.lday, res.data.hmonth, res.data.hday).then(res => setRolls(res.data))
                getHonkaiWeaponRollsForBanner(res.data.year, res.data.lmonth, res.data.lday, res.data.hmonth, res.data.hday).then(res => setWRolls(res.data))
            })
        }
    }, [app.game, props.id])
    const rewards = rolls?.rolls.map(e => <Col className='mt-3'>
        <StyledImg height={app.game === 'Honkai' && '90px'} width='65px' br={app.game !== 'Honkai' ? '50%' : '16px'} bg={e.stars === 5 ? 'orange' : '#4600f6'} src={process.env.REACT_APP_API_URL + (e.isChar ? (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) : (app.game === 'Genshin' ? "/weapons/" : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/'))) + e.img} />
    </Col>)
    const wRewards = wRolls?.rolls.map(e => <Col className='mt-3'>
        <StyledImg height={app.game === 'Honkai' && '90px'} width='65px' br={app.game !== 'Honkai' ? '50%' : '16px'} bg={e.stars === 5 ? 'orange' : '#4600f6'} src={process.env.REACT_APP_API_URL + (e.isChar ? (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) : (app.game === 'Genshin' ? "/weapons/" : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/'))) + e.img} />
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
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <StyledImg height={app.game === 'Honkai' && '90px'} width='65px' br={app.game !== 'Honkai' ? '50%' : '16px'} bg={'orange'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + char1?.img} />
                        <StyledTitle align='center' fz='16px' color='yellow'>{char1?.name}</StyledTitle>
                    </Col>
                    {char2 && <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <StyledImg height={app.game === 'Honkai' && '90px'} width='65px' br={app.game !== 'Honkai' ? '50%' : '16px'} bg={'orange'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + char2?.img} />
                        <StyledTitle align='center' fz='16px' color='yellow'>{char2?.name}</StyledTitle>
                    </Col>}
                    {char3 && <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <StyledImg height={app.game === 'Honkai' && '90px'} width='65px' br={app.game !== 'Honkai' ? '50%' : '16px'} bg={'orange'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + char3?.img} />
                        <StyledTitle align='center' fz='16px' color='yellow'>{char3?.name}</StyledTitle>
                    </Col>}
                    {char4 && <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <StyledImg height={app.game === 'Honkai' && '90px'} width='65px' br={app.game !== 'Honkai' ? '50%' : '16px'} bg={'orange'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + char4?.img} />
                        <StyledTitle align='center' fz='16px' color='yellow'>{char4?.name}</StyledTitle>
                    </Col>}
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <StyledImg height={app.game === 'Honkai' && '90px'} width='65px' br={app.game !== 'Honkai' ? '50%' : '16px'} bg={'#4600f6'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + epicChar1?.img} />
                        <StyledTitle align='center' fz='16px' color='yellow'>{epicChar1?.name}</StyledTitle>
                    </Col>
                    <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <StyledImg height={app.game === 'Honkai' && '90px'} width='65px' br={app.game !== 'Honkai' ? '50%' : '16px'} bg={'#4600f6'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + epicChar2?.img} />
                        <StyledTitle align='center' fz='16px' color='yellow'>{epicChar2?.name}</StyledTitle>
                    </Col>
                    {epicChar3 && <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                        <StyledImg height={app.game === 'Honkai' && '90px'} width='65px' br={app.game !== 'Honkai' ? '50%' : '16px'} bg={'#4600f6'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + epicChar3?.img} />
                        <StyledTitle align='center' fz='16px' color='yellow'>{epicChar3?.name}</StyledTitle>
                    </Col>}
                </Row>
                <StyledTitle align='center' fz='24px' color='yellow'>Полученные Награды</StyledTitle>
                <Row md={'auto'} className='mt-3 mb-3 d-flex justify-content-center'
                >
                    {rolls.rolls.length && <StyledTitle style={{ width: '100%', marginTop: '15px' }} align='center' fz='18px' color='yellow'>Ивентовый Баннер</StyledTitle>}
                    {rewards}
                    {wRolls.rolls.length && <StyledTitle style={{ width: '100%', marginTop: '15px' }} align='center' fz='18px' color='yellow'>Оружейный Баннер</StyledTitle>}
                    {wRewards}
                </Row>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", flexDirection: 'column', justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow' }}>
                <StyledTitle align='center' fz='24px' color='yellow'> Получено Наград: {rewards?.length + wRewards?.length}</StyledTitle>
                <StyledTitle align='center' fz='24px' color='yellow'> Потрачено Молитв: {rolls?.total + wRolls?.total}</StyledTitle>
            </Modal.Footer>
        </Modal>)
})
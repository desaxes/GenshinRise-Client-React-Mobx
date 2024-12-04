import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Col, Row } from 'react-bootstrap/esm/';
import { getCharsFromRise, getMaxValues, removeCharFromRise, removeMaxValues, updateCharFromRise } from '../../http/charAPI';
import { RiseBar } from './../riseBar';
import { StyledImg, StyledTitle } from '../../styledComponents/styled-components';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { getZzzCharsFromRise, removeZzzCharFromRise, updateZzzCharFromRise } from '../../http/zzz/charAPI';
import { getHonkaiCharsFromRise, removeHonkaiCharFromRise, updateHonkaiCharFromRise } from '../../http/honkai/charAPI';
import { Link } from 'react-router-dom';
export const RisingModal = observer((props) => {
    const { chars, app } = useContext(AppContext)
    const char = chars.chars.chars.find(e => e.id === props.charId)
    const [stone1, setStone1] = useState(char && char.stone1count)
    const [stone2, setStone2] = useState(char && char.stone2count)
    const [stone3, setStone3] = useState(char && char.stone3count)
    const [stone4, setStone4] = useState(char && char.stone4count)
    const [spec, setSpec] = useState(char && char.localSpecialtyCount)
    const [emat1, setEmat1] = useState(char && char.enemyMaterial1Count)
    const [emat2, setEmat2] = useState(char && char.enemyMaterial2Count)
    const [emat3, setEmat3] = useState(char && char.enemyMaterial3Count)
    const [bmat, setBmat] = useState(char && char.bossMaterialCount)
    const [ematTalent1, setEmatTalent1] = useState(char && char.enemyMaterial1CountForTalent)
    const [ematTalent2, setEmatTalent2] = useState(char && char.enemyMaterial2CountForTalent)
    const [ematTalent3, setEmatTalent3] = useState(char && char.enemyMaterial3CountForTalent)
    const [talent1, setTalent1] = useState(char && char.talentMaterial1Count)
    const [talent2, setTalent2] = useState(char && char.talentMaterial2Count)
    const [talent3, setTalent3] = useState(char && char.talentMaterial3Count)
    const [wbmat, setWbmat] = useState(char && char.weekBossMaterialCount)
    const [max, setMax] = useState()
    const [currentGame, setCurrentGame] = useState(props.currentGame)
    useEffect(() => {
        if (app.game != currentGame) {
            props.onHide()
        }
    }, [app.game])
    const saveResult = () => {
        if (app.game === 'Genshin') {
            updateCharFromRise({
                id: char.id,
                s1: stone1,
                s2: stone2,
                s3: stone3,
                s4: stone4,
                spec: spec,
                emat1: emat1,
                emat2: emat2,
                emat3: emat3,
                ematT1: ematTalent1,
                ematT2: ematTalent2,
                ematT3: ematTalent3,
                bmat: bmat,
                tal1: talent1,
                tal2: talent2,
                tal3: talent3,
                wbmat: wbmat
            }).then(res => {
                getCharsFromRise().then(res => {
                    chars.setChars(res.data)
                    props.onHide()
                })
            })
        }
        else if (app.game === 'Zzz') {
            updateZzzCharFromRise({
                id: char.id,
                emat1: emat1,
                emat2: emat2,
                emat3: emat3,
                bmat: bmat,
                tal1: talent1,
                tal2: talent2,
                tal3: talent3,
                wbmat: wbmat
            }).then(res => {
                getZzzCharsFromRise().then(res => {
                    chars.setChars(res.data)
                    props.onHide()
                })
            })
        }
        else if (app.game === 'Honkai') {
            updateHonkaiCharFromRise({
                id: char.id,
                emat1: emat1,
                emat2: emat2,
                emat3: emat3,
                bmat: bmat,
                tal1: talent1,
                tal2: talent2,
                tal3: talent3,
                wbmat: wbmat
            }).then(res => {
                getHonkaiCharsFromRise().then(res => {
                    chars.setChars(res.data)
                    props.onHide()
                })
            })
        }
    }
    const removeChar = () => {
        if (app.game === 'Genshin') {
            removeCharFromRise(props.charId).then(res => {
                getCharsFromRise().then(res => {
                    chars.setChars(res.data)
                    props.onHide()
                    removeMaxValues(props.charId)
                })
            })
        }
        else if (app.game === 'Zzz') {
            removeZzzCharFromRise(props.charId).then(res => {
                getZzzCharsFromRise().then(res => {
                    chars.setChars(res.data)
                    props.onHide()
                })
            })
        }
        else if (app.game === 'Honkai') {
            removeHonkaiCharFromRise(props.charId).then(res => {
                getHonkaiCharsFromRise().then(res => {
                    chars.setChars(res.data)
                    props.onHide()
                })
            })
        }
    }
    useEffect(() => {
        if (app.game === 'Genshin') {
            getMaxValues().then(res => {
                setMax(res.data.find(e => e.id === props.charId))
            })
        }
    }, [])
    if (char) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                style={{ paddingTop: '70px', paddingBottom: '70px' }}
            >
                <Modal.Header style={{ backgroundColor: '#212529', border: '2px solid yellow' }} closeButton>
                    <Modal.Title style={{ color: 'yellow' }} id="contained-modal-title-vcenter" >
                        {char.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{
                        display: "flex",
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                        backgroundColor: '#212529',
                        border: '2px solid yellow'
                    }}>
                    <StyledImg width={'125px'} bg={char.stars === 5 ? 'orange' : '#4600f6'} src={process.env.REACT_APP_API_URL + ((app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + char.img)}></StyledImg>
                    <StyledTitle color='yell' fz='24px'>Персонаж</StyledTitle>
                    <Row md={'auto'}>
                        <Col md={'auto'}>
                            {app.game === 'Genshin' && <RiseBar
                                counter={setStone1}
                                materialBase={1} materialId={char.stoneTypeId} quality={1} current={stone1} max={max ? max.stone1count : 1} />}
                            {app.game === 'Genshin' && <RiseBar
                                counter={setStone2}
                                materialBase={1} materialId={char.stoneTypeId} quality={2} current={stone2} max={max ? max.stone2count : 9} />}
                            {app.game === 'Genshin' && <RiseBar
                                counter={setStone3}
                                materialBase={1} materialId={char.stoneTypeId} quality={3} current={stone3} max={max ? max.stone3count : 9} />}
                            {app.game === 'Genshin' && <RiseBar
                                counter={setStone4}
                                materialBase={1} materialId={char.stoneTypeId} quality={4} current={stone4} max={max ? max.stone4count : 6} />}
                            <RiseBar
                                counter={setBmat}
                                materialBase={4} materialId={char.bossMaterialId} quality={0} current={bmat} max={max ? max.bossMaterialCount : (app.game === 'Genshin' ? 46 : (app.game === 'Zzz' ? 60 : 65))} />
                        </Col>
                        <Col md={'auto'}>
                            <RiseBar
                                counter={setEmat1}
                                materialBase={3} materialId={char.enemyMaterialId} quality={1} current={emat1} max={max ? max.enemyMaterial1Count : (app.game === 'Genshin' ? 18 : (app.game === 'Zzz' ? 4 : 56))} />
                            <RiseBar
                                counter={setEmat2}
                                materialBase={3} materialId={char.enemyMaterialId} quality={2} current={emat2} max={max ? max.enemyMaterial2Count : (app.game === 'Genshin' ? 30 : (app.game === 'Zzz' ? 32 : 71))} />
                            <RiseBar
                                counter={setEmat3}
                                materialBase={3} materialId={char.enemyMaterialId} quality={3} current={emat3} max={max ? max.enemyMaterial3Count : (app.game === 'Genshin' ? 36 : (app.game === 'Zzz' ? 30 : 73))} />
                            {app.game === 'Genshin' && <RiseBar
                                counter={setSpec}
                                materialBase={2} materialId={char.localSpecialtyId} quality={0} current={spec} max={max ? max.localSpecialtyCount : 168} />}
                        </Col>
                    </Row>

                    <StyledTitle color='yell' fz='24px'>Таланты</StyledTitle>
                    <Row md={'auto'}>
                        <Col md={'auto'}>
                            {app.game === 'Genshin' && < RiseBar
                                counter={setEmatTalent1}
                                materialBase={3} materialId={char.enemyMaterialId} quality={1} current={ematTalent1} max={max ? max.enemyMaterial1CountForTalent : 18} />}
                            {app.game === 'Genshin' && < RiseBar
                                counter={setEmatTalent2}
                                materialBase={3} materialId={char.enemyMaterialId} quality={2} current={ematTalent2} max={max ? max.enemyMaterial2CountForTalent : 66} />}
                            {app.game === 'Genshin' && < RiseBar
                                counter={setEmatTalent3}
                                materialBase={3} materialId={char.enemyMaterialId} quality={3} current={ematTalent3} max={max ? max.enemyMaterial3CountForTalent : 93} />}
                            <RiseBar
                                counter={setWbmat}
                                materialBase={6} materialId={char.weekBossMaterialId} quality={0} current={wbmat} max={max ? max.weekBossMaterialCount : (app.game === 'Genshin' ? 18 : (app.game === 'Zzz' ? 9 : 12))} />
                        </Col>
                        <Col md={'auto'}>
                            <RiseBar
                                counter={setTalent1}
                                materialBase={5} materialId={char.talentMaterialId} quality={1} current={talent1} max={max ? max.talentMaterial1Count : (app.game === 'Genshin' ? 9 : (app.game === 'Zzz' ? 25 : 18))} />
                            <RiseBar
                                counter={setTalent2}
                                materialBase={5} materialId={char.talentMaterialId} quality={2} current={talent2} max={max ? max.talentMaterial2Count : (app.game === 'Genshin' ? 63 : (app.game === 'Zzz' ? 75 : 69))} />
                            <RiseBar
                                counter={setTalent3}
                                materialBase={5} materialId={char.talentMaterialId} quality={3} current={talent3} max={max ? max.talentMaterial3Count : (app.game === 'Genshin' ? 114 : (app.game === 'Zzz' ? 250 : 139))} />
                        </Col>
                    </Row>
                    <Row style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '50px' }}>
                        <Col style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '10px' }} md='auto'>
                            <img style={{ width: '75px', height: '75px' }} src={process.env.REACT_APP_API_URL + '/resources/' + app.game + '/money.webp'} />
                            <StyledTitle color='yellow' fz='18px'>{app.game === 'Genshin' ? (7050030) : (app.game === 'Honkai' ? (char.stars === 5 ? 3888000 : 3226400) : (3700000))}</StyledTitle>
                        </Col>
                        <Col style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '10px' }} md='auto'>
                            <img style={{ width: '75px', height: '75px' }} src={process.env.REACT_APP_API_URL + '/resources/' + app.game + '/charExp.webp'} />
                            <StyledTitle color='yellow' fz='18px'>{app.game === 'Genshin' ? (419) : (app.game === 'Honkai' ? (290) : (300))}</StyledTitle>
                        </Col>
                        <Col style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', gap: '10px' }} md='auto'>
                            <img style={{ width: '75px', height: '75px' }} src={process.env.REACT_APP_API_URL + '/resources/' + app.game + '/talMat.webp'} />
                            <StyledTitle color='yellow' fz='18px'>{app.game === 'Genshin' ? (3) : (app.game === 'Honkai' ? (char.stars === 5 ? 8 : 5) : (5))}</StyledTitle>
                        </Col>
                    </Row>
                    <Row style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '10px' }}>
                        <Col style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }} md='auto'>
                            <StyledTitle mar='0' color='yellow' fz='18px'>+Артефакты ({app.game === 'Genshin' ? 'x5 * 270 k' : (app.game === 'Honkai' ? 'x6 * 114 k' : 'x6 * ')}) = {app.game === 'Genshin' ? ('1.3 m') : (app.game === 'Honkai' ? '684 k' : (3700000))}</StyledTitle>
                            <img style={{ width: '35px', height: '35px' }} src={process.env.REACT_APP_API_URL + '/resources/' + app.game + '/money.webp'} />
                        </Col>
                    </Row>
                    <Row style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '10px' }}>
                        <Col style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }} md='auto'>
                            <StyledTitle mar='0' color='yellow' fz='18px'>+Оружие = {app.game === 'Genshin' ? ('750 k - 1.1 m') : (app.game === 'Honkai' ? ('707 k - 883 k') : ('320 k'))}</StyledTitle>
                            <img style={{ width: '35px', height: '35px' }} src={process.env.REACT_APP_API_URL + '/resources/' + app.game + '/money.webp'} />
                        </Col>
                    </Row>
                    <Row style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '10px' }}>
                        <Col style={{ alignItems: 'center', display: 'flex', flexDirection: 'row' }} md='auto'>
                            <StyledTitle mar='0' color='yellow' fz='18px'>Общее = {app.game === 'Genshin' ? ('9.5 m') : (app.game === 'Honkai' ? ('5.4 m') : ('320 k'))}</StyledTitle>
                            <img style={{ width: '35px', height: '35px' }} src={process.env.REACT_APP_API_URL + '/resources/' + app.game + '/money.webp'} />
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer style={{ display: "flex", justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow' }}>
                    <Button variant='outline-warning' onClick={saveResult}>Сохранить</Button>
                    <Button variant='outline-danger'><Link style={{ textDecoration: 'none', color: 'white' }} to={
                        app.game === 'Genshin' ? 'https://act.hoyolab.com/ys/event/calculator-sea/?lang=ru-ru#/character' :
                            (app.game === 'Honkai' ? 'https://act.hoyolab.com/sr/event/calculator/index.html?hyl_presentation_style=fullscreen&utm_campaign=calculator&utm_id=6&utm_medium=tools&utm_source=hoyolab&lang=ru-ru&bbs_theme=dark&bbs_theme_device=1#/home?target=Character' :
                                'https://zzz.seelie.me/characters'
                            )
                    }>Калькулятор</Link></Button>
                    <Button variant='outline-danger' onClick={removeChar}>Удалить Персонажа</Button>
                    <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>)
    }
})
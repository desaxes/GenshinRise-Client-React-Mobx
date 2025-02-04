import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Col, Row } from 'react-bootstrap/esm/';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { StyledBox, StyledTitle } from '../../styledComponents/styled-components';
import { addWeaponToCol, getWeaponById, getWeaponFromColById, removeWeaponFromCol } from '../../http/weaponAPI';
import { addZzzWeaponToCol, getZzzWeaponById, getZzzWeaponFromColById, removeZzzWeaponFromCol } from '../../http/zzz/weaponAPI';
import { addHonkaiWeaponToCol, getHonkaiWeaponById, getHonkaiWeaponFromColById, removeHonkaiWeaponFromCol } from '../../http/honkai/weaponAPI';
import { getCharForWeapon } from '../../http/charAPI';
import { getHonkaiCharForWeapon } from '../../http/honkai/charAPI';
import { getZzzCharForWeapon } from '../../http/zzz/charAPI';
export const WeaponOptionsForCollection = observer((props) => {
    const { app, chars } = useContext(AppContext)
    const [weapon, setWeapon] = useState()
    const [owner, setOwner] = useState()

    const [disableCol, setDisableCol] = useState(false)
    const [info, setInfo] = useState('')
    const [attack, setAttack] = useState('')
    const [def, setDef] = useState('')
    const [hp, setHp] = useState('')
    const [propValue, setPropValue] = useState('')
    const [prop, setProp] = useState({ id: 0, name: '' })
    const [currentGame, setCurrentGame] = useState(props.currentGame)

    useEffect(() => {
        if (app.game !== currentGame) {
            props.onHide()
        }
    }, [app.game])
    useEffect(() => {
        let getWeapon
        let getOwner
        switch (app.game) {
            case 'Genshin':
                getWeapon = getWeaponById
                getOwner = getCharForWeapon
                break;
            case 'Honkai':
                getWeapon = getHonkaiWeaponById
                getOwner = getHonkaiCharForWeapon
                break;
            case 'Zzz':
                getWeapon = getZzzWeaponById
                getOwner = getZzzCharForWeapon
                break;
            default:
                break;
        }
        getWeapon(props.weaponId).then(res => {
            setWeapon(res.data)
            getOwner(props.weaponId).then(res => setOwner(res.data))
            if (res.data.weaponInfo) {
                if (res.data.weaponInfo.info) { setInfo(res.data.weaponInfo.info) }
                if (res.data.weaponInfo.attack) { setAttack(res.data.weaponInfo.attack) }
                if (res.data.weaponInfo.def) { setDef(res.data.weaponInfo.def) }
                if (res.data.weaponInfo.hp) { setHp(res.data.weaponInfo.hp) }
                if (res.data.weaponInfo.propValue) { setPropValue(res.data.weaponInfo.propValue) }
                if (res.data.weaponInfo.prop) { setProp(res.data.weaponInfo.prop) }
            }
        })
    }, [])
    const addToCol = () => {
        if (app.game === 'Genshin') {
            addWeaponToCol(weapon).then(res => setDisableCol(true))
        }
        else if (app.game === 'Zzz') {
            addZzzWeaponToCol(weapon).then(res => setDisableCol(true))
        }
        else if (app.game === 'Honkai') {
            addHonkaiWeaponToCol(weapon).then(res => setDisableCol(true))
        }
    }
    const removeFromCol = () => {
        if (app.game === 'Genshin') {
            removeWeaponFromCol(props.weaponId).then(res => setDisableCol(false))
        }
        else if (app.game === 'Zzz') {
            removeZzzWeaponFromCol(props.weaponId).then(res => setDisableCol(false))
        }
        else if (app.game === 'Honkai') {
            removeHonkaiWeaponFromCol(props.weaponId).then(res => setDisableCol(false))
        }
    }
    useEffect(() => {
        if (app.game === 'Genshin') {
            getWeaponFromColById(props.weaponId).then(res => { res.data && setDisableCol(true) })
        }
        else if (app.game === 'Zzz') {
            getZzzWeaponFromColById(props.weaponId).then(res => { res.data && setDisableCol(true) })
        }
        else if (app.game === 'Honkai') {
            getHonkaiWeaponFromColById(props.weaponId).then(res => { res.data && setDisableCol(true) })
        }
    }, [props.weaponId, app.game])
    let characters = chars.chars.chars?.filter(e => e.charInfo?.recWeapons?.some(w => w.id === props.weaponId))
    console.log(chars.chars.chars[0].name)
    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ textShadow: '2px 2px 2px black' }}
        >
            <Modal.Header closeButton style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'yellow' }}>
                    {weapon?.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow' }}>
                <StyledBox display='flex' gap='40px' dir='row' jstf='center' width='100%' padding='10px 50px' align='center'>

                    <StyledBox color='yellow' display='flex' dir='column' align='center'>
                        <StyledBox margin='0 0 16px 0' display='flex' dir='row' align='center' jstf='space-between' width='100%'>
                            <StyledBox padding='0 5px' display='flex' align='end' dir='row' style={{ background: weapon?.stars === 5 ? 'orange' : (weapon?.stars === 4 ? '#4600f6' : '#4682B4'), border: 'white 2px solid', borderRadius: '12px' }}>
                                <img style={{ width: '150px' }} alt='weapon' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : (app.game === 'Zzz' ? "/zzz/weapons/" : '/honkai/weapons/')) + weapon?.img}></img>
                                {owner && <StyledBox display='flex' dir='column' align='center'>
                                    <img style={{ height: app.game === 'Honkai' ? '125px' : '100px', width: '100px', borderRadius: '16px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + owner?.img}></img>
                                </StyledBox>}
                            </StyledBox>
                            <StyledBox style={{textShadow:weapon?.stars===4? '2px 2px 2px black': '2px 2px 2px white'}} display='flex' dir='column' align='center' border='2px solid white' br='16px' padding='24px' bg={weapon?.stars === 5 ? 'orange' : (weapon?.stars === 4 ? '#4600f6' : '#4682B4')} color={weapon?.stars === 5 ? 'black' : (weapon?.stars === 4 ? 'white' : 'black')}>
                                {attack && <StyledBox display='flex' gap='40px'>
                                    <StyledBox>
                                        <StyledTitle dec='underline' fz='24px'>Атака</StyledTitle>
                                        <StyledTitle fz='18px'>{attack}</StyledTitle>
                                    </StyledBox>
                                    {app.game === 'Honkai' && <StyledBox display='flex' gap='40px'>
                                        <StyledBox>
                                            <StyledTitle dec='underline' fz='24px'>HP</StyledTitle>
                                            <StyledTitle fz='18px'>{hp}</StyledTitle>
                                        </StyledBox>
                                        <StyledBox>
                                            <StyledTitle dec='underline' fz='24px'>Защита</StyledTitle>
                                            <StyledTitle fz='18px'>{def}</StyledTitle>
                                        </StyledBox>
                                    </StyledBox>}
                                </StyledBox>}
                                <StyledBox>
                                    <StyledTitle dec='underline' fz='24px'>{prop.name}</StyledTitle>
                                    <StyledTitle fz='18px'>{propValue}</StyledTitle>
                                </StyledBox>
                            </StyledBox>
                        </StyledBox>
                        {info && <StyledBox>
                            <StyledTitle fz='24px'>Способность</StyledTitle>
                            <StyledTitle fz='18px'>{info}</StyledTitle>
                        </StyledBox>}
                        <StyledBox gap='30px' display='flex' align='center' jstf='center' width='100%' margin='20px 0'>
                            {characters.length > 0 && <StyledBox display='flex' dir='column' align='center'>
                                <StyledTitle fz='18px'>Подходит Персонажам</StyledTitle>
                                <Row >
                                    {characters?.map(e =>
                                        <Col style={{ marginBottom: '10px' }}><img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px', background: e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4'), border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img}></img></Col>
                                    )}
                                </Row>
                            </StyledBox>}
                        </StyledBox>
                    </StyledBox>
                </StyledBox>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Button
                    variant={disableCol ? 'danger' : 'outline-warning'}
                    onClick={() => { disableCol ? removeFromCol() : addToCol() }}>
                    {disableCol ? 'Удалить из Коллекции' : 'Добавить в Коллекцию'}
                </Button>
                <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>)
})
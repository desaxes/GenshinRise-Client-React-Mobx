import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Col, Row } from 'react-bootstrap/esm/';
import { addCharToCol, addCharToRise, addMaxValues, getCharById, getCharFromColById, getCharFromRiseById, removeCharFromCol, removeCharFromRise, removeMaxValues, updateCharInfo } from '../../http/charAPI';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { Form, Dropdown } from 'react-bootstrap/esm/';
import { StyledBox, StyledTitle } from '../../styledComponents/styled-components';
import { addZzzCharToCol, addZzzCharToRise, getZzzCharById, getZzzCharFromColById, getZzzCharFromRiseById, removeZzzCharFromCol, removeZzzCharFromRise, updateZzzCharInfo } from '../../http/zzz/charAPI';
import { addHonkaiCharToCol, addHonkaiCharToRise, getHonkaiCharById, getHonkaiCharFromColById, getHonkaiCharFromRiseById, removeHonkaiCharFromCol, removeHonkaiCharFromRise, updateHonkaiCharInfo } from '../../http/honkai/charAPI';
import { genshinProps, honkaiProps, zzzProps } from '../../utils/props';
import { getBossMaterialById, getEnemyMaterialById, getLocalSpecialtyById, getStoneById, getTalentById, getWBMaterialById } from '../../http/materialAPI';
import { getHonkaiBossMaterialById, getHonkaiEnemyMaterialById, getHonkaiTalentById, getHonkaiWBMaterialById } from '../../http/honkai/materialAPI';
import { getZzzBossMaterialById, getZzzEnemyMaterialById, getZzzTalentById, getZzzWBMaterialById } from '../../http/zzz/materialAPI';

import clock from '../../img/arts/genshin/clock.webp'
import crown from '../../img/arts/genshin/crown.webp'
import goblet from '../../img/arts/genshin/goblet.webp'
import body from '../../img/arts/hsr/body.webp'
import feet from '../../img/arts/hsr/feet.webp'
import sphere from '../../img/arts/hsr/sphere.webp'
import rope from '../../img/arts/hsr/rope.webp'

export const CharOptions = observer((props) => {
    const [disableCol, setDisableCol] = useState(false)
    const [changeMats, setChangeMats] = useState(false)
    const [disableRise, setDisableRise] = useState(false)
    const [stone1, setStone1] = useState()
    const [stone2, setStone2] = useState()
    const [stone3, setStone3] = useState()
    const [stone4, setStone4] = useState()
    const [spec, setSpec] = useState()
    const [emat1, setEmat1] = useState()
    const [emat2, setEmat2] = useState()
    const [emat3, setEmat3] = useState()
    const [bmat, setBmat] = useState()
    const [ematTalent1, setEmatTalent1] = useState()
    const [ematTalent2, setEmatTalent2] = useState()
    const [ematTalent3, setEmatTalent3] = useState()
    const [talent1, setTalent1] = useState()
    const [talent2, setTalent2] = useState()
    const [talent3, setTalent3] = useState()
    const [wbmat, setWbmat] = useState()

    const [bm, setBm] = useState()
    const [em, setEm] = useState()
    const [wbm, setWbm] = useState()
    const [tm, setTm] = useState()
    const [lsm, setLsm] = useState()
    const [sm, setSm] = useState()

    const [weaponTooltip, setWeaponTooltip] = useState(false)
    const [artTooltip, setArtTooltip] = useState(false)
    const [weaponInfo, setWeaponInfo] = useState('')
    const [weaponName, setWeaponName] = useState('')
    const [weaponStars, setWeaponStars] = useState(0)
    const [artInfo1, setArtInfo1] = useState('')
    const [artInfo2, setArtInfo2] = useState('')
    const [artName, setArtName] = useState('')

    const [editor, setEditor] = useState(false)
    const [weapon, setWeapon] = useState()
    const [recWeapons, setRecWeapons] = useState([])
    const [firstArtSetfirstHalf, setFirstArtSetfirstHalf] = useState()
    const [firstArtSetSecondHalf, setFirstArtSetSecondHalf] = useState()
    const [secondArtSetfirstHalf, setSecondArtSetfirstHalf] = useState()
    const [secondArtSetSecondHalf, setSecondArtSetSecondHalf] = useState()
    const [thirdArtSetfirstHalf, setThirdArtSetfirstHalf] = useState()
    const [thirdArtSetSecondHalf, setThirdArtSetSecondHalf] = useState()
    const [firstPlanarSet, setFirstPlanarSet] = useState()
    const [secondPlanarSet, setSecondPlanarSet] = useState()
    const [thirdPlanarSet, setThirdPlanarSet] = useState()
    const [charProps, setCharProps] = useState([])
    const [firstArtProp, setFirstArtProp] = useState({ id: 0, name: '' })
    const [secondArtProp, setSecondArtProp] = useState({ id: 0, name: '' })
    const [thirdArtProp, setThirdArtProp] = useState({ id: 0, name: '' })
    const [fourthArtProp, setFourthArtProp] = useState({ id: 0, name: '' })
    const [firstTeam, setFirstTeam] = useState([])
    const [secondTeam, setSecondTeam] = useState([])
    const [thirdTeam, setThirdTeam] = useState([])
    const [info, setInfo] = useState('')
    const [char, setChar] = useState()
    const [update, setUpdate] = useState(false)
    const [currentGame, setCurrentGame] = useState(props.currentGame)
    const addToCol = () => {
        if (app.game === "Genshin") {
            addCharToCol(char).then(res => setDisableCol(true))
        }
        else if (app.game === 'Zzz') {
            addZzzCharToCol(char).then(res => setDisableCol(true))
        }
        else if (app.game === 'Honkai') {
            addHonkaiCharToCol(char).then(res => setDisableCol(true))
        }
    }
    const addToRise = () => {
        if (changeMats) {
            addMaxValues({
                id: char.id,
                s1: stone1 || 0,
                s2: stone2 || 0,
                s3: stone3 || 0,
                s4: stone4 || 0,
                spec: spec || 0,
                emat1: emat1 || 0,
                emat2: emat2 || 0,
                emat3: emat3 || 0,
                ematT1: ematTalent1 || 0,
                ematT2: ematTalent2 || 0,
                ematT3: ematTalent3 || 0,
                bmat: bmat || 0,
                tal1: talent1 || 0,
                tal2: talent2 || 0,
                tal3: talent3 || 0,
                wbmat: wbmat || 0
            })
            addCharToRise(char).then(res => { setDisableRise(true); setChangeMats(false) })
        }
        else {
            if (app.game === 'Genshin') {
                addCharToRise(char).then(res => { setDisableRise(true); setChangeMats(false) })
            }
            else if (app.game === 'Zzz') {
                addZzzCharToRise(char).then(res => { setDisableRise(true); setChangeMats(false) })
            }
            else if (app.game === 'Honkai') {
                addHonkaiCharToRise(char).then(res => { setDisableRise(true); setChangeMats(false) })
            }
        }
    }
    const removeFromCol = () => {
        if (app.game === "Genshin") {
            removeCharFromCol(props.charId).then(res => setDisableCol(false))
        }
        else if (app.game === "Zzz") {
            removeZzzCharFromCol(props.charId).then(res => setDisableCol(false))
        }
        else if (app.game === "Honkai") {
            removeHonkaiCharFromCol(props.charId).then(res => setDisableCol(false))
        }
    }
    const removeFromRise = () => {
        if (app.game === 'Genshin') {
            removeCharFromRise(props.charId).then(res => {
                removeMaxValues(props.charId).then(res => setDisableRise(false))
            })
        }
        else if (app.game === 'Zzz') {
            removeZzzCharFromRise(props.charId).then(res => setDisableRise(false))
        }
        else if (app.game === 'Honkai') {
            removeHonkaiCharFromRise(props.charId).then(res => setDisableRise(false))
        }
    }
    const updateInfo = () => {
        let formData = new FormData()
        formData.append('id', char.id)
        formData.append('ownWeaponId', weapon?.id)
        formData.append('recWeapons', JSON.stringify(recWeapons.map(e => { return { id: e.id } })))
        formData.append('firstArtSetfirstHalfId', firstArtSetfirstHalf?.id)
        formData.append('firstArtSetSecondHalfId', firstArtSetSecondHalf?.id)
        formData.append('secondArtSetfirstHalfId', secondArtSetfirstHalf?.id)
        formData.append('secondArtSetSecondHalfId', secondArtSetSecondHalf?.id)
        formData.append('thirdArtSetfirstHalfId', thirdArtSetfirstHalf?.id)
        formData.append('thirdArtSetSecondHalfId', thirdArtSetSecondHalf?.id)
        formData.append('firstPlanarSetId', firstPlanarSet?.id)
        formData.append('secondPlanarSetId', secondPlanarSet?.id)
        formData.append('thirdPlanarSetId', thirdPlanarSet?.id)
        formData.append('charProps', JSON.stringify(charProps))
        formData.append('firstArtProp', JSON.stringify(firstArtProp))
        formData.append('secondArtProp', JSON.stringify(secondArtProp))
        formData.append('thirdArtProp', JSON.stringify(thirdArtProp))
        formData.append('fourthArtProp', JSON.stringify(fourthArtProp))
        formData.append('firstTeam', JSON.stringify(firstTeam))
        formData.append('secondTeam', JSON.stringify(secondTeam))
        formData.append('thirdTeam', JSON.stringify(thirdTeam))
        formData.append('info', info)
        if (app.game === 'Genshin') {
            updateCharInfo(formData).then(res => { setEditor(false); setUpdate(!update) })
        }
        else if (app.game === 'Honkai') {
            updateHonkaiCharInfo(formData).then(res => { setEditor(false); setUpdate(!update) })
        }
        else if (app.game === 'Zzz') {
            updateZzzCharInfo(formData).then(res => { setEditor(false); setUpdate(!update) })
        }
    }
    const { app, weapons, arts, chars } = useContext(AppContext)
    useEffect(() => {
        if (app.game === "Genshin") {
            getCharFromColById(props.charId).then(res => { res.data && setDisableCol(true) })
            getCharFromRiseById(props.charId).then(res => { res.data && setDisableRise(true) })
        }
        else if (app.game === "Zzz") {
            getZzzCharFromColById(props.charId).then(res => { res.data && setDisableCol(true) })
            getZzzCharFromRiseById(props.charId).then(res => { res.data && setDisableRise(true) })
        }
        else if (app.game === "Honkai") {
            getHonkaiCharFromColById(props.charId).then(res => { res.data && setDisableCol(true) })
            getHonkaiCharFromRiseById(props.charId).then(res => { res.data && setDisableRise(true) })
        }
    }, [props.charId, app.game])
    useEffect(() => {
        let getChar
        switch (app.game) {
            case 'Genshin':
                getChar = getCharById
                break;
            case 'Honkai':
                getChar = getHonkaiCharById
                break;
            case 'Zzz':
                getChar = getZzzCharById
                break;
            default:
                break;
        }
        getChar(props.charId).then(res => {
            setChar(res.data)
            if (res.data.charInfo) {
                setInfo(res.data.charInfo.info)
                setWeapon(weapons.weapons.weapons.find(e => e.id === res.data.charInfo.ownWeaponId))
                setFirstArtSetfirstHalf(arts.arts.find(e => e.id === res.data.charInfo.firstArtSetfirstHalfId))
                setFirstArtSetSecondHalf(arts.arts.find(e => e.id === res.data.charInfo.firstArtSetSecondHalfId))
                setSecondArtSetfirstHalf(arts.arts.find(e => e.id === res.data.charInfo.secondArtSetfirstHalfId))
                setSecondArtSetSecondHalf(arts.arts.find(e => e.id === res.data.charInfo.secondArtSetSecondHalfId))
                setThirdArtSetfirstHalf(arts.arts.find(e => e.id === res.data.charInfo.thirdArtSetfirstHalfId))
                setThirdArtSetSecondHalf(arts.arts.find(e => e.id === res.data.charInfo.thirdArtSetSecondHalfId))
                setFirstPlanarSet(arts.arts.find(e => e.id === res.data.charInfo.firstPlanarSetId))
                setSecondPlanarSet(arts.arts.find(e => e.id === res.data.charInfo.secondPlanarSetId))
                setThirdPlanarSet(arts.arts.find(e => e.id === res.data.charInfo.thirdPlanarSetId))
                if (res.data.charInfo.recWeapons) { setRecWeapons(weapons.weapons.weapons.filter(e => res.data.charInfo.recWeapons.some(w => w.id === e.id))) }
                if (res.data.charInfo.firstArtProp) { setFirstArtProp(res.data.charInfo.firstArtProp) }
                if (res.data.charInfo.secondArtProp) { setSecondArtProp(res.data.charInfo.secondArtProp) }
                if (res.data.charInfo.thirdArtProp) { setThirdArtProp(res.data.charInfo.thirdArtProp) }
                if (res.data.charInfo.fourthArtProp) { setFourthArtProp(res.data.charInfo.fourthArtProp) }
                if (res.data.charInfo.firstTeam) { setFirstTeam(res.data.charInfo.firstTeam) }
                if (res.data.charInfo.secondTeam) { setSecondTeam(res.data.charInfo.secondTeam) }
                if (res.data.charInfo.thirdTeam) { setThirdTeam(res.data.charInfo.thirdTeam) }
                if (res.data.charInfo.charProps) { setCharProps(res.data.charInfo.charProps) }
            }
        })
    }, [update])
    useEffect(() => {
        if (app.game != currentGame) {
            props.onHide()
        }
    }, [app.game])
    //Запрос материалов для карточки
    useEffect(() => {
        let getStone
        let getLS
        let getBossMaterial
        let getEnemyMaterial
        let getTalentMaterial
        let getWeekBossMaterial
        switch (app.game) {
            case 'Genshin':
                getStone = getStoneById
                getLS = getLocalSpecialtyById
                getBossMaterial = getBossMaterialById
                getEnemyMaterial = getEnemyMaterialById
                getTalentMaterial = getTalentById
                getWeekBossMaterial = getWBMaterialById
                break;
            case 'Honkai':
                getBossMaterial = getHonkaiBossMaterialById
                getEnemyMaterial = getHonkaiEnemyMaterialById
                getTalentMaterial = getHonkaiTalentById
                getWeekBossMaterial = getHonkaiWBMaterialById
                break;
            case 'Zzz':
                getBossMaterial = getZzzBossMaterialById
                getEnemyMaterial = getZzzEnemyMaterialById
                getTalentMaterial = getZzzTalentById
                getWeekBossMaterial = getZzzWBMaterialById
                break;
            default:
                break;
        }
        if (app.game === 'Genshin') {
            getStone(char?.stoneTypeId).then(res => setSm(res.data))
            getLS(char?.localSpecialtyId).then(res => setLsm(res.data))
        }
        getBossMaterial(char?.bossMaterialId).then(res => setBm(res.data))
        getEnemyMaterial(char?.enemyMaterialId).then(res => setEm(res.data))
        getTalentMaterial(char?.talentMaterialId).then(res => setTm(res.data))
        getWeekBossMaterial(char?.weekBossMaterialId).then(res => setWbm(res.data))
    }, [char])
    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ padding: '70px',textShadow: '2px 2px 2px black' }}
        >
            <Modal.Header closeButton style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'yellow' }}>
                    {char?.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#212529', border: '2px solid yellow' }}>
                <StyledBox display='flex' align='center' jstf='center' width='100%'>
                    {editor ?
                        // Редактор
                        <StyledBox>
                            <Form style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
                                <Form.Control style={{ width: '400px' }} as="textarea" rows={10} value={info} onChange={e => { setInfo(e.target.value) }} className='mt-2 mb-2' placeholder='Enter info' />
                                {/* Сигнатурка */}
                                <Dropdown className='mt-2 mb-2'>
                                    <Dropdown.Toggle variant='outline-warning'>
                                        {weapon === undefined ? 'Сигнатурное Оружие' : weapon?.name}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                        <Dropdown.Item style={{
                                            display: 'flex', justifyContent: 'center', fontWeight: 'bold'
                                        }} onClick={() => { setWeapon() }}>Сброс</Dropdown.Item>
                                        {weapons.weapons.weapons.map(e =>
                                            <Dropdown.Item
                                                onClick={() => { setWeapon(e) }}
                                                key={e.id}>
                                                <StyledBox display='flex' align='center' jstf='center' >
                                                    <img alt='stone' style={{ maxWidth: '40px' }}
                                                        src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/weapons/' : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e.img}></img>
                                                    <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                </StyledBox>
                                            </Dropdown.Item>)}
                                    </Dropdown.Menu>
                                </Dropdown>
                                {/* Рекомендуемое оружие */}
                                <Dropdown className='mt-2 mb-2'>
                                    <Dropdown.Toggle variant='outline-warning'>
                                        {'Рекомендуемое Оружие'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                        {weapons.weapons.weapons.map(e =>
                                            <Dropdown.Item
                                                onClick={() => {
                                                    if (recWeapons.some(w => w.id === e.id)) {
                                                        return
                                                    }
                                                    else {
                                                        setRecWeapons([...recWeapons, e])
                                                    }
                                                }}
                                                key={e.id}>
                                                <StyledBox display='flex' align='center' jstf='center' >
                                                    <img alt='stone' style={{ maxWidth: '40px' }}
                                                        src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/weapons/' : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e.img}></img>
                                                    <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                </StyledBox>
                                            </Dropdown.Item>)}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Row display='flex' gap='5px'>
                                    {recWeapons?.map(e => <Col md={'auto'}><img style={{ height: app.game === 'Honkai' ? '90px' : '75px', width: '75px' }} alt='weapon' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e.img} onClick={() => setRecWeapons(recWeapons.filter(p => p.id != e.id))} /></Col>)}
                                </Row>
                                {/* 1 сет артов */}
                                <StyledBox display='flex' gap='5px'>
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            {firstArtSetfirstHalf === undefined ? 'Первый сет артефактов' + (app.game === 'Zzz' ? '(4 части)' : '(2 части)') : firstArtSetfirstHalf?.name}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {arts.arts?.filter(e => !e.planar).map(e =>
                                                <Dropdown.Item
                                                    onClick={() => { setFirstArtSetfirstHalf(e) }}
                                                    key={e.id}>
                                                    <StyledBox display='flex' align='center' jstf='center' >
                                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/arts/' : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + e.img}></img>
                                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                    </StyledBox>
                                                </Dropdown.Item>)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            {firstArtSetSecondHalf === undefined ? 'Первый сет артефактов (2 части)' : firstArtSetSecondHalf?.name}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {arts.arts?.filter(e => !e.planar).map(e =>
                                                <Dropdown.Item
                                                    onClick={() => { setFirstArtSetSecondHalf(e) }}
                                                    key={e.id}>
                                                    <StyledBox display='flex' align='center' jstf='center' >
                                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/arts/' : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + e.img}></img>
                                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                    </StyledBox>
                                                </Dropdown.Item>)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </StyledBox>
                                {/* 2 сет артов */}
                                <StyledBox display='flex' gap='5px'>
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            {secondArtSetfirstHalf === undefined ? 'Второй сет артефактов ' + (app.game === 'Zzz' ? '(4 части)' : '(2 части)') : secondArtSetfirstHalf?.name}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {arts.arts?.filter(e => !e.planar).map(e =>
                                                <Dropdown.Item
                                                    onClick={() => { setSecondArtSetfirstHalf(e) }}
                                                    key={e.id}>
                                                    <StyledBox display='flex' align='center' jstf='center' >
                                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/arts/' : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + e.img}></img>
                                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                    </StyledBox>
                                                </Dropdown.Item>)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            {secondArtSetSecondHalf === undefined ? 'Второй сет артефактов (2 части)' : secondArtSetSecondHalf?.name}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {arts.arts?.filter(e => !e.planar).map(e =>
                                                <Dropdown.Item
                                                    onClick={() => { setSecondArtSetSecondHalf(e) }}
                                                    key={e.id}>
                                                    <StyledBox display='flex' align='center' jstf='center' >
                                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/arts/' : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + e.img}></img>
                                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                    </StyledBox>
                                                </Dropdown.Item>)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </StyledBox>
                                {/* 3 сет артов */}
                                <StyledBox display='flex' gap='5px'>
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            {thirdArtSetfirstHalf === undefined ? 'Третий сет артефактов' + (app.game === 'Zzz' ? '(4 части)' : '(2 части)') : thirdArtSetfirstHalf?.name}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {arts.arts?.filter(e => !e.planar).map(e =>
                                                <Dropdown.Item
                                                    onClick={() => { setThirdArtSetfirstHalf(e) }}
                                                    key={e.id}>
                                                    <StyledBox display='flex' align='center' jstf='center' >
                                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/arts/' : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + e.img}></img>
                                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                    </StyledBox>
                                                </Dropdown.Item>)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            {thirdArtSetSecondHalf === undefined ? 'Третий сет артефактов (2 части)' : thirdArtSetSecondHalf?.name}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {arts.arts?.filter(e => !e.planar).map(e =>
                                                <Dropdown.Item
                                                    onClick={() => { setThirdArtSetSecondHalf(e) }}
                                                    key={e.id}>
                                                    <StyledBox display='flex' align='center' jstf='center' >
                                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/arts/' : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + e.img}></img>
                                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                    </StyledBox>
                                                </Dropdown.Item>)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </StyledBox>
                                {/* Планарки для хонкая */}
                                {app.game === 'Honkai' && <StyledBox display='flex' gap='5px'>
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            {firstPlanarSet === undefined ? 'Первый Планарный Сет' : firstPlanarSet?.name}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {arts.arts?.filter(e => e.planar).map(e =>
                                                <Dropdown.Item
                                                    onClick={() => { setFirstPlanarSet(e) }}
                                                    key={e.id}>
                                                    <StyledBox display='flex' align='center' jstf='center' >
                                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/arts/' : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + e.img}></img>
                                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                    </StyledBox>
                                                </Dropdown.Item>)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            {secondPlanarSet === undefined ? 'Второй Планарный Сет' : secondPlanarSet?.name}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {arts.arts?.filter(e => e.planar).map(e =>
                                                <Dropdown.Item
                                                    onClick={() => { setSecondPlanarSet(e) }}
                                                    key={e.id}>
                                                    <StyledBox display='flex' align='center' jstf='center' >
                                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/arts/' : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + e.img}></img>
                                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                    </StyledBox>
                                                </Dropdown.Item>)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            {thirdPlanarSet === undefined ? 'Третий Планарный Сет' : thirdPlanarSet?.name}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {arts.arts?.filter(e => e.planar).map(e =>
                                                <Dropdown.Item
                                                    onClick={() => { setThirdPlanarSet(e) }}
                                                    key={e.id}>
                                                    <StyledBox display='flex' align='center' jstf='center' >
                                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/arts/' : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + e.img}></img>
                                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                    </StyledBox>
                                                </Dropdown.Item>)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </StyledBox>}
                                {/* Статы Артефактов */}
                                <StyledBox display='flex' gap='5px'>
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            {firstArtProp?.id === 0 ? app.game === 'Genshin' ? 'Шапка' : (app.game === 'Honkai' ? 'Куртка' : '4 диск') : firstArtProp?.name}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {(app.game === 'Genshin' ?
                                                genshinProps :
                                                (app.game === 'Honkai' ? honkaiProps : zzzProps)).filter(
                                                    e => (app.game === 'Genshin' ? [2, 4, 6, 7, 9, 10, 11, 20] :
                                                        (app.game === 'Honkai' ? [2, 4, 6, 7, 9, 10, 11, 21] :
                                                            [2, 4, 6, 7, 9, 10, 19])).includes(e.id)
                                                ).map(e =>
                                                    <Dropdown.Item
                                                        onClick={() => { setFirstArtProp(e) }}
                                                        key={e.id}>
                                                        <StyledBox display='flex' align='center' jstf='center' >
                                                            <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                        </StyledBox>
                                                    </Dropdown.Item>)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            {secondArtProp?.id === 0 ? app.game === 'Genshin' ? 'Кубок' : (app.game === 'Honkai' ? 'Сфера' : '5 диск') : secondArtProp?.name}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {(app.game === 'Genshin' ?
                                                genshinProps :
                                                (app.game === 'Honkai' ? honkaiProps : zzzProps)).filter(
                                                    e => (app.game === 'Genshin' ? [2, 4, 6, 7, 12, 13, 14, 15, 16, 17, 18, 19] :
                                                        (app.game === 'Honkai' ? [2, 4, 6, 12, 13, 14, 15, 16, 17, 18] :
                                                            [2, 4, 6, 17, 12, 13, 14, 15, 16])).includes(e.id)
                                                ).map(e =>
                                                    <Dropdown.Item
                                                        onClick={() => { setSecondArtProp(e) }}
                                                        key={e.id}>
                                                        <StyledBox display='flex' align='center' jstf='center' >
                                                            <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                        </StyledBox>
                                                    </Dropdown.Item>)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {app.game === 'Honkai' && <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            {fourthArtProp?.id === 0 ? 'Веревка' : fourthArtProp?.name}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {honkaiProps.filter(e => [2, 4, 6, 8, 20].includes(e.id)).map(e =>
                                                <Dropdown.Item
                                                    onClick={() => { setFourthArtProp(e) }}
                                                    key={e.id}>
                                                    <StyledBox display='flex' align='center' jstf='center' >
                                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                    </StyledBox>
                                                </Dropdown.Item>)}
                                        </Dropdown.Menu>
                                    </Dropdown>}
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            {thirdArtProp?.id === 0 ? app.game === 'Genshin' ? 'Часы' : (app.game === 'Honkai' ? 'Сапоги' : '6 диск') : thirdArtProp?.name}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {(app.game === 'Genshin' ?
                                                genshinProps :
                                                (app.game === 'Honkai' ? honkaiProps : zzzProps)).filter(
                                                    e => (app.game === 'Genshin' ? [2, 4, 6, 7, 8] :
                                                        (app.game === 'Honkai' ? [2, 4, 6, 19] :
                                                            [2, 4, 6, 18, 8, 11])).includes(e.id)
                                                ).map(e =>
                                                    <Dropdown.Item
                                                        onClick={() => { setThirdArtProp(e); console.log(thirdArtProp) }}
                                                        key={e.id}>
                                                        <StyledBox display='flex' align='center' jstf='center' >
                                                            <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                        </StyledBox>
                                                    </Dropdown.Item>)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </StyledBox>
                                {/* Сабстаты */}
                                <StyledBox>
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            Сабстаты
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {(app.game === 'Genshin' ? genshinProps :
                                                (app.game === 'Honkai' ? honkaiProps : zzzProps)).map(e =>
                                                    <Dropdown.Item
                                                        onClick={() => {
                                                            if (charProps.some(p => p.id === e.id)) {
                                                            }
                                                            else {
                                                                setCharProps([...charProps, e])
                                                            }
                                                        }}
                                                        key={e.id}>
                                                        <StyledBox display='flex' align='center' jstf='center' >
                                                            <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                        </StyledBox>
                                                    </Dropdown.Item>)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <StyledBox display='flex' gap='5px'>
                                        {charProps?.map(e => <Button variant='danger' onClick={() => setCharProps(charProps.filter(p => p.id != e.id))}>{e.name}</Button>)}
                                    </StyledBox>
                                </StyledBox>
                                {/* Первая Команда */}
                                <StyledBox>
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            Первая Команда
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {chars.chars.chars.map(e =>
                                                <Dropdown.Item
                                                    onClick={() => {
                                                        if (firstTeam.some(p => p.id === e.id) || (firstTeam.length > (app.game === 'Zzz' ? 2 : 3))) {
                                                        }
                                                        else {
                                                            setFirstTeam([...firstTeam, { id: e.id, img: e.img, name: e.name }])
                                                        }
                                                    }}
                                                    key={e.id}>
                                                    <StyledBox display='flex' align='center' jstf='center' >
                                                        <img style={{ height: '50px', width: '50px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e?.img}></img>
                                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                    </StyledBox>
                                                </Dropdown.Item>)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <StyledBox display='flex' gap='5px'>
                                        {firstTeam?.map(e => <Button variant='danger' onClick={() => setFirstTeam(firstTeam.filter(p => p.id != e.id))}>{e.name}</Button>)}
                                    </StyledBox>
                                </StyledBox>
                                {/* Вторая Команда */}
                                <StyledBox>
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            Вторая Команда
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {chars.chars.chars.map(e =>
                                                <Dropdown.Item
                                                    onClick={() => {
                                                        if (secondTeam.some(p => p.id === e.id) || (secondTeam.length > (app.game === 'Zzz' ? 2 : 3))) {
                                                        }
                                                        else {
                                                            setSecondTeam([...secondTeam, { id: e.id, img: e.img, name: e.name }])
                                                        }
                                                    }}
                                                    key={e.id}>
                                                    <StyledBox display='flex' align='center' jstf='center' >
                                                        <img style={{ height: '50px', width: '50px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e?.img}></img>
                                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                    </StyledBox>
                                                </Dropdown.Item>)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <StyledBox display='flex' gap='5px'>
                                        {secondTeam?.map(e => <Button variant='danger' onClick={() => setSecondTeam(secondTeam.filter(p => p.id != e.id))}>{e.name}</Button>)}
                                    </StyledBox>
                                </StyledBox>
                                {/* Третья Команда */}
                                <StyledBox>
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            Третья Команда
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                            {chars.chars.chars.map(e =>
                                                <Dropdown.Item
                                                    onClick={() => {
                                                        if (thirdTeam.some(p => p.id === e.id) || (thirdTeam.length > (app.game === 'Zzz' ? 2 : 3))) {
                                                        }
                                                        else {
                                                            setThirdTeam([...thirdTeam, { id: e.id, img: e.img, name: e.name }])
                                                        }
                                                    }}
                                                    key={e.id}>
                                                    <StyledBox display='flex' align='center' jstf='center' >
                                                        <img style={{ height: '50px', width: '50px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e?.img}></img>
                                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                    </StyledBox>
                                                </Dropdown.Item>)}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    <StyledBox display='flex' gap='5px'>
                                        {thirdTeam?.map(e => <Button variant='danger' onClick={() => setThirdTeam(thirdTeam.filter(p => p.id != e.id))}>{e.name}</Button>)}
                                    </StyledBox>
                                </StyledBox>
                            </Form>
                        </StyledBox> :
                        // Карточка персонажа
                        <StyledBox width='100%' color='yellow' display='flex' dir='column' align='center'>
                            <StyledBox border='solid 1px yellow' gap='35px' padding='10px 50px' display='flex' width='100%' align='center' jstf='center'>
                                {char?.charInfo && char?.charInfo?.info && <StyledBox
                                    display='flex' dir='column' align='start'
                                >
                                    <StyledTitle fz='20px' color='yellow'>Информация</StyledTitle>
                                    {char?.charInfo.info}
                                </StyledBox>}
                                <StyledBox align='center' display='flex' jstf='center'>
                                    <img style={{ height: app.game === 'Honkai' ? '200px' : '150px', width: '150px',background: char?.stars === 5 ? 'orange' : (char?.stars === 4 ? '#4600f6' : '#4682B4'), border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + char?.img}></img>
                                </StyledBox>
                            </StyledBox>
                            <StyledBox margin='5px 0' border='solid 1px yellow' padding='10px 5px' display='flex' jstf='space-between' width='100%' align='center'>
                                <StyledBox display='flex' gap='10px' dir='row' jstf='center' align='center' width='33%'>
                                    {weapon != undefined && <StyledBox padding='16px 3px' br='12px' border='solid 2px yellow' gap='10px' align='center' display='flex' dir='column' margin='0 20px' onMouseEnter={() => {
                                        setWeaponTooltip(true)
                                        setWeaponInfo(weapon?.weaponInfo?.info)
                                        setWeaponName(weapon?.name)
                                        setWeaponStars(weapon?.stars)
                                    }} onMouseLeave={() => setWeaponTooltip(false)}>

                                        <img style={{ height: app.game === 'Honkai' ? '90px' : '75px', width: '75px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + weapon?.img}></img>
                                        <StyledTitle fz='18px'>Сигна</StyledTitle>
                                    </StyledBox>}
                                    <StyledBox padding='16px 3px' gap='10px' align='center' display='flex' dir='column'>
                                        <Row style={{ justifyContent: 'center' }}>
                                            {recWeapons.map(e => <Col style={{ margin: '10px 0' }} md={4} onMouseEnter={() => {
                                                setWeaponTooltip(true)
                                                setWeaponInfo(e.weaponInfo?.info)
                                                setWeaponName(e.name)
                                                setWeaponStars(e.stars)
                                            }} onMouseLeave={() => setWeaponTooltip(false)}>
                                                <img style={{ height: app.game === 'Honkai' ? '65px' : '70px', width: '70px', background: e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4'), border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e.img}></img>
                                            </Col>)}
                                        </Row>
                                    </StyledBox>
                                    {weaponTooltip && weaponInfo &&
                                        <StyledBox style={{
                                            backgroundColor: 'black', width: '400px',
                                            position: 'absolute', right: '0%', top: '110%', zIndex: '100000',
                                            border: '2px solid yellow', borderRadius: '12px',
                                            padding: '5px', whiteSpace: 'normal', overflowWrap: 'anywhere'
                                        }}>
                                            <StyledTitle fz='20px'>{weaponStars === 5 ? '★★★★★' : (weaponStars === 4 ? '★★★★' : '★★★')}</StyledTitle>
                                            <StyledTitle fz='20px'>{weaponName}</StyledTitle>
                                            <StyledTitle fz='16px'>{weaponInfo}</StyledTitle>
                                        </StyledBox>}
                                </StyledBox>
                                <StyledBox display='flex' dir='column' gap='10px' jstf='center' align='center' width='33%'>
                                    <Row style={{ alignItems: 'center' }}>
                                        <Col md='auto' display='flex'>
                                            {firstArtSetfirstHalf != undefined && <StyledBox onMouseEnter={() => {
                                                setArtTooltip(true)
                                                setArtInfo1('2 части: ' + firstArtSetfirstHalf?.twoPartsEffect)
                                                if (firstArtSetSecondHalf === undefined
                                                    || firstArtSetfirstHalf?.id === firstArtSetSecondHalf?.id || app.game === 'Zzz') {
                                                    setArtInfo2('4 части: ' + firstArtSetfirstHalf?.fourPartsEffect)
                                                }
                                                setArtName(firstArtSetfirstHalf?.name)
                                            }} onMouseLeave={() => { setArtTooltip(false); setArtInfo2('') }}>
                                                <img style={{ height: '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + firstArtSetfirstHalf?.img}></img>
                                            </StyledBox>}
                                            {firstArtSetSecondHalf != undefined
                                                && firstArtSetfirstHalf?.id !== firstArtSetSecondHalf?.id && '+ '}
                                            {firstArtSetSecondHalf != undefined
                                                && firstArtSetfirstHalf?.id !== firstArtSetSecondHalf?.id &&
                                                <StyledBox display='flex' align='center' onMouseEnter={() => {
                                                    setArtTooltip(true)
                                                    setArtInfo1('2 части: ' + firstArtSetSecondHalf?.twoPartsEffect)
                                                    setArtName(firstArtSetSecondHalf?.name)
                                                }} onMouseLeave={() => setArtTooltip(false)}>
                                                    <img style={{ height: '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + firstArtSetSecondHalf?.img}></img>
                                                </StyledBox>}
                                        </Col>
                                        <Col md='auto' display='flex'>
                                            {secondArtSetfirstHalf != undefined && <StyledBox onMouseEnter={() => {
                                                setArtTooltip(true)
                                                setArtInfo1('2 части: ' + secondArtSetfirstHalf?.twoPartsEffect)
                                                if (secondArtSetSecondHalf === undefined
                                                    || secondArtSetfirstHalf?.id === secondArtSetSecondHalf?.id || app.game === 'Zzz') {
                                                    setArtInfo2('4 части: ' + secondArtSetfirstHalf?.fourPartsEffect)
                                                }
                                                setArtName(secondArtSetfirstHalf?.name)
                                            }} onMouseLeave={() => { setArtTooltip(false); setArtInfo2('') }}>
                                                <img style={{ height: '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + secondArtSetfirstHalf?.img}></img>
                                            </StyledBox>}
                                            {secondArtSetSecondHalf != undefined
                                                && secondArtSetfirstHalf?.id !== secondArtSetSecondHalf?.id && '+'}
                                            {secondArtSetSecondHalf != undefined
                                                && secondArtSetfirstHalf?.id !== secondArtSetSecondHalf?.id &&
                                                <StyledBox display='flex' align='center' onMouseEnter={() => {
                                                    setArtTooltip(true)
                                                    setArtInfo1('2 части: ' + secondArtSetSecondHalf?.twoPartsEffect)
                                                    setArtName(secondArtSetSecondHalf?.name)
                                                }} onMouseLeave={() => setArtTooltip(false)}>
                                                    <img style={{ height: '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + secondArtSetSecondHalf?.img}></img>
                                                </StyledBox>}
                                        </Col>
                                        <Col md='auto' display='flex'>
                                            {thirdArtSetfirstHalf != undefined && <StyledBox onMouseEnter={() => {
                                                setArtTooltip(true)
                                                setArtInfo1('2 части: ' + thirdArtSetfirstHalf?.twoPartsEffect)
                                                if (thirdArtSetSecondHalf === undefined
                                                    || thirdArtSetfirstHalf?.id === thirdArtSetSecondHalf?.id || app.game === 'Zzz') {
                                                    setArtInfo2('4 части: ' + thirdArtSetfirstHalf?.fourPartsEffect)
                                                }
                                                setArtName(thirdArtSetfirstHalf?.name)
                                            }} onMouseLeave={() => { setArtTooltip(false); setArtInfo2('') }}>
                                                <img style={{ height: '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + thirdArtSetfirstHalf?.img}></img>
                                            </StyledBox>}
                                            {thirdArtSetSecondHalf != undefined
                                                && thirdArtSetfirstHalf?.id !== thirdArtSetSecondHalf?.id && '+'}
                                            {thirdArtSetSecondHalf != undefined
                                                && thirdArtSetfirstHalf?.id !== thirdArtSetSecondHalf?.id &&
                                                <StyledBox display='flex' align='center' onMouseEnter={() => {
                                                    setArtTooltip(true)
                                                    setArtInfo1('2 части: ' + thirdArtSetSecondHalf?.twoPartsEffect)
                                                    setArtName(thirdArtSetSecondHalf?.name)
                                                }} onMouseLeave={() => setArtTooltip(false)}>
                                                    <img style={{ height: '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + thirdArtSetSecondHalf?.img}></img>
                                                </StyledBox>}
                                        </Col>
                                    </Row>
                                    <Row display='flex'>
                                        {firstPlanarSet != undefined &&
                                            <Col md='auto' onMouseEnter={() => {
                                                setArtTooltip(true)
                                                setArtInfo1('2 части: ' + firstPlanarSet?.twoPartsEffect)
                                                setArtName(firstPlanarSet?.name)
                                            }} onMouseLeave={() => setArtTooltip(false)}>
                                                <img style={{ height: '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + firstPlanarSet?.img}></img>
                                            </Col>}
                                        {secondPlanarSet != undefined &&
                                            <Col md='auto' onMouseEnter={() => {
                                                setArtTooltip(true)
                                                setArtInfo1('2 части: ' + secondPlanarSet?.twoPartsEffect)
                                                setArtName(secondPlanarSet?.name)
                                            }} onMouseLeave={() => setArtTooltip(false)}>
                                                <img style={{ height: '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + secondPlanarSet?.img}></img>
                                            </Col>}
                                        {thirdPlanarSet != undefined &&
                                            <Col md='auto' onMouseEnter={() => {
                                                setArtTooltip(true)
                                                setArtInfo1('2 части: ' + thirdPlanarSet?.twoPartsEffect)
                                                setArtName(thirdPlanarSet?.name)
                                            }} onMouseLeave={() => setArtTooltip(false)}>
                                                <img style={{ height: '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + thirdPlanarSet?.img}></img>
                                            </Col>}
                                    </Row>
                                    {artTooltip && artInfo1 &&
                                        <StyledBox style={{
                                            backgroundColor: 'black', width: '400px',
                                            position: 'absolute', top: '110%', zIndex: '100000',
                                            border: '2px solid yellow', borderRadius: '12px',
                                            padding: '10px', whiteSpace: 'normal', overflowWrap: 'anywhere'
                                        }}><StyledTitle fz='20px'>{artName}</StyledTitle>
                                            <StyledTitle fz='16px'>{artInfo1}</StyledTitle>
                                            <StyledTitle fz='16px'>{artInfo2}</StyledTitle>
                                        </StyledBox>}
                                </StyledBox>
                                {(charProps.length > 0 || firstArtProp.id != 0 || secondArtProp.id != 0 ||
                                    thirdArtProp.id != 0 || (app.game === 'Honkai' && fourthArtProp.id != 0)) &&
                                    <StyledBox display='flex' dir='column' align='center' gap='10px' padding='20px 10px' width='33%' border='yellow solid 2px' br='16px'>
                                        <StyledTitle dec='underline' fz='20px'>Рекомендуемые Статы</StyledTitle>
                                        <Row style={{ justifyContent: 'center' }}>
                                            {firstArtProp.id != 0 && <Col md={6}>
                                                {app.game != 'Zzz' ?
                                                    <img style={{ width: '40px', height: '40px' }} fz='18px' src={app.game === 'Genshin' ? crown : (app.game === 'Honkai' && body)} /> :
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', border: 'yellow solid 6px', borderRadius: '50%', width: '40px', height: '40px', color: 'white', fontWeight: 'bold', backgroundColor: 'red' }}>4</div>}
                                                <StyledTitle style={{ margin: '5px 0' }} fz='14px'>{firstArtProp.name}</StyledTitle>
                                            </Col>}
                                            {secondArtProp.id != 0 && <Col md={6}>
                                                {app.game != 'Zzz' ?
                                                    <img style={{ width: '40px', height: '40px' }} fz='18px' src={app.game === 'Genshin' ? goblet : (app.game === 'Honkai' && sphere)} /> :
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', border: 'yellow solid 6px', borderRadius: '50%', width: '40px', height: '40px', color: 'white', fontWeight: 'bold', backgroundColor: 'red' }}>5</div>}
                                                <StyledTitle style={{ margin: '5px 0' }} fz='14px'>{secondArtProp.name}</StyledTitle>
                                            </Col>}
                                            {thirdArtProp.id != 0 && <Col md={6}>
                                                {app.game != 'Zzz' ?
                                                    <img style={{ width: '40px', height: '40px' }} fz='18px' src={app.game === 'Genshin' ? clock : (app.game === 'Honkai' && feet)} /> :
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', border: 'yellow solid 6px', borderRadius: '50%', width: '40px', height: '40px', color: 'white', fontWeight: 'bold', backgroundColor: 'red' }}>6</div>}
                                                <StyledTitle style={{ margin: '5px 0' }} fz='14px'>{thirdArtProp.name}</StyledTitle>
                                            </Col>}
                                            {app.game === 'Honkai' && fourthArtProp.id != 0 && <Col md={6}>
                                                <img style={{ width: '40px', height: '40px' }} dec='underline' fz='18px' src={rope} />
                                                <StyledTitle style={{ margin: '5px 0' }} fz='14px'>{fourthArtProp.name}</StyledTitle>
                                            </Col>}
                                        </Row>
                                        {charProps.length > 0 && <StyledBox display='flex' dir='column'>
                                            <StyledTitle dec='underline' fz='18px'>Сабстаты</StyledTitle>
                                            <Row style={{ justifyContent: 'center' }}>{char?.charInfo?.charProps?.map(e => <Col md={'auto'}><StyledTitle fz='14px'>{e.name}</StyledTitle></Col>)}</Row>
                                        </StyledBox>}
                                    </StyledBox>}
                            </StyledBox>
                            <StyledBox border='solid 1px yellow' width='100%'>
                                <StyledTitle fz='20px' >Материалы</StyledTitle>
                                <StyledBox jstf='center' display='flex' gap='10px' margin='5px 0'>
                                    {app.game === 'Genshin' && < img style={{ height: '70px', width: '70px' }} alt='character' src={process.env.REACT_APP_API_URL + "/stones/" + sm?.img4}></img>}
                                    {app.game === 'Genshin' && < img style={{ height: '70px', width: '70px' }} alt='character' src={process.env.REACT_APP_API_URL + "/localSpecialtys/" + lsm?.img}></img>}
                                    <img style={{ height: '70px', width: '70px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/enemyMaterials/" : (app.game === 'Zzz' ? '/zzz/enemyMaterials/' : '/honkai/enemyMaterials/')) + em?.img3}></img>
                                    <img style={{ height: '70px', width: '70px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/talents/" : (app.game === 'Zzz' ? '/zzz/talents/' : '/honkai/talents/')) + tm?.img3}></img>
                                    <img style={{ height: '70px', width: '70px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/bossMaterials/" : (app.game === 'Zzz' ? '/zzz/bossMaterials/' : '/honkai/bossMaterials/')) + bm?.img}></img>
                                    <img style={{ height: '70px', width: '70px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weekBossMaterials/" : (app.game === 'Zzz' ? '/zzz/weekBossMaterials/' : '/honkai/weekBossMaterials/')) + wbm?.img}></img>
                                </StyledBox>
                            </StyledBox>
                            {(firstTeam.length > 0 || secondTeam.length > 0 || thirdTeam.length > 0) && <StyledBox border='solid 1px yellow' width='100%' margin='5px 0' padding='5px 0'>
                                {(firstTeam.length > 0 || secondTeam.length > 0 || thirdTeam.length > 0) &&
                                    <StyledTitle fz='20px' >Команды</StyledTitle>}
                                <StyledBox display='flex' gap='40px' align='center' jstf='center'>
                                    {firstTeam.length > 0 && <StyledBox display='flex' gap='5px'>
                                        {firstTeam[0] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px', background: 'linear-gradient(135deg, #FFCA07FF 0%, #5F00DDFF 100%)', border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + firstTeam[0]?.img}></img>}
                                        {firstTeam[1] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px', background: 'linear-gradient(135deg, #FFCA07FF 0%, #5F00DDFF 100%)', border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + firstTeam[1]?.img}></img>}
                                        {firstTeam[2] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px', background: 'linear-gradient(135deg, #FFCA07FF 0%, #5F00DDFF 100%)', border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + firstTeam[2]?.img}></img>}
                                        {firstTeam[3] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px', background: 'linear-gradient(135deg, #FFCA07FF 0%, #5F00DDFF 100%)', border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + firstTeam[3]?.img}></img>}
                                    </StyledBox>}
                                    {secondTeam.length > 0 && <StyledBox display='flex' gap='5px'>
                                        {secondTeam[0] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px', background: 'linear-gradient(135deg, #FFCA07FF 0%, #5F00DDFF 100%)', border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + secondTeam[0]?.img}></img>}
                                        {secondTeam[1] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px', background: 'linear-gradient(135deg, #FFCA07FF 0%, #5F00DDFF 100%)', border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + secondTeam[1]?.img}></img>}
                                        {secondTeam[2] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px', background: 'linear-gradient(135deg, #FFCA07FF 0%, #5F00DDFF 100%)', border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + secondTeam[2]?.img}></img>}
                                        {secondTeam[3] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px', background: 'linear-gradient(135deg, #FFCA07FF 0%, #5F00DDFF 100%)', border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + secondTeam[3]?.img}></img>}
                                    </StyledBox>}
                                    {thirdTeam.length > 0 && <StyledBox display='flex' gap='5px'>
                                        {thirdTeam[0] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px', background: 'linear-gradient(135deg, #FFCA07FF 0%, #5F00DDFF 100%)', border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + thirdTeam[0]?.img}></img>}
                                        {thirdTeam[1] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px', background: 'linear-gradient(135deg, #FFCA07FF 0%, #5F00DDFF 100%)', border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + thirdTeam[1]?.img}></img>}
                                        {thirdTeam[2] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px', background: 'linear-gradient(135deg, #FFCA07FF 0%, #5F00DDFF 100%)', border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + thirdTeam[2]?.img}></img>}
                                        {thirdTeam[3] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px', background: 'linear-gradient(135deg, #FFCA07FF 0%, #5F00DDFF 100%)', border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + thirdTeam[3]?.img}></img>}
                                    </StyledBox>}
                                </StyledBox>
                            </StyledBox>}
                        </StyledBox>
                    }
                </StyledBox>
            </Modal.Body >
            <Modal.Footer style={{ display: "flex", justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow', alignItems: 'center' }}>
                {!editor && <Button
                    variant={disableCol ? 'danger' : 'outline-warning'}
                    onClick={() => { disableCol ? removeFromCol() : addToCol() }}>
                    {disableCol ? 'Удалить из Коллекции' : 'Добавить в Коллекцию'}
                </Button>}
                {!editor && <Button
                    variant={disableRise ? 'danger' : 'outline-warning'}
                    onClick={() => { disableRise ? removeFromRise() : addToRise() }}>
                    {disableRise ? 'Удалить из Прокачки' : 'Добавить в Прокачку'}
                </Button>}
                {!disableRise && app.game === 'Genshin' && !editor && <Button
                    variant={changeMats ? 'warning' : 'outline-warning'}
                    onClick={() => setChangeMats(!changeMats)}>
                    {changeMats ? 'Выбор Материалов' : 'Авто Выбор Материалов'}
                </Button>}
                {!editor && <Button onClick={() => setEditor(true)} style={{ width: '130px' }} variant='outline-warning'>Редактировать</Button>}
                {editor && <Button onClick={() => updateInfo()} style={{ width: '130px' }} variant='outline-warning'>Сохранить</Button>}
                <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
                {changeMats && <StyledBox>
                    <Form className="d-flex align-items-center" style={{ flexDirection: 'column' }} >
                        <StyledTitle color='yellow' fz='20px'>Камни</StyledTitle>
                        <StyledBox display='flex' gap='20px'>
                            <Form.Control value={stone1} onChange={e => { setStone1(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Обычный ' />
                            <Form.Control value={stone2} onChange={e => { setStone2(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Редкий ' />
                            <Form.Control value={stone3} onChange={e => { setStone3(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Эпический' />
                            <Form.Control value={stone4} onChange={e => { setStone4(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Легендарный' />
                        </StyledBox>
                    </Form>
                    <Form className="d-flex align-items-center" style={{ flexDirection: 'column' }} >
                        <StyledTitle align='center' color='yellow' fz='20px'>Материалы с врагов</StyledTitle>
                        <StyledBox display='flex' gap='20px'>
                            <Form.Control value={emat1} onChange={e => { setEmat1(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Обычный ' />
                            <Form.Control value={emat2} onChange={e => { setEmat2(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Редкий ' />
                            <Form.Control value={emat3} onChange={e => { setEmat3(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Эпический' />
                        </StyledBox>
                    </Form>
                    <Form className="d-flex align-items-center" style={{ flexDirection: 'column' }} >
                        <StyledTitle align='center' color='yellow' fz='20px'>Диковинки и Материалы с Боссов</StyledTitle>
                        <StyledBox display='flex' gap='20px'>
                            <Form.Control value={spec} onChange={e => { setSpec(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Диковинка ' />
                            <Form.Control value={bmat} onChange={e => { setBmat(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Материал ' />
                            <Form.Control value={wbmat} onChange={e => { setWbmat(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Недельный босс ' />
                        </StyledBox>
                    </Form>
                    <Form className="d-flex align-items-center" style={{ flexDirection: 'column' }} >
                        <StyledTitle align='center' color='yellow' fz='20px'>Книги Талантов</StyledTitle>
                        <StyledBox display='flex' gap='20px'>
                            <Form.Control value={talent1} onChange={e => { setTalent1(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Обычная ' />
                            <Form.Control value={talent2} onChange={e => { setTalent2(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Редкая ' />
                            <Form.Control value={talent3} onChange={e => { setTalent3(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Эпическая' />
                        </StyledBox>
                    </Form>
                    <Form className="d-flex align-items-center" style={{ flexDirection: 'column' }} >
                        <StyledTitle align='center' color='yellow' fz='20px'>Материалы для Талантов</StyledTitle>
                        <StyledBox display='flex' gap='20px'>
                            <Form.Control value={ematTalent1} onChange={e => { setEmatTalent1(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Обычный ' />
                            <Form.Control value={ematTalent2} onChange={e => { setEmatTalent2(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Редкий ' />
                            <Form.Control value={ematTalent3} onChange={e => { setEmatTalent3(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Эпический' />
                        </StyledBox>
                    </Form>
                </StyledBox>}
            </Modal.Footer>
        </Modal >)
})
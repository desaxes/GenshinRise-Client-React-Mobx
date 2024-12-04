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

export const CharOptionsForCollection = observer((props) => {
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
    const { app, weapons, arts } = useContext(AppContext)
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
                if (res.data.charInfo.recWeapons) { setRecWeapons(res.data.charInfo.recWeapons) }
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
            style={{ padding: '70px' }}
        >
            <Modal.Header closeButton style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'yellow' }}>
                    {char?.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", alignItems: 'center', justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow' }}>
                <StyledBox display='flex' align='center' jstf='center' width='100%'>
                    <StyledBox width='100%' color='yellow' display='flex' dir='column' align='center'>
                        <StyledBox border='solid 1px yellow' gap='35px' padding='10px 50px' display='flex' width='100%' align='center' jstf='center'>
                            {char?.charInfo && char?.charInfo?.info && <StyledBox
                                display='flex' dir='column' align='start'
                            >
                                <StyledTitle fz='20px' color='yellow'>Информация</StyledTitle>
                                {char?.charInfo.info}
                            </StyledBox>}
                            <StyledBox align='center' display='flex' jstf='center'>
                                <img style={{ height: app.game === 'Honkai' ? '200px' : '150px', width: '150px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + char?.img}></img>
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
                                            <img style={{ height: app.game === 'Honkai' ? '65px' : '70px', width: '70px',background: e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4'), border: 'white 2px solid', borderRadius: '12px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e.img}></img>
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
                                    {firstTeam[0] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + firstTeam[0]?.img}></img>}
                                    {firstTeam[1] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + firstTeam[1]?.img}></img>}
                                    {firstTeam[2] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + firstTeam[2]?.img}></img>}
                                    {firstTeam[3] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + firstTeam[3]?.img}></img>}
                                </StyledBox>}
                                {secondTeam.length > 0 && <StyledBox display='flex' gap='5px'>
                                    {secondTeam[0] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + secondTeam[0]?.img}></img>}
                                    {secondTeam[1] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + secondTeam[1]?.img}></img>}
                                    {secondTeam[2] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + secondTeam[2]?.img}></img>}
                                    {secondTeam[3] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + secondTeam[3]?.img}></img>}
                                </StyledBox>}
                                {thirdTeam.length > 0 && <StyledBox display='flex' gap='5px'>
                                    {thirdTeam[0] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + thirdTeam[0]?.img}></img>}
                                    {thirdTeam[1] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + thirdTeam[1]?.img}></img>}
                                    {thirdTeam[2] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + thirdTeam[2]?.img}></img>}
                                    {thirdTeam[3] && <img style={{ height: app.game === 'Honkai' ? '90px' : '60px', width: '60px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + thirdTeam[3]?.img}></img>}
                                </StyledBox>}
                            </StyledBox>
                        </StyledBox>}
                    </StyledBox>
                </StyledBox>
            </Modal.Body >
            <Modal.Footer style={{ display: "flex", justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow', alignItems: 'center' }}>
                <Button
                    variant={disableCol ? 'danger' : 'outline-warning'}
                    onClick={() => { disableCol ? removeFromCol() : addToCol() }}>
                    {disableCol ? 'Удалить из Коллекции' : 'Добавить в Коллекцию'}
                </Button>
                <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal >)
})
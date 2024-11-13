import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap/esm/';
import { addCharToCol, addCharToRise, addMaxValues, getCharById, getCharFromColById, getCharFromRiseById, removeCharFromCol, removeCharFromRise, removeMaxValues, updateCharInfo } from '../../http/charAPI';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { Form, Dropdown } from 'react-bootstrap/esm/';
import { StyledBox, StyledTitle } from '../../styledComponents/styled-components';
import { addZzzCharToCol, addZzzCharToRise, getZzzCharById, getZzzCharFromColById, getZzzCharFromRiseById, removeZzzCharFromCol, removeZzzCharFromRise, updateZzzCharInfo } from '../../http/zzz/charAPI';
import { addHonkaiCharToCol, addHonkaiCharToRise, getHonkaiCharById, getHonkaiCharFromColById, getHonkaiCharFromRiseById, removeHonkaiCharFromCol, removeHonkaiCharFromRise, updateHonkaiCharInfo } from '../../http/honkai/charAPI';

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

    const [editor, setEditor] = useState(false)
    const [weapon, setWeapon] = useState()
    const [recFourStarWeapon, setRecFourStarWeapon] = useState()
    const [recFiveStarWeapon, setRecFiveStarWeapon] = useState()
    const [firstArtSetfirstHalf, setFirstArtSetfirstHalf] = useState()
    const [firstArtSetSecondHalf, setFirstArtSetSecondHalf] = useState()
    const [secondArtSetfirstHalf, setSecondArtSetfirstHalf] = useState()
    const [secondArtSetSecondHalf, setSecondArtSetSecondHalf] = useState()
    const [thirdArtSetfirstHalf, setThirdArtSetfirstHalf] = useState()
    const [thirdArtSetSecondHalf, setThirdArtSetSecondHalf] = useState()
    const [firstPlanarSet, setFirstPlanarSet] = useState()
    const [secondPlanarSet, setSecondPlanarSet] = useState()
    const [thirdPlanarSet, setThirdPlanarSet] = useState()
    const [info, setInfo] = useState()
    const [char, setChar] = useState()
    const [update, setUpdate] = useState(false)
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
        formData.append('recFourStarWeaponId', recFourStarWeapon?.id)
        formData.append('recFiveStarWeaponId', recFiveStarWeapon?.id)
        formData.append('firstArtSetfirstHalfId', firstArtSetfirstHalf?.id)
        formData.append('firstArtSetSecondHalfId', firstArtSetSecondHalf?.id)
        formData.append('secondArtSetfirstHalfId', secondArtSetfirstHalf?.id)
        formData.append('secondArtSetSecondHalfId', secondArtSetSecondHalf?.id)
        formData.append('thirdArtSetfirstHalfId', thirdArtSetfirstHalf?.id)
        formData.append('thirdArtSetSecondHalfId', thirdArtSetSecondHalf?.id)
        formData.append('firstPlanarSetId', firstPlanarSet?.id)
        formData.append('secondPlanarSetId', secondPlanarSet?.id)
        formData.append('thirdPlanarSetId', thirdPlanarSet?.id)
        formData.append('info', info)
        if (app.game === 'Genshin') {
            updateCharInfo(formData).then(res => setEditor(false))
        }
        else if (app.game === 'Honkai') {
            updateHonkaiCharInfo(formData).then(res => setEditor(false))
        }
        else if (app.game === 'Zzz') {
            updateZzzCharInfo(formData).then(res => setEditor(false))
        }
        setUpdate(!update)
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
                setInfo(res.data.charInfo.info)
                setWeapon(weapons.weapons.weapons.find(e => e.id === res.data.charInfo.ownWeaponId))
                setRecFourStarWeapon(weapons.weapons.weapons.find(e => e.id === res.data.charInfo.recFourStarWeaponId))
                setRecFiveStarWeapon(weapons.weapons.weapons.find(e => e.id === res.data.charInfo.recFiveStarWeaponId))
                setFirstArtSetfirstHalf(arts.arts.find(e => e.id === res.data.charInfo.firstArtSetfirstHalfId))
                setFirstArtSetSecondHalf(arts.arts.find(e => e.id === res.data.charInfo.firstArtSetSecondHalfId))
                setSecondArtSetfirstHalf(arts.arts.find(e => e.id === res.data.charInfo.secondArtSetfirstHalfId))
                setSecondArtSetSecondHalf(arts.arts.find(e => e.id === res.data.charInfo.secondArtSetSecondHalfId))
                setThirdArtSetfirstHalf(arts.arts.find(e => e.id === res.data.charInfo.thirdArtSetfirstHalfId))
                setThirdArtSetSecondHalf(arts.arts.find(e => e.id === res.data.charInfo.thirdArtSetSecondHalfId))
                setFirstPlanarSet(arts.arts.find(e => e.id === res.data.charInfo.firstPlanarSetId))
                setSecondPlanarSet(arts.arts.find(e => e.id === res.data.charInfo.secondPlanarSetId))
                setThirdPlanarSet(arts.arts.find(e => e.id === res.data.charInfo.thirdPlanarSetId))
            }
        })
    }, [update])

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{padding:'70px'}}
        >
            <Modal.Header closeButton style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'yellow' }}>
                    {char?.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", alignItems: 'center', justifyContent: 'space-around', backgroundColor: '#212529', border: '2px solid yellow' }}>
                <StyledBox display='flex' align='center' jstf='space-between'>
                    {editor ?
                        <StyledBox>
                            <Form style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
                                <Form.Control style={{ width: '400px' }} as="textarea" rows={10} value={info} onChange={e => { setInfo(e.target.value) }} className='mt-2 mb-2' placeholder='Enter info' />
                                <Dropdown className='mt-2 mb-2'>
                                    <Dropdown.Toggle variant='outline-warning'>
                                        {weapon === undefined ? 'Сигнатурное Оружие' : weapon?.name}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                        {weapons.weapons.weapons.filter(e => e.stars === 5).map(e =>
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
                                <Dropdown className='mt-2 mb-2'>
                                    <Dropdown.Toggle variant='outline-warning'>
                                        {recFiveStarWeapon === undefined ? 'Рекомендованное Легендарное Оружие' : recFiveStarWeapon?.name}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                        {weapons.weapons.weapons.filter(e => e.stars === 5).map(e =>
                                            <Dropdown.Item
                                                onClick={() => { setRecFiveStarWeapon(e) }}
                                                key={e.id}>
                                                <StyledBox display='flex' align='center' jstf='center' >
                                                    <img alt='stone' style={{ maxWidth: '40px' }}
                                                        src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/weapons/' : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e.img}></img>
                                                    <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                </StyledBox>
                                            </Dropdown.Item>)}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown className='mt-2 mb-2'>
                                    <Dropdown.Toggle variant='outline-warning'>
                                        {recFourStarWeapon === undefined ? 'Рекомендованное Эпическое Оружие' : recFourStarWeapon?.name}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                        {weapons.weapons.weapons.filter(e => e.stars === 4).map(e =>
                                            <Dropdown.Item
                                                onClick={() => { setRecFourStarWeapon(e) }}
                                                key={e.id}>
                                                <StyledBox display='flex' align='center' jstf='center' >
                                                    <img alt='stone' style={{ maxWidth: '40px' }}
                                                        src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/weapons/' : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e.img}></img>
                                                    <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                </StyledBox>
                                            </Dropdown.Item>)}
                                    </Dropdown.Menu>
                                </Dropdown>
                                <StyledBox display='flex' gap='5px'>
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            {firstArtSetfirstHalf === undefined ? 'Первый сет артефактов (2 части)' : firstArtSetfirstHalf?.name}
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
                                <StyledBox display='flex' gap='5px'>
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            {secondArtSetfirstHalf === undefined ? 'Второй сет артефактов (2 части)' : secondArtSetfirstHalf?.name}
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
                                <StyledBox display='flex' gap='5px'>
                                    <Dropdown className='mt-2 mb-2'>
                                        <Dropdown.Toggle variant='outline-warning'>
                                            {thirdArtSetfirstHalf === undefined ? 'Третий сет артефактов (2 части)' : thirdArtSetfirstHalf?.name}
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
                                <Button onClick={() => updateInfo()} style={{ width: '130px' }} variant='outline-warning'>Сохранить Информацию</Button>
                            </Form>
                        </StyledBox> :
                        <StyledBox color='yellow' display='flex' dir='column' align='center'>
                            {char?.charInfo.info && char?.charInfo.info != "undefined" && <StyledBox
                                display='flex' dir='column' align='start'
                                margin='10px 50px'
                            >
                                <StyledTitle fz='20px' color='yellow'>Информация</StyledTitle>
                                {char?.charInfo.info}
                            </StyledBox>}
                            <StyledBox display='flex' jstf='space-between' width='80%' align='center'>
                                <StyledBox display='flex' gap='15px'>
                                    {weapon != undefined && <StyledBox margin='20px 0'>
                                        <img style={{ height: app.game === 'Honkai' ? '150px' : '100px', width: '100px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + weapon?.img}></img>
                                    </StyledBox>}
                                    {recFiveStarWeapon != undefined && <StyledBox margin='20px 0'>
                                        <img style={{ height: app.game === 'Honkai' ? '150px' : '100px', width: '100px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + recFiveStarWeapon?.img}></img>
                                    </StyledBox>}
                                    {recFourStarWeapon != undefined && <StyledBox margin='20px 0'>
                                        <img style={{ height: app.game === 'Honkai' ? '150px' : '100px', width: '100px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + recFourStarWeapon?.img}></img>
                                    </StyledBox>}
                                </StyledBox>
                                <StyledBox display='flex' gap='15px' dir='column' align='center'>
                                    <StyledBox display='flex'>
                                        {firstArtSetfirstHalf != undefined && <StyledBox margin='20px 0'>
                                            <img style={{ height: '70px', width: '70px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + firstArtSetfirstHalf?.img}></img>
                                        </StyledBox>}
                                        {firstArtSetSecondHalf != undefined
                                            && firstArtSetfirstHalf?.id !== firstArtSetSecondHalf?.id &&
                                            <StyledBox margin='20px 0'>
                                                <img style={{ height: '70px', width: '70px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + firstArtSetSecondHalf?.img}></img>
                                            </StyledBox>}
                                    </StyledBox>
                                    <StyledBox display='flex'>
                                        {secondArtSetfirstHalf != undefined && <StyledBox margin='20px 0'>
                                            <img style={{ height: '70px', width: '70px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + secondArtSetfirstHalf?.img}></img>
                                        </StyledBox>}
                                        {secondArtSetSecondHalf != undefined
                                            && secondArtSetfirstHalf?.id !== secondArtSetSecondHalf?.id &&
                                            <StyledBox margin='20px 0'>
                                                <img style={{ height: '70px', width: '70px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + secondArtSetSecondHalf?.img}></img>
                                            </StyledBox>}
                                    </StyledBox>
                                    <StyledBox display='flex'>
                                        {thirdArtSetfirstHalf != undefined && <StyledBox margin='20px 0'>
                                            <img style={{ height: '70px', width: '70px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + thirdArtSetfirstHalf?.img}></img>
                                        </StyledBox>}
                                        {thirdArtSetSecondHalf != undefined
                                            && thirdArtSetfirstHalf?.id !== thirdArtSetSecondHalf?.id &&
                                            <StyledBox margin='20px 0'>
                                                <img style={{ height: '70px', width: '70px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + thirdArtSetSecondHalf?.img}></img>
                                            </StyledBox>}
                                    </StyledBox>
                                    <StyledBox display='flex'>
                                        {firstPlanarSet != undefined &&
                                            <StyledBox margin='20px 0'>
                                                <img style={{ height: '70px', width: '70px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + firstPlanarSet?.img}></img>
                                            </StyledBox>}
                                        {secondPlanarSet != undefined &&
                                            <StyledBox margin='20px 0'>
                                                <img style={{ height: '70px', width: '70px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + secondPlanarSet?.img}></img>
                                            </StyledBox>}
                                        {thirdPlanarSet != undefined &&
                                            <StyledBox margin='20px 0'>
                                                <img style={{ height: '70px', width: '70px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? '/zzz/arts/' : '/honkai/arts/')) + thirdPlanarSet?.img}></img>
                                            </StyledBox>}
                                    </StyledBox>
                                </StyledBox>
                            </StyledBox>
                            <Button onClick={() => setEditor(true)} style={{ width: '130px' }} variant='outline-warning'>Редактировать Информацию</Button>
                        </StyledBox>
                    }
                    {!editor && <StyledBox>
                        <img style={{ height: app.game === 'Honkai' ? '200px' : '150px', width: '150px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + char?.img}></img>
                    </StyledBox>}
                </StyledBox>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Button
                    variant={disableCol ? 'danger' : 'outline-warning'}
                    onClick={() => { disableCol ? removeFromCol() : addToCol() }}>
                    {disableCol ? 'Удалить из Коллекции' : 'Добавить в Коллекцию'}
                </Button>
                <Button
                    variant={disableRise ? 'danger' : 'outline-warning'}
                    onClick={() => { disableRise ? removeFromRise() : addToRise() }}>
                    {disableRise ? 'Удалить из Прокачки' : 'Добавить в Прокачку'}
                </Button>
                {!disableRise && app.game === 'Genshin' && <Button
                    variant={changeMats ? 'warning' : 'outline-warning'}
                    onClick={() => setChangeMats(!changeMats)}>
                    {changeMats ? 'Выбор Материалов' : 'Авто Выбор Материалов'}
                </Button>}
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
        </Modal>)
})
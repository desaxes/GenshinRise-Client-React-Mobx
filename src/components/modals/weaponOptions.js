import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Col, Row } from 'react-bootstrap/esm/';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { Form, Dropdown } from 'react-bootstrap/esm/';
import { StyledBox, StyledTitle } from '../../styledComponents/styled-components';
import { addMaxValuesForWeapon, addWeaponToCol, addWeaponToRise, getWeaponById, getWeaponFromColById, getWeaponFromRiseById, removeMaxValuesForWeapon, removeWeaponFromCol, removeWeaponFromRise, updateWeaponInfo } from '../../http/weaponAPI';
import { addZzzWeaponToCol, addZzzWeaponToRise, getZzzWeaponById, getZzzWeaponFromColById, getZzzWeaponFromRiseById, removeZzzWeaponFromCol, updateZzzWeaponInfo } from '../../http/zzz/weaponAPI';
import { addHonkaiWeaponToCol, addHonkaiWeaponToRise, getHonkaiWeaponById, getHonkaiWeaponFromColById, getHonkaiWeaponFromRiseById, removeHonkaiWeaponFromCol, removeHonkaiWeaponFromRise, updateHonkaiWeaponInfo } from '../../http/honkai/weaponAPI';
import { genshinProps, honkaiProps, zzzProps } from '../../utils/props';
import { getCharForWeapon } from '../../http/charAPI';
import { getHonkaiCharForWeapon } from '../../http/honkai/charAPI';
import { getZzzCharForWeapon } from '../../http/zzz/charAPI';
export const WeaponOptions = observer((props) => {
    const { weapons, app, chars } = useContext(AppContext)
    const [weapon, setWeapon] = useState()
    const [owner, setOwner] = useState()

    const [disableCol, setDisableCol] = useState(false)
    const [changeMats, setChangeMats] = useState(false)
    const [disableRise, setDisableRise] = useState(false)
    const [wmat1, setWmat1] = useState()
    const [wmat2, setWmat2] = useState()
    const [wmat3, setWmat3] = useState()
    const [wmat4, setWmat4] = useState()
    const [emat1, setEmat1] = useState()
    const [emat2, setEmat2] = useState()
    const [emat3, setEmat3] = useState()
    const [ewmat1, setEwmat1] = useState()
    const [ewmat2, setEwmat2] = useState()
    const [ewmat3, setEwmat3] = useState()

    const [editor, setEditor] = useState(false)
    const [info, setInfo] = useState('')
    const [attack, setAttack] = useState('')
    const [def, setDef] = useState('')
    const [hp, setHp] = useState('')
    const [propValue, setPropValue] = useState('')
    const [prop, setProp] = useState({ id: 0, name: '' })
    const [update, setUpdate] = useState(false)
    const [currentGame, setCurrentGame] = useState(props.currentGame)

    const updateInfo = () => {
        let formData = new FormData()
        formData.append('id', weapon.id)
        formData.append('attack', attack)
        formData.append('def', def)
        formData.append('hp', hp)
        formData.append('propValue', propValue)
        formData.append('prop', JSON.stringify(prop))
        formData.append('info', info)
        if (app.game === 'Genshin') {
            updateWeaponInfo(formData).then(res => setEditor(false))
        }
        else if (app.game === 'Honkai') {
            updateHonkaiWeaponInfo(formData).then(res => setEditor(false))
        }
        else if (app.game === 'Zzz') {
            updateZzzWeaponInfo(formData).then(res => setEditor(false))
        }
        setUpdate(!update)
    }
    useEffect(() => {
        if (app.game != currentGame) {
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
    }, [update])
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
    const addToRise = () => {
        if (changeMats) {
            addMaxValuesForWeapon({
                id: weapon.id,
                wmat1: wmat1 || 0,
                wmat2: wmat2 || 0,
                wmat3: wmat3 || 0,
                wmat4: wmat4 || 0,
                emat1: emat1 || 0,
                emat2: emat2 || 0,
                emat3: emat3 || 0,
                ewmat1: ewmat1 || 0,
                ewmat2: ewmat2 || 0,
                ewmat3: ewmat3 || 0,
            })
            addWeaponToRise(weapon).then(res => { setDisableRise(true); setChangeMats(false) })
        }
        else {
            if (app.game === 'Genshin') {
                addWeaponToRise(weapon).then(res => { setDisableRise(true); setChangeMats(false) })
            }
            else if (app.game === 'Zzz') {
                addZzzWeaponToRise(weapon).then(res => { setDisableRise(true); setChangeMats(false) })
            }
            else if (app.game === 'Honkai') {
                addHonkaiWeaponToRise(weapon).then(res => { setDisableRise(true); setChangeMats(false) })
            }
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
    const removeFromRise = () => {
        if (app.game === 'Genshin') {
            removeWeaponFromRise(props.weaponId).then(res => {
                removeMaxValuesForWeapon(props.weaponId).then(res => setDisableRise(false))
            })
        }
        else if (app.game === 'Zzz') {
            removeWeaponFromRise(props.weaponId).then(res => { setDisableRise(false) })
        }
        else if (app.game === 'Honkai') {
            removeHonkaiWeaponFromRise(props.weaponId).then(res => { setDisableRise(false) })
        }
    }
    useEffect(() => {
        if (app.game === 'Genshin') {
            getWeaponFromColById(props.weaponId).then(res => { res.data && setDisableCol(true) })
            getWeaponFromRiseById(props.weaponId).then(res => { res.data && setDisableRise(true) })
        }
        else if (app.game === 'Zzz') {
            getZzzWeaponFromColById(props.weaponId).then(res => { res.data && setDisableCol(true) })
            getZzzWeaponFromRiseById(props.weaponId).then(res => { res.data && setDisableRise(true) })
        }
        else if (app.game === 'Honkai') {
            getHonkaiWeaponFromColById(props.weaponId).then(res => { res.data && setDisableCol(true) })
            getHonkaiWeaponFromRiseById(props.weaponId).then(res => { res.data && setDisableRise(true) })
        }
    }, [props.weaponId, app.game])
    let characters = chars.chars.chars?.filter(e => e.charInfo?.recWeapons?.some(w => w.id === props.weaponId))
    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ textShadow:'2px 2px 2px black' }}
        >
            <Modal.Header closeButton style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'yellow' }}>
                    {weapon?.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow' }}>
                {!editor && <StyledBox display='flex' gap='40px' dir='row' jstf='center' width='100%' padding='10px 50px' align='center'>

                    <StyledBox color='yellow' display='flex' dir='column' align='center'>
                        <StyledBox margin='0 0 16px 0' display='flex' dir='row' align='center' jstf='space-between' width='100%'>
                            <StyledBox padding='0 5px' display='flex' align='end' dir='row' style={{ background: weapon?.stars === 5 ? 'orange' : (weapon?.stars === 4 ? '#4600f6' : '#4682B4'), border: 'white 2px solid', borderRadius: '12px' }}>
                                <img style={{ width: '150px' }} alt='weapon' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : (app.game === 'Zzz' ? "/zzz/weapons/" : '/honkai/weapons/')) + weapon?.img}></img>
                                {owner && <StyledBox display='flex' dir='column' align='center'>
                                    <img style={{ height: app.game === 'Honkai' ? '125px' : '100px', width: '100px', borderRadius: '16px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + owner?.img}></img>
                                </StyledBox>}
                            </StyledBox>
                            <StyledBox width='27%' style={{textShadow:weapon?.stars===4? '2px 2px 2px black': '2px 2px 2px white'}} display='flex' dir='column' align='center' border='2px solid white' br='16px' padding='24px' bg={weapon?.stars === 5 ? 'orange' : (weapon?.stars === 4 ? '#4600f6' : '#4682B4')} color={weapon?.stars === 5 ? 'black' : (weapon?.stars === 4 ? 'white' : 'black')}>
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
                </StyledBox>}
                {editor && <StyledBox>
                    <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Form.Control style={{ width: '400px' }} as="textarea" rows={5} value={info} onChange={e => { setInfo(e.target.value) }} className='mt-2 mb-2' placeholder='Введите описание' />
                        <Form.Control style={{ width: '400px' }} type='number' value={attack} onChange={e => { setAttack(e.target.value) }} className='mt-2 mb-2' placeholder='Атака' />
                        {app.game === 'Honkai' && <Form.Control style={{ width: '400px' }} type='number' value={def} onChange={e => { setDef(e.target.value) }} className='mt-2 mb-2' placeholder='Защита' />}
                        {app.game === 'Honkai' && <Form.Control style={{ width: '400px' }} type='number' value={hp} onChange={e => { setHp(e.target.value) }} className='mt-2 mb-2' placeholder='HP' />}
                        {app.game != 'Honkai' && <StyledBox display='flex' gap='10px'>
                            <Form.Control style={{ width: '200px' }} value={propValue} onChange={e => { setPropValue(e.target.value) }} className='mt-2 mb-2' placeholder='Значение хар-ки' />
                            <Dropdown className='mt-2 mb-2'>
                                <Dropdown.Toggle variant='outline-warning'>
                                    {prop.id === 0 ? 'Характеристика' : prop.name}
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    {(app.game === 'Genshin' ? genshinProps :
                                        (app.game === 'Honkai' ? honkaiProps : zzzProps)).map(e =>
                                            <Dropdown.Item
                                                onClick={() => setProp(e)}
                                                key={e.id}>
                                                <StyledBox display='flex' align='center' jstf='center' >
                                                    <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                                </StyledBox>
                                            </Dropdown.Item>)}
                                </Dropdown.Menu>
                            </Dropdown>
                        </StyledBox>}
                    </Form>
                </StyledBox>}
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow' }}>
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
                        <StyledTitle color='yellow' fz='20px'>Материалы Оружия</StyledTitle>
                        <StyledBox display='flex' gap='20px'>
                            <Form.Control value={wmat1} onChange={e => { setWmat1(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Необычный ' />
                            <Form.Control value={wmat2} onChange={e => { setWmat2(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Редкий ' />
                            <Form.Control value={wmat3} onChange={e => { setWmat3(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Эпический' />
                            <Form.Control value={wmat4} onChange={e => { setWmat4(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Легендарный' />
                        </StyledBox>
                    </Form>
                    <Form className="d-flex align-items-center" style={{ flexDirection: 'column' }} >
                        <StyledTitle align='center' color='yellow' fz='20px'>Материалы с врагов</StyledTitle>
                        <StyledBox display='flex' gap='20px'>
                            <Form.Control value={emat1} onChange={e => { setEmat1(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Обычный ' />
                            <Form.Control value={emat2} onChange={e => { setEmat2(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Необычный ' />
                            <Form.Control value={emat3} onChange={e => { setEmat3(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Редкий' />
                        </StyledBox>
                    </Form>
                    <Form className="d-flex align-items-center" style={{ flexDirection: 'column' }} >
                        <StyledTitle align='center' color='yellow' fz='20px'>Материалы Врагов для Оружия</StyledTitle>
                        <StyledBox display='flex' gap='20px'>
                            <Form.Control value={ewmat1} onChange={e => { setEwmat1(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Необычный ' />
                            <Form.Control value={ewmat2} onChange={e => { setEwmat2(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Редкий ' />
                            <Form.Control value={ewmat3} onChange={e => { setEwmat3(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Эпический' />
                        </StyledBox>
                    </Form>
                </StyledBox>}
            </Modal.Footer>
        </Modal>)
})
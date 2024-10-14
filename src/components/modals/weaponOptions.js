import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap/esm/';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap/esm/';
import { StyledBox, StyledTitle } from '../../styledComponents/styled-components';
import { addMaxValuesForWeapon, addWeaponToCol, addWeaponToRise, getWeaponFromColById, getWeaponFromRiseById, removeMaxValuesForWeapon, removeWeaponFromCol, removeWeaponFromRise } from '../../http/weaponAPI';
import { addZzzWeaponToCol, addZzzWeaponToRise, getZzzWeaponFromColById, getZzzWeaponFromRiseById, removeZzzWeaponFromCol } from '../../http/zzz/weaponAPI';
export const WeaponOptions = observer((props) => {
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
    const addToCol = () => {
        if (app.game === 'Genshin') {
            addWeaponToCol(weapon).then(res => setDisableCol(true))
        }
        else if (app.game === 'Zzz') {
            addZzzWeaponToCol(weapon).then(res => setDisableCol(true))
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
        }
    }
    const removeFromCol = () => {
        if (app.game === 'Genshin') {
            removeWeaponFromCol(props.weaponId).then(res => setDisableCol(false))
        }
        else if (app.game === 'Zzz') {
            removeZzzWeaponFromCol(props.weaponId).then(res => setDisableCol(false))
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
    }
    const { weapons, app } = useContext(AppContext)
    const weapon = weapons.weapons.weapons.find(e => e.id === props.weaponId)
    useEffect(() => {
        if (app.game === 'Genshin') {
            getWeaponFromColById(props.weaponId).then(res => { res.data && setDisableCol(true) })
            getWeaponFromRiseById(props.weaponId).then(res => { res.data && setDisableRise(true) })
        }
        else if (app.game === 'Zzz') {
            getZzzWeaponFromColById(props.weaponId).then(res => { res.data && setDisableCol(true) })
            getZzzWeaponFromRiseById(props.weaponId).then(res => { res.data && setDisableRise(true) })
        }
    }, [props.weaponId, app.game])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered

        >
            <Modal.Header closeButton style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'yellow' }}>
                    {weapon.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow' }}>
                <img alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : "/zzz/weapons/") + weapon.img}></img>
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
                {!disableRise && <Button
                    variant={changeMats ? 'warning' : 'outline-warning'}
                    onClick={() => setChangeMats(!changeMats)}>
                    {changeMats ? 'Выбор Материалов' : 'Авто Выбор Материалов'}
                </Button>}
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
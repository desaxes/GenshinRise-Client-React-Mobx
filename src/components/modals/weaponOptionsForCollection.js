import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap/esm/';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { addWeaponToCol, getWeaponFromColById, getWeaponsFromCol, removeWeaponFromCol } from '../../http/weaponAPI';
import { addZzzWeaponToCol, getZzzWeaponsFromCol, removeZzzWeaponFromCol } from '../../http/zzz/weaponAPI';
import { addHonkaiWeaponToCol, getHonkaiWeaponsFromCol, removeHonkaiWeaponFromCol } from '../../http/honkai/weaponAPI';
export const WeaponOptionsForCollection = observer((props) => {
    const { weapons, app } = useContext(AppContext)
    const [disableCol, setDisableCol] = useState(false)
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
            removeWeaponFromCol(props.weaponId).then(res => {
                getWeaponsFromCol().then(res => {
                    weapons.setWeapons(res.data)
                    props.onHide()
                })
            })
        }
        else if (app.game === 'Zzz') {
            removeZzzWeaponFromCol(props.weaponId).then(res => {
                getZzzWeaponsFromCol().then(res => {
                    weapons.setWeapons(res.data)
                    props.onHide()
                })
            })
        }
        else if (app.game === 'Honkai') {
            removeHonkaiWeaponFromCol(props.weaponId).then(res => {
                getHonkaiWeaponsFromCol().then(res => {
                    weapons.setWeapons(res.data)
                    props.onHide()
                })
            })
        }
    }
    const weapon = weapons.weapons.weapons.find(e => e.id === props.weaponId)
    useEffect(() => {
        getWeaponFromColById(props.weaponId).then(res => { res.data && setDisableCol(true) })
    }, [props.weaponId])
    if (weapon) {
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
                    <img alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : (app.game === 'Zzz' ? "/zzz/weapons/" : '/honkai/weapons/')) + weapon.img}></img>
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
    }
})
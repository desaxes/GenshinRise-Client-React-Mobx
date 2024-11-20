import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Col, Row } from 'react-bootstrap/esm/';
import { RiseBar } from './../riseBar';
import { StyledImg } from '../../styledComponents/styled-components';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { getMaxValuesForWeapon, getWeaponsFromRise, removeMaxValuesForWeapon, removeWeaponFromRise, updateWeaponFromRise } from '../../http/weaponAPI';
import { getZzzWeaponsFromRise, removeZzzWeaponFromRise, updateZzzWeaponFromRise } from '../../http/zzz/weaponAPI';
import { getHonkaiWeaponsFromRise, removeHonkaiWeaponFromRise, updateHonkaiWeaponFromRise } from '../../http/honkai/weaponAPI';
export const RisingModalWeapon = observer((props) => {
    const { weapons, app } = useContext(AppContext)
    const weapon = weapons.weapons.weapons.find(e => e.id === props.weaponId)
    const [wmat1, setWmat1] = useState(weapon && weapon.weaponMat1Count)
    const [wmat2, setWmat2] = useState(weapon && weapon.weaponMat2Count)
    const [wmat3, setWmat3] = useState(weapon && weapon.weaponMat3Count)
    const [wmat4, setWmat4] = useState(weapon && weapon.weaponMat4Count)
    const [emat1, setEmat1] = useState(weapon && weapon.enemyMat1Count)
    const [emat2, setEmat2] = useState(weapon && weapon.enemyMat2Count)
    const [emat3, setEmat3] = useState(weapon && weapon.enemyMat3Count)
    const [ewmat1, setEwmat1] = useState(weapon && weapon.enemyWMat1Count)
    const [ewmat2, setEwmat2] = useState(weapon && weapon.enemyWMat2Count)
    const [ewmat3, setEwmat3] = useState(weapon && weapon.enemyWMat3Count)
    const [currentGame, setCurrentGame] = useState(props.currentGame)
    useEffect(() => {
        if (app.game != currentGame) {
            props.onHide()
        }
    }, [app.game])
    const [max, setMax] = useState()
    const saveResult = () => {
        if (app.game === 'Genshin') {
            updateWeaponFromRise({
                id: weapon.id,
                wmat1: wmat1,
                wmat2: wmat2,
                wmat3: wmat3,
                wmat4: wmat4,
                emat1: emat1,
                emat2: emat2,
                emat3: emat3,
                ewmat1: ewmat1,
                ewmat2: ewmat2,
                ewmat3: ewmat3,
            }).then(res => {
                getWeaponsFromRise().then(res => {
                    weapons.setWeapons(res.data)
                    props.onHide()
                })
            })
        }
        else if (app.game === 'Zzz') {
            updateZzzWeaponFromRise({
                id: weapon.id,
                wmat1: wmat1,
                wmat2: wmat2,
                wmat3: wmat3
            }).then(res => {
                getZzzWeaponsFromRise().then(res => {
                    weapons.setWeapons(res.data)
                    props.onHide()
                })
            })
        }
        else if (app.game === 'Honkai') {
            updateHonkaiWeaponFromRise({
                id: weapon.id,
                wmat1: wmat1,
                wmat2: wmat2,
                wmat3: wmat3,
                emat1: emat1,
                emat2: emat2,
                emat3: emat3,
            }).then(res => {
                getHonkaiWeaponsFromRise().then(res => {
                    weapons.setWeapons(res.data)
                    props.onHide()
                })
            })
        }
    }
    const removeWeapon = () => {
        if (app.game === 'Genshin') {
            removeWeaponFromRise(props.weaponId).then(res => {
                getWeaponsFromRise().then(res => {
                    weapons.setWeapons(res.data)
                    props.onHide()
                    removeMaxValuesForWeapon(props.weaponId)
                })
            })
        }
        else if (app.game === 'Zzz') {
            removeZzzWeaponFromRise(props.weaponId).then(res => {
                getZzzWeaponsFromRise().then(res => {
                    weapons.setWeapons(res.data)
                    props.onHide()
                })
            })
        }
        else if (app.game === 'Honkai') {
            removeHonkaiWeaponFromRise(props.weaponId).then(res => {
                getHonkaiWeaponsFromRise().then(res => {
                    weapons.setWeapons(res.data)
                    props.onHide()
                })
            })
        }
    }
    useEffect(() => {
        if (app.game === 'Genshin') {
            getMaxValuesForWeapon().then(res => {
                if (res.data.find(e => e.id === props.weaponId)) {
                    setMax(res.data.find(e => e.id === props.weaponId))
                }
                else {
                    setMax(weapons.maxOptions.find(e => e.stars === weapon.stars))
                }
            })
        }
    }, [])
    if (weapon) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered

            >
                <Modal.Header style={{ backgroundColor: '#212529', border: '2px solid yellow' }} closeButton>
                    <Modal.Title style={{ color: 'yellow' }} id="contained-modal-title-vcenter" >
                        {weapon.name}
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
                    <StyledImg width={'125px'} bg={weapon.stars === 5 ? 'orange' : ((weapon.stars === 4 ? '#4600f6' : '#4682B4'))} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + weapon.img}></StyledImg>
                    <Row md={'auto'}>
                        <Col md={'auto'}>
                            <RiseBar
                                counter={setWmat1}
                                materialBase={7} materialId={weapon.weaponMaterialId} quality={1} current={wmat1} max={max ? max.weaponMat1Count : (app.game === 'Zzz' ? 5 : (weapon.stars === 4 ? 3 : 4))} />
                            <RiseBar
                                counter={setWmat2}
                                materialBase={7} materialId={weapon.weaponMaterialId} quality={2} current={wmat2} max={max ? max.weaponMat2Count : (app.game === 'Zzz' ? 32 : (weapon.stars === 4 ? 9 : 12))} />
                            <RiseBar
                                counter={setWmat3}
                                materialBase={7} materialId={weapon.weaponMaterialId} quality={3} current={wmat3} max={max ? max.weaponMat3Count : (app.game === 'Zzz' ? 30 : (weapon.stars === 4 ? 12 : 15))} />
                            {app.game === 'Genshin' && <RiseBar
                                counter={setWmat4}
                                materialBase={7} materialId={weapon.weaponMaterialId} quality={4} current={wmat4} max={max ? max.weaponMat4Count : 6} />}
                            {app.game === 'Genshin' && <RiseBar
                                counter={setEwmat1}
                                materialBase={8} materialId={weapon.enemyWeaponMaterialId} quality={1} current={ewmat1} max={max ? max.enemyWMat1Count : 46} />}
                        </Col>
                        <Col md={'auto'}>
                            {app.game === 'Genshin' && <RiseBar
                                counter={setEwmat2}
                                materialBase={8} materialId={weapon.enemyWeaponMaterialId} quality={2} current={ewmat2} max={max ? max.enemyWMat2Count : 18} />}
                            {app.game === 'Genshin' && <RiseBar
                                counter={setEwmat3}
                                materialBase={8} materialId={weapon.enemyWeaponMaterialId} quality={3} current={ewmat3} max={max ? max.enemyWMat3Count : 30} />}
                            {app.game != 'Zzz' && <RiseBar
                                counter={setEmat1}
                                materialBase={3} materialId={weapon.enemyMaterialId} quality={1} current={emat1} max={max ? max.enemyMat1Count : (weapon.stars === 4 ? 15 : 20)} />}
                            {app.game != 'Zzz' && <RiseBar
                                counter={setEmat2}
                                materialBase={3} materialId={weapon.enemyMaterialId} quality={2} current={emat2} max={max ? max.enemyMat2Count : (weapon.stars === 4 ? 15 : 20)} />}
                            {app.game != 'Zzz' && <RiseBar
                                counter={setEmat3}
                                materialBase={3} materialId={weapon.enemyMaterialId} quality={3} current={emat3} max={max ? max.enemyMat3Count : (weapon.stars === 4 ? 12 : 14)} />}
                        </Col>
                    </Row>

                </Modal.Body>
                <Modal.Footer style={{ display: "flex", justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow' }}>
                    <Button variant='outline-warning' onClick={saveResult}>Сохранить</Button>
                    <Button variant='outline-danger' onClick={removeWeapon}>Удалить Оружие</Button>
                    <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>)
    }
})
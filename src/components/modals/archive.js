import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Col, Row } from 'react-bootstrap/esm/';
import { addCharToCol, getCharFromColById, getCharsFromCol, removeCharFromCol } from '../../http/charAPI';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { getAllEventRolls, getAllStandartRolls, getAllWeaponRolls } from '../../http/rollAPI';
import { StyledBox, StyledImg, StyledTitle } from '../../styledComponents/styled-components';
import { getZzzAllEventRolls, getZzzAllStandartRolls, getZzzAllWeaponRolls } from '../../http/zzz/rollAPI';
import { getHonkaiAllEventRolls, getHonkaiAllStandartRolls, getHonkaiAllWeaponRolls } from '../../http/honkai/rollAPI';
export const Archive = observer((props) => {
    const { rolls, app } = useContext(AppContext)
    const [rollsArchive, setRollsArchive] = useState()
    useEffect(() => {
        switch (props.bannerType) {
            case 'standart':
                if (app.game === 'Genshin') {
                    getAllStandartRolls().then(res => {
                        if (res) {
                            setRollsArchive(res.data.rolls)
                        }
                    })
                }
                else if (app.game === 'Zzz') {
                    getZzzAllStandartRolls().then(res => {
                        if (res) {
                            setRollsArchive(res.data.rolls)
                        }
                    })
                }
                else if (app.game === 'Honkai') {
                    getHonkaiAllStandartRolls().then(res => {
                        if (res) {
                            setRollsArchive(res.data.rolls)
                        }
                    })
                }
                break;
            case 'event':
                if (app.game === 'Genshin') {
                    getAllEventRolls().then(res => {
                        if (res) {
                            setRollsArchive(res.data.rolls)
                        }
                    })
                }
                else if (app.game === 'Zzz') {
                    getZzzAllEventRolls().then(res => {
                        if (res) {
                            setRollsArchive(res.data.rolls)
                        }
                    })
                }
                else if (app.game === 'Honkai') {
                    getHonkaiAllEventRolls().then(res => {
                        if (res) {
                            setRollsArchive(res.data.rolls)
                        }
                    })
                }
                break;
            case 'weapon':
                if (app.game === 'Genshin') {
                    getAllWeaponRolls().then(res => {
                        if (res) {
                            setRollsArchive(res.data.rolls)
                        }
                    })
                }
                else if (app.game === 'Zzz') {
                    getZzzAllWeaponRolls().then(res => {
                        if (res) {
                            setRollsArchive(res.data.rolls)
                        }
                    })
                }
                else if (app.game === 'Honkai') {
                    getHonkaiAllWeaponRolls().then(res => {
                        if (res) {
                            setRollsArchive(res.data.rolls)
                        }
                    })
                }
                break;
            default:
                break;
        }
    }, [])
    const rollsArray = rollsArchive?.map(e => <Col className='mb-2' md={12}>
        <StyledBox bg='#111111' br='20px' border='solid yellow 1px' padding='12px' display='flex' jstf='space-between' align='center' gap='10px'>
            <StyledTitle color='yellow' fz='26px'>{e.year}.{e.month}.{e.day}</StyledTitle>
            <StyledBox display='flex' align='center' gap='20px'>
                <StyledTitle color={e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4')} fz='26px'>{e.rewardName}</StyledTitle>
                <StyledTitle color={e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4')} fz='26px'>{e.stars === 5 ? '★★★★★' : (e.stars === 4 ? '★★★★' : '★★★')}</StyledTitle>
                {e.isChar ? <StyledImg height={app.game === 'Honkai' && '95px'} width='75px' br='20px' bg={e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/chars/' : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img} />
                    :
                    <StyledImg height={app.game === 'Honkai' && '95px'} width='75px' br='20px' bg={e.stars === 5 ? 'orange' : (e.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/weapons/' : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e.img} />}

            </StyledBox>
        </StyledBox>
    </Col>)
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{padding:'70px 0'}}
        >
            <Modal.Header style={{ backgroundColor: '#212529', border: '2px solid yellow' }} closeButton>
                <Modal.Title style={{ color: 'yellow' }} id="contained-modal-title-vcenter" >
                    {props.bannerType === "standart" ? 'Стандартный Баннер' : (props.bannerType === "event" ? "Ивентовый Баннер" : "Оружейный Баннер")}
                </Modal.Title>
                <Modal.Body>

                </Modal.Body>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#212529', border: '2px solid yellow', display: "flex", justifyContent: 'center' }}>
                <Row>{rollsArray}</Row>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#212529', border: '2px solid yellow', display: "flex", justifyContent: 'center' }}>
                {/* <Button
                    variant={disableCol ? 'danger' : 'outline-warning'}
                    onClick={() => { disableCol ? removeFromCol() : addToCol() }}>
                    {disableCol ? 'Удалить из Коллекции' : 'Добавить в Коллекцию'}
                </Button>
                <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button> */}
            </Modal.Footer>
        </Modal>)
}
)
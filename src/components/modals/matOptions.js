import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap/esm/';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { createTimer, deleteTimer, getTimers } from '../../http/materialAPI';
export const MatOtions = observer((props) => {
    const { materials } = useContext(AppContext)
    const { app } = useContext(AppContext)
    const [disableCol, setDisableCol] = useState(false)
    const addTimer = () => {
        createTimer(props.matId).then(res => setDisableCol(true))
        getTimers().then(res => materials.setTimers(res.data))
        app.setUpdated(true)
    }
    const removeTimer = () => {
        deleteTimer(props.matId).then(res => setDisableCol(false))
        getTimers().then(res => materials.setTimers(res.data))
        app.setUpdated(true)
    }
    const mat = materials.localSpecialtys.find(e => e.id === props.matId)
    useEffect(() => {
        if (materials.timers.some(e => e.materialId === props.matId)) {
            setDisableCol(true)
        }
    }, [props.matId])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered

        >
            <Modal.Header closeButton style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'yellow' }}>
                    {mat.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow' }}>
                <img alt='character' src={process.env.REACT_APP_API_URL + "/localSpecialtys/" + mat.img}></img>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Button
                    variant={disableCol ? 'danger' : 'outline-warning'}
                    onClick={() => { disableCol ? removeTimer() : addTimer() }}>
                    {disableCol ? 'Сбросить Таймер' : 'Материал Собран'}
                </Button>
                <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>)
})
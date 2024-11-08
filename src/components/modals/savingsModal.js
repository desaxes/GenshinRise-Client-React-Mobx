import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap/esm/';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { setZzzGems } from '../../http/zzz/gemsAPI';
import { setHonkaiGems } from '../../http/honkai/gemsAPI';
import { setGenshinGems } from '../../http/gemsAPI';

export const SavingsModal = observer((props) => {
    const { app } = useContext(AppContext)
    const [gems, setGems] = useState(0)
    const [rolls, setRolls] = useState(0)
    const [cash, setCash] = useState(0)
    const [date, setDate] = useState()
    const [com, setCom] = useState('')
    useEffect(() => {
        if (props.lastRow) {
            setGems(props.lastRow.gems)
            setRolls(props.lastRow.rolls)
            setCash(props.lastRow.cash)
        }
    }, [])
    const addGems = () => {
        if (app.game === 'Genshin') {
            setGenshinGems(
                {
                    year: +date.split('-')[0],
                    month: +date.split('-')[1],
                    day: +date.split('-')[2],
                    gems: +gems,
                    rolls: +rolls,
                    cash: +cash,
                    com: com
                }
            ).then(res => { props.setUpdate(!props.update) })
        }
        else if (app.game === 'Zzz') {
            setZzzGems(
                {
                    year: +date.split('-')[0],
                    month: +date.split('-')[1],
                    day: +date.split('-')[2],
                    gems: +gems,
                    rolls: +rolls,
                    cash: +cash,
                    com: com
                }
            ).then(res => { props.setUpdate(!props.update) })
        }
        else if (app.game === 'Honkai') {
            setHonkaiGems(
                {
                    year: +date.split('-')[0],
                    month: +date.split('-')[1],
                    day: +date.split('-')[2],
                    gems: +gems,
                    rolls: +rolls,
                    cash: +cash,
                    com: com
                }
            ).then(res => { props.setUpdate(!props.update) })
        }
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered

        >
            <Modal.Header style={{ backgroundColor: '#212529', border: '2px solid yellow' }} closeButton>
                <Modal.Title style={{ color: 'yellow' }} id="contained-modal-title-vcenter" >
                    Добавить Сбережения
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#212529', border: '2px solid yellow', display: "flex", justifyContent: 'center' }}>
                <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <input style={{ margin: '15px' }} value={date} onChange={e => setDate(e.target.value)} type='date'></input>
                    <Form.Label style={{ color: 'yellow' }}>Гемы</Form.Label>
                    <Form.Control value={gems} id='1' placeholder='Гемы' onChange={e => setGems(e.target.value)} className='mt-2 mb-2' type='number' />
                    <Form.Label style={{ color: 'yellow' }}>Крутки</Form.Label>
                    <Form.Control value={rolls} id='2' placeholder='Крутки' onChange={e => setRolls(e.target.value)} className='mt-2 mb-2' type='number' />
                    <Form.Label style={{ color: 'yellow' }}>Кэшбэк</Form.Label>
                    <Form.Control value={cash} id='3' placeholder='Кэшбэк' onChange={e => setCash(e.target.value)} className='mt-2 mb-2' type='number' />
                    <Form.Control as="textarea" rows={10} value={com} id='3' placeholder='Комментарий' onChange={e => setCom(e.target.value)} className='mt-2 mb-2' type='text' />
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#212529', border: '2px solid yellow', display: "flex", justifyContent: 'center' }}>
                <Button disabled={!gems || !rolls || !cash || !date} variant='outline-warning' onClick={addGems}>Добавить</Button>
                <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>)
})

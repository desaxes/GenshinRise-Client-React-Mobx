import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap/esm/';
import { observer } from 'mobx-react-lite';
import { AppContext } from '../..';
import { createGenshinArt } from '../../http/artsAPI';
import { createZzzArt } from '../../http/zzz/artsAPI';
import { createHonkaiArt } from '../../http/honkai/artsAPI';
export const CreateArt = observer((props) => {
    const [name, setName] = useState('')
    const [twoPartsEffect, setTwoPartsEffect] = useState('')
    const [fourPartsEffect, setFourPartsEffect] = useState('')
    const [planar, setPlanar] = useState(false)
    const { app } = useContext(AppContext)
    let [file1, setFile1] = useState(null)
    const select1 = e => {
        setFile1(e.target.files[0])
    }
    const add = () => {
        let formData = new FormData()
        formData.append('name', name)
        formData.append('twoPartsEffect', twoPartsEffect)
        formData.append('fourPartsEffect', fourPartsEffect)
        formData.append('planar', planar)
        formData.append('img', file1)
        if (app.game === 'Genshin') {
            createGenshinArt(formData).then(res => {
                setName('')
                props.onHide()
            })
        }
        else if (app.game === 'Zzz') {
            createZzzArt(formData).then(res => {
                setName('')
                props.onHide()
            })
        }
        else if (app.game === 'Honkai') {
            createHonkaiArt(formData).then(res => {
                setName('')
                setPlanar(false)
                props.onHide()
            })
        }
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'yellow' }}>
                    Создать новый сет артефактов
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                    <Form.Control placeholder='Введите название сета' onChange={e => setName(e.currentTarget.value)} value={name}>
                    </Form.Control>
                    <Form.Control placeholder='Укажите эффект от 2 частей' onChange={e => setTwoPartsEffect(e.currentTarget.value)} value={twoPartsEffect}>
                    </Form.Control>
                    <Form.Control placeholder='Укажите эффект от 4 частей' onChange={e => setFourPartsEffect(e.currentTarget.value)} value={fourPartsEffect}>
                    </Form.Control>
                    <Form.Control id='1' onChange={select1} className='mt-2 mb-2' type='file' />
                    {app.game === 'Honkai' && < Form.Check
                        label='Планарный сет' style={{ color: 'yellow' }}
                        type="switch" onChange={() => { setPlanar(!planar);console.log(planar) }}
                    />}
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Button disabled={!file1 || !name} variant='outline-warning' onClick={() => { add() }}>Добавить Артефакты</Button>
                <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>)
})
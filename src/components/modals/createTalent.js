import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Form, Dropdown } from 'react-bootstrap/esm/';
import { createTalents } from '../../http/materialAPI';
import { AppContext } from '../..';
import { createZzzTalents } from '../../http/zzz/materialAPI';
import { createHonkaiTalents } from '../../http/honkai/materialAPI';
export const CreateTalentBook = (props) => {
    const [name, setName] = useState('')
    const { app } = useContext(AppContext)
    const [dd, setDd] = useState('Выберите дни недели')
    const [days, setDays] = useState(0)
    const [path, setPath] = useState('Выберите Путь')
    const [pathId, setPathId] = useState(0)
    let [file1, setFile1] = useState(null)
    let [file2, setFile2] = useState(null)
    let [file3, setFile3] = useState(null)
    const select1 = e => {
        setFile1(e.target.files[0])
    }
    const select2 = e => {
        setFile2(e.target.files[0])
    }
    const select3 = e => {
        setFile3(e.target.files[0])
    }
    const add = () => {
        let formData = new FormData()
        formData.append('name', name)
        formData.append('days', days)
        formData.append('pathId', pathId)
        formData.append('img1', file1)
        formData.append('img2', file2)
        formData.append('img3', file3)
        if (app.game === 'Genshin') {
            createTalents(formData).then(res => {
                setName('')
                props.onHide()
            })
        }
        else if (app.game === 'Zzz') {
            createZzzTalents(formData).then(res => {
                setName('')
                props.onHide()
            })
        }
        else if (app.game === 'Honkai') {
            createHonkaiTalents(formData).then(res => {
                setName('')
                props.onHide()
            })
        }
    }
    useEffect(() => {
        if (dd === "Понедельник, Четверг") {
            setDays(1)
        }
        else if (dd === "Вторник, Пятница") {
            setDays(2)
        }
        else if (dd === "Среда, Суббота") {
            setDays(3)
        }

    }, [dd])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Modal.Title style={{ color: 'yellow' }} id="contained-modal-title-vcenter">
                    Создать новый материал
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Form>

                    <Form.Control placeholder='Введите название Материала' onChange={e => setName(e.currentTarget.value)} value={name}>

                    </Form.Control>
                    {app.game === 'Genshin' && <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {dd === '' ? 'Выберите Дни Недели' : dd}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => setDd("Понедельник, Четверг")}>Понедельник, Четверг</Dropdown.Item>
                            <Dropdown.Item onClick={() => setDd("Вторник, Пятница")}>Вторник, Пятница</Dropdown.Item>
                            <Dropdown.Item onClick={() => setDd("Среда, Суббота")}>Среда, Суббота</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>}
                    {app.game === 'Honkai' && <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {path}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setPath("Разрушение"); setPathId(1) }}>Разрушение</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setPath("Охота"); setPathId(2) }}>Охота</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setPath("Эрудиция"); setPathId(3) }}>Эрудиция</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setPath("Гармония"); setPathId(4) }}>Гармония</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setPath("Небытие"); setPathId(5) }}>Небытие</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setPath("Сохранение"); setPathId(6) }}>Сохранение</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setPath("Изобилие"); setPathId(7) }}>Изобилие</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>}
                    <Form.Control id='1' onChange={select1} className='mt-2 mb-2' type='file' />
                    <Form.Control id='2' onChange={select2} className='mt-2 mb-2' type='file' />
                    <Form.Control id='3' onChange={select3} className='mt-2 mb-2' type='file' />
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Button disabled={!file1 || !file2 || !file3 || !name} variant='outline-warning' onClick={() => { add() }}>Добавить Материал</Button>
                <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>)
}
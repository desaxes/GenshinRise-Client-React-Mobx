import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Form, Dropdown } from 'react-bootstrap/esm/';
import { createLocalSpecialtys } from '../../http/materialAPI';
export const CreateLocalSpecialty = (props) => {
    const [name, setName] = useState('')
    const [regionId, setRegionId] = useState('')
    const [region, setRegion] = useState('')
    let [file1, setFile1] = useState(null)

    const select1 = e => {
        setFile1(e.target.files[0])
    }
    const add = () => {
        let formData = new FormData()
        formData.append('name', name)
        formData.append('regionId', regionId)
        formData.append('img', file1)
        createLocalSpecialtys(formData).then(res => {
            setName('')
            props.onHide()
        })
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton style={{backgroundColor: '#212529', border: '2px solid yellow'}}>
                <Modal.Title style={{color:'yellow'}} id="contained-modal-title-vcenter">
                    Создать новый материал
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: '#212529', border: '2px solid yellow'}}>
                <Form>
                    <Form.Control placeholder='Введите название Материала' onChange={e => setName(e.currentTarget.value)} value={name}>

                    </Form.Control>
                    <Form.Control id='1' onChange={select1} className='mt-2 mb-2' type='file' />
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-success'>
                            {region === '' ? 'Выберите Регион' : region}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setRegion('Мондштадт'); setRegionId(1) }}>Мондштадт</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Ли Юэ'); setRegionId(2) }}>Ли Юэ</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Инадзума'); setRegionId(3) }}>Инадзума</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Сумеру'); setRegionId(4) }}>Сумеру</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Фонтейн'); setRegionId(5) }}>Фонтейн</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Натлан'); setRegionId(6) }}>Натлан</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Снежная'); setRegionId(7) }}>Снежная</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Form>
            </Modal.Body>
            <Modal.Footer style={{backgroundColor: '#212529', border: '2px solid yellow'}}>
                <Button disabled={!file1 || !name || !regionId} variant='outline-warning' onClick={() => { add() }}>Добавить Материал</Button>
                <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>)
}
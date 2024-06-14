import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap/esm/';
import { createBossMaterial } from '../../http/materialAPI';
export const CreateBossMaterial = (props) => {
    const [name, setName] = useState('')
    let [file1, setFile1] = useState(null)

    const select1 = e => {
        setFile1(e.target.files[0])
    }
    const add = () => {
        let formData = new FormData()
        formData.append('name', name)
        formData.append('img', file1)
        createBossMaterial(formData).then(res => {
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
                <Modal.Title id="contained-modal-title-vcenter" style={{color:'yellow'}}>
                    Создать новый материал
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: '#212529', border: '2px solid yellow'}}>
                <Form>
                    <Form.Control placeholder='Введите название Материала' onChange={e => setName(e.currentTarget.value)} value={name}>

                    </Form.Control>
                    <Form.Control id='1' onChange={select1} className='mt-2 mb-2' type='file' />
                </Form>
            </Modal.Body>
            <Modal.Footer style={{backgroundColor: '#212529', border: '2px solid yellow'}}>
                <Button disabled={!file1 || !name} variant='outline-warning' onClick={() => { add() }}>Добавить Материал</Button>
                <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>)
}
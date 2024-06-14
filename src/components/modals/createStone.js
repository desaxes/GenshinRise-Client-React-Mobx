import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Form } from 'react-bootstrap/esm/';
import { createStone } from '../../http/materialAPI';
export const CreateStone = (props) => {
    const [name, setName] = useState('')
    let [file1, setFile1] = useState(null)
    let [file2, setFile2] = useState(null)
    let [file3, setFile3] = useState(null)
    let [file4, setFile4] = useState(null)

    const select1 = e => {
        setFile1(e.target.files[0])
    }
    const select2 = e => {
        setFile2(e.target.files[0])
    }
    const select3 = e => {
        setFile3(e.target.files[0])
    }
    const select4 = e => {
        setFile4(e.target.files[0])
    }
    const add = () => {
        let formData = new FormData()
        formData.append('name', name)
        formData.append('img1', file1)
        formData.append('img2', file2)
        formData.append('img3', file3)
        formData.append('img4', file4)
        createStone(formData).then(res => {
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
                    Создать новый Камень
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: '#212529', border: '2px solid yellow'}}>
                <Form>
                    <Form.Control placeholder='Введите название Камня' onChange={e => setName(e.currentTarget.value)} value={name}>

                    </Form.Control>
                    <Form.Control id='1' onChange={select1} className='mt-2 mb-2' type='file' />
                    <Form.Control id='2' onChange={select2} className='mt-2 mb-2' type='file' />
                    <Form.Control id='3' onChange={select3} className='mt-2 mb-2' type='file' />
                    <Form.Control id='4' onChange={select4} className='mt-2 mb-2' type='file' />
                </Form>
            </Modal.Body>
            <Modal.Footer style={{backgroundColor: '#212529', border: '2px solid yellow'}}>
                <Button disabled={!file1 || !file2 || !file3 || !file4 || !name} variant='outline-warning' onClick={() => { add() }}>Добавить Камень</Button>
                <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>)
}
import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap/esm/';
import { addCharToCol, getCharFromColById, getCharsFromCol, removeCharFromCol } from '../../http/charAPI';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
export const CharOptionsForCollection = observer((props) => {
    const { chars } = useContext(AppContext)
    const [disableCol, setDisableCol] = useState(false)
    const addToCol = () => {
        addCharToCol(char).then(res => setDisableCol(true))
    }
    const removeFromCol = () => {
        removeCharFromCol(props.charId).then(res => {
            getCharsFromCol().then(res => {
                chars.setChars(res.data)
                props.onHide()
            })
        })
    }
    const char = chars.chars.chars.find(e => e.id === props.charId)
    useEffect(() => {
        getCharFromColById(props.charId).then(res => { res.data && setDisableCol(true) })
    }, [props.charId])
    if (char) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered

            >
                <Modal.Header style={{ backgroundColor: '#212529', border: '2px solid yellow' }} closeButton>
                    <Modal.Title style={{ color: 'yellow' }} id="contained-modal-title-vcenter" >
                        {char.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#212529', border: '2px solid yellow', display: "flex", justifyContent: 'center' }}>
                    <img alt='character' src={process.env.REACT_APP_API_URL + "/chars/" + char.img}></img>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#212529', border: '2px solid yellow', display: "flex", justifyContent: 'center' }}>
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
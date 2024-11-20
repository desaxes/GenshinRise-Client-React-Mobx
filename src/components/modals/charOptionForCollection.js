import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap/esm/';
import { addCharToCol, getCharFromColById, getCharsFromCol, removeCharFromCol } from '../../http/charAPI';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { addZzzCharToCol, getZzzCharFromColById, getZzzCharsFromCol, removeZzzCharFromCol } from '../../http/zzz/charAPI';
import { getHonkaiCharFromColById, getHonkaiCharsFromCol, removeHonkaiCharFromCol } from '../../http/honkai/charAPI';
export const CharOptionsForCollection = observer((props) => {
    const { chars, app } = useContext(AppContext)
    const [disableCol, setDisableCol] = useState(false)
    const [currentGame, setCurrentGame] = useState(props.currentGame)
    useEffect(() => {
        if (app.game != currentGame) {
            props.onHide()
        }
    }, [app.game])
    const addToCol = () => {
        if (app.game === "Genshin") {
            addCharToCol(char).then(res => setDisableCol(true))
        }
        else if (app.game === 'Zzz') {
            addZzzCharToCol(char).then(res => setDisableCol(true))
        }
    }
    const removeFromCol = () => {
        if (app.game === "Genshin") {
            removeCharFromCol(props.charId).then(res => {
                getCharsFromCol().then(res => {
                    chars.setChars(res.data)
                    props.onHide()
                })
            })
        }
        else if (app.game === "Zzz") {
            removeZzzCharFromCol(props.charId).then(res => {
                getZzzCharsFromCol().then(res => {
                    chars.setChars(res.data)
                    props.onHide()
                })
            })
        }
        else if (app.game === "Honkai") {
            removeHonkaiCharFromCol(props.charId).then(res => {
                getHonkaiCharsFromCol().then(res => {
                    chars.setChars(res.data)
                    props.onHide()
                })
            })
        }
    }
    const char = chars.chars.chars.find(e => e.id === props.charId)
    useEffect(() => {
        if (app.game === "Genshin") {
            getCharFromColById(props.charId).then(res => { res.data && setDisableCol(true) })
        }
        else if (app.game === "Zzz") {
            getZzzCharFromColById(props.charId).then(res => { res.data && setDisableCol(true) })
        }
        else if (app.game === "Honkai") {
            getHonkaiCharFromColById(props.charId).then(res => { res.data && setDisableCol(true) })
        }
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
                    <img style={{ height: app.game === 'Honkai' ? '200px' : '150px', width: '150px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + char.img}></img>
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
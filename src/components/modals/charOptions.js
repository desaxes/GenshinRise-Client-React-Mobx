import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap/esm/';
import { addCharToCol, addCharToRise, addMaxValues, getCharFromColById, getCharFromRiseById, removeCharFromCol, removeCharFromRise, removeMaxValues } from '../../http/charAPI';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { Form } from 'react-bootstrap/esm/';
import { StyledBox, StyledTitle } from '../../styledComponents/styled-components';
import { addZzzCharToCol, addZzzCharToRise, getZzzCharFromColById, getZzzCharFromRiseById, removeZzzCharFromCol, removeZzzCharFromRise } from '../../http/zzz/charAPI';
export const CharOptions = observer((props) => {
    const [disableCol, setDisableCol] = useState(false)
    const [changeMats, setChangeMats] = useState(false)
    const [disableRise, setDisableRise] = useState(false)
    const [stone1, setStone1] = useState()
    const [stone2, setStone2] = useState()
    const [stone3, setStone3] = useState()
    const [stone4, setStone4] = useState()
    const [spec, setSpec] = useState()
    const [emat1, setEmat1] = useState()
    const [emat2, setEmat2] = useState()
    const [emat3, setEmat3] = useState()
    const [bmat, setBmat] = useState()
    const [ematTalent1, setEmatTalent1] = useState()
    const [ematTalent2, setEmatTalent2] = useState()
    const [ematTalent3, setEmatTalent3] = useState()
    const [talent1, setTalent1] = useState()
    const [talent2, setTalent2] = useState()
    const [talent3, setTalent3] = useState()
    const [wbmat, setWbmat] = useState()
    const addToCol = () => {
        if (app.game === "Genshin") {
            addCharToCol(char).then(res => setDisableCol(true))
        }
        else if (app.game === 'Zzz') {
            addZzzCharToCol(char).then(res => setDisableCol(true))
        }
    }
    const addToRise = () => {
        if (changeMats) {
            addMaxValues({
                id: char.id,
                s1: stone1 || 0,
                s2: stone2 || 0,
                s3: stone3 || 0,
                s4: stone4 || 0,
                spec: spec || 0,
                emat1: emat1 || 0,
                emat2: emat2 || 0,
                emat3: emat3 || 0,
                ematT1: ematTalent1 || 0,
                ematT2: ematTalent2 || 0,
                ematT3: ematTalent3 || 0,
                bmat: bmat || 0,
                tal1: talent1 || 0,
                tal2: talent2 || 0,
                tal3: talent3 || 0,
                wbmat: wbmat || 0
            })
            addCharToRise(char).then(res => { setDisableRise(true); setChangeMats(false) })
        }
        else {
            if (app.game === 'Genshin') {
                addCharToRise(char).then(res => { setDisableRise(true); setChangeMats(false) })
            }
            else if (app.game === 'Zzz') {
                addZzzCharToRise(char).then(res => { setDisableRise(true); setChangeMats(false) })
            }
        }
    }
    const removeFromCol = () => {
        if (app.game === "Genshin") {
            removeCharFromCol(props.charId).then(res => setDisableCol(false))
        }
        else if (app.game === "Zzz") {
            removeZzzCharFromCol(props.charId).then(res => setDisableCol(false))
        }
    }
    const removeFromRise = () => {
        if (app.game === 'Genshin') {
            removeCharFromRise(props.charId).then(res => {
                removeMaxValues(props.charId).then(res => setDisableRise(false))
            })
        }
        else if (app.game === 'Zzz') {
            removeZzzCharFromRise(props.charId).then(res => setDisableRise(false))
        }
    }
    const { chars, app } = useContext(AppContext)
    const char = chars.chars.chars.find(e => e.id === props.charId)
    useEffect(() => {
        if (app.game === "Genshin") {
            getCharFromColById(props.charId).then(res => { res.data && setDisableCol(true) })
            getCharFromRiseById(props.charId).then(res => { res.data && setDisableRise(true) })
        }
        else if (app.game === "Zzz") {
            getZzzCharFromColById(props.charId).then(res => { res.data && setDisableCol(true) })
            getZzzCharFromRiseById(props.charId).then(res => { res.data && setDisableRise(true) })
        }
    }, [props.charId, app.game])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered

        >
            <Modal.Header closeButton style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'yellow' }}>
                    {char.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ display: "flex", justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow' }}>
                <img style={{ height: '150px', width: '150px' }} alt='character' src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : '/zzz/chars/') + char.img}></img>
            </Modal.Body>
            <Modal.Footer style={{ display: "flex", justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Button
                    variant={disableCol ? 'danger' : 'outline-warning'}
                    onClick={() => { disableCol ? removeFromCol() : addToCol() }}>
                    {disableCol ? 'Удалить из Коллекции' : 'Добавить в Коллекцию'}
                </Button>
                <Button
                    variant={disableRise ? 'danger' : 'outline-warning'}
                    onClick={() => { disableRise ? removeFromRise() : addToRise() }}>
                    {disableRise ? 'Удалить из Прокачки' : 'Добавить в Прокачку'}
                </Button>
                {!disableRise && <Button
                    variant={changeMats ? 'warning' : 'outline-warning'}
                    onClick={() => setChangeMats(!changeMats)}>
                    {changeMats ? 'Выбор Материалов' : 'Авто Выбор Материалов'}
                </Button>}
                <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
                {changeMats && <StyledBox>
                    <Form className="d-flex align-items-center" style={{ flexDirection: 'column' }} >
                        <StyledTitle color='yellow' fz='20px'>Камни</StyledTitle>
                        <StyledBox display='flex' gap='20px'>
                            <Form.Control value={stone1} onChange={e => { setStone1(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Обычный ' />
                            <Form.Control value={stone2} onChange={e => { setStone2(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Редкий ' />
                            <Form.Control value={stone3} onChange={e => { setStone3(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Эпический' />
                            <Form.Control value={stone4} onChange={e => { setStone4(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Легендарный' />
                        </StyledBox>
                    </Form>
                    <Form className="d-flex align-items-center" style={{ flexDirection: 'column' }} >
                        <StyledTitle align='center' color='yellow' fz='20px'>Материалы с врагов</StyledTitle>
                        <StyledBox display='flex' gap='20px'>
                            <Form.Control value={emat1} onChange={e => { setEmat1(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Обычный ' />
                            <Form.Control value={emat2} onChange={e => { setEmat2(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Редкий ' />
                            <Form.Control value={emat3} onChange={e => { setEmat3(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Эпический' />
                        </StyledBox>
                    </Form>
                    <Form className="d-flex align-items-center" style={{ flexDirection: 'column' }} >
                        <StyledTitle align='center' color='yellow' fz='20px'>Диковинки и Материалы с Боссов</StyledTitle>
                        <StyledBox display='flex' gap='20px'>
                            <Form.Control value={spec} onChange={e => { setSpec(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Диковинка ' />
                            <Form.Control value={bmat} onChange={e => { setBmat(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Материал ' />
                            <Form.Control value={wbmat} onChange={e => { setWbmat(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Недельный босс ' />
                        </StyledBox>
                    </Form>
                    <Form className="d-flex align-items-center" style={{ flexDirection: 'column' }} >
                        <StyledTitle align='center' color='yellow' fz='20px'>Книги Талантов</StyledTitle>
                        <StyledBox display='flex' gap='20px'>
                            <Form.Control value={talent1} onChange={e => { setTalent1(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Обычная ' />
                            <Form.Control value={talent2} onChange={e => { setTalent2(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Редкая ' />
                            <Form.Control value={talent3} onChange={e => { setTalent3(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Эпическая' />
                        </StyledBox>
                    </Form>
                    <Form className="d-flex align-items-center" style={{ flexDirection: 'column' }} >
                        <StyledTitle align='center' color='yellow' fz='20px'>Материалы для Талантов</StyledTitle>
                        <StyledBox display='flex' gap='20px'>
                            <Form.Control value={ematTalent1} onChange={e => { setEmatTalent1(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Обычный ' />
                            <Form.Control value={ematTalent2} onChange={e => { setEmatTalent2(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Редкий ' />
                            <Form.Control value={ematTalent3} onChange={e => { setEmatTalent3(e.target.value) }} type='number' className='mt-2 mb-2' placeholder='Эпический' />
                        </StyledBox>
                    </Form>
                </StyledBox>}
            </Modal.Footer>
        </Modal>)
})
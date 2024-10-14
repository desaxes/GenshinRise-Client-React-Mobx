import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Dropdown, Form } from 'react-bootstrap/esm/';
import { getChars } from '../../http/charAPI';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { StyledBox } from '../../styledComponents/styled-components';
import { addBanner } from '../../http/bannerAPI';
import { addZzzBanner } from '../../http/zzz/bannerAPI';
import { getZzzChars } from '../../http/zzz/charAPI';
export const CreateBanner = observer((props) => {
    const { chars, app } = useContext(AppContext)
    const [legChar1, setLegChar1] = useState('')
    const [legChar2, setLegChar2] = useState('')
    const [epicChar1, setEpicChar1] = useState('')
    const [epicChar2, setEpicChar2] = useState('')
    const [epicChar3, setEpicChar3] = useState('')
    const [patchNumber, setPatchNumber] = useState('')
    const [date1, setDate1] = useState('')
    const [date2, setDate2] = useState('')
    let [file1, setFile1] = useState(null)
    let [file2, setFile2] = useState(null)
    const [success, setSuccess] = useState(false)
    useEffect(() => {
        if (app.game === 'Genshin') { getChars().then(res => chars.setChars(res.data)) }
        else if (app.game === 'Zzz') { getZzzChars().then(res => chars.setChars(res.data)) }
    }, [app.game])
    const select1 = e => {
        setFile1(e.target.files[0])
    }
    const select2 = e => {
        setFile2(e.target.files[0])
    }
    const createBanner = () => {
        if (app.game === 'Genshin') {
            let formData = new FormData()
            formData.append('year', +date1.split('-')[0])
            formData.append('lmonth', +date1.split('-')[1])
            formData.append('lday', +date1.split('-')[2])
            formData.append('hmonth', +date2.split('-')[1])
            formData.append('hday', +date2.split('-')[2])
            formData.append('charId1', legChar1.id)
            formData.append('charName1', legChar1.name)
            formData.append('charId2', legChar2.id)
            formData.append('charName2', legChar2.name)
            formData.append('epicCharId1', epicChar1.id)
            formData.append('epicCharId2', epicChar2.id)
            formData.append('epicCharId3', epicChar3.id)
            formData.append('img1', file1)
            formData.append('img2', file2)
            formData.append('patchNumber', patchNumber.toString())
            addBanner(formData)
        }
        else if (app.game === 'Zzz') {
            let formData = new FormData()
            formData.append('year', +date1.split('-')[0])
            formData.append('lmonth', +date1.split('-')[1])
            formData.append('lday', +date1.split('-')[2])
            formData.append('hmonth', +date2.split('-')[1])
            formData.append('hday', +date2.split('-')[2])
            formData.append('charId1', legChar1.id)
            formData.append('charName1', legChar1.name)
            formData.append('charId2', legChar2.id)
            formData.append('charName2', legChar2.name)
            formData.append('epicCharId1', epicChar1.id)
            formData.append('epicCharId2', epicChar2.id)
            formData.append('epicCharId3', epicChar3.id)
            formData.append('img1', file1)
            formData.append('img2', file2)
            formData.append('patchNumber', patchNumber.toString())
            addZzzBanner(formData)
        }
    }
    useEffect(() => {
        setTimeout(() => setSuccess(false), 2000)
    }, [success])
    console.log(patchNumber)
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ paddingTop: '70px', paddingBottom: '70px' }}
        >
            <Modal.Header style={{ backgroundColor: '#212529', border: '2px solid yellow' }} closeButton>
                <Modal.Title style={{ color: 'yellow' }} id="contained-modal-title-vcenter" >
                    Добавить Баннер
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#212529', border: '2px solid yellow', display: "flex", justifyContent: 'center' }}>
                <StyledBox display='flex' dir='column' align='center'>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'center', color: 'yellow' }}>
                        <p>Дата Начала</p>
                        <input value={date1} onChange={e => setDate1(e.target.value)} type='date'></input>
                        <p>Дата Конца</p>
                        <input value={date2} onChange={e => setDate2(e.target.value)} type='date'></input>
                    </div>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {legChar1 === '' ? 'Выберите Персонажа 5*' : legChar1.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {chars.chars.chars.filter(e => e.stars === 5).map(e =>
                                <Dropdown.Item
                                    onClick={() => { setLegChar1(e) }}
                                    key={e.id}>
                                    <StyledBox display='flex' align='center' jstf='center' >
                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : '/zzz/chars/') + e.img}></img>
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {legChar2 === '' ? 'Выберите Персонажа 5*' : legChar2.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {chars.chars.chars.filter(e => e.stars === 5).map(e =>
                                <Dropdown.Item
                                    onClick={() => { setLegChar2(e) }}
                                    key={e.id}>
                                    <StyledBox display='flex' align='center' jstf='center' >
                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : '/zzz/chars/') + e.img}></img>
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {epicChar1 === '' ? 'Выберите Персонажа 4*' : epicChar1.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {chars.chars.chars.filter(e => e.stars === 4).map(e =>
                                <Dropdown.Item
                                    onClick={() => { setEpicChar1(e) }}
                                    key={e.id}>
                                    <StyledBox display='flex' align='center' jstf='center' >
                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : '/zzz/chars/') + e.img}></img>
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {epicChar2 === '' ? 'Выберите Персонажа 4*' : epicChar2.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {chars.chars.chars.filter(e => e.stars === 4).map(e =>
                                <Dropdown.Item
                                    onClick={() => { setEpicChar2(e) }}
                                    key={e.id}>
                                    <StyledBox display='flex' align='center' jstf='center' >
                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : '/zzz/chars/') + e.img}></img>
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {epicChar3 === '' ? 'Выберите Персонажа 4*' : epicChar3.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {chars.chars.chars.filter(e => e.stars === 4).map(e =>
                                <Dropdown.Item
                                    onClick={() => { setEpicChar3(e) }}
                                    key={e.id}>
                                    <StyledBox display='flex' align='center' jstf='center' >
                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : '/zzz/chars/') + e.img}></img>
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form>
                        <Form.Control id='1' onChange={select1} className='mt-2 mb-2' type='file' />
                        <Form.Control id='2' onChange={select2} className='mt-2 mb-2' type='file' />
                    </Form>
                    <p style={{ fontWeight: 'bold', color: 'yellow' }}>Номер Патча</p>
                    <Form>
                        <Form.Control id='1' onChange={e => setPatchNumber(e.target.value)} className='mt-2 mb-2' type='number' />
                    </Form>
                </StyledBox>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#212529', border: '2px solid yellow', display: "flex", justifyContent: 'center' }}>
                <Button disabled={!date1 || !date2 || !legChar1 || !epicChar2 || !epicChar1 || !file1 || success} variant='outline-warning' onClick={createBanner}>Добавить</Button>
                <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
                {success && <p style={{ color: 'yellow', position: 'absolute', right: '20px' }}>Добавлено!</p>}
            </Modal.Footer>
        </Modal>)
})

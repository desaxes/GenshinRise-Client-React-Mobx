import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Dropdown, Form } from 'react-bootstrap/esm/';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { getEnemyMaterials } from '../../http/materialAPI';
import { StyledBox } from '../../styledComponents/styled-components';
import { getEnemyWeaponMaterials, getWeaponMaterials } from '../../http/weaponMatAPI';
import { createWeapon } from '../../http/weaponAPI';
import { createZzzWeapon } from '../../http/zzz/weaponAPI';
import { getZzzWeaponMaterials } from '../../http/zzz/weaponMatAPI';
export const CreateWeapon = observer((props) => {
    let { materials, app } = useContext(AppContext)
    let [name, setName] = useState('')
    let [file, setFile] = useState(null)
    let [wmat, setWMat] = useState('')
    let [wmatId, setWmatId] = useState('')
    let [enemymat, setEnemymat] = useState('')
    let [enemymatId, setEnemymatId] = useState('')
    let [ewmat, setEwmat] = useState('')
    let [ewmatId, setEwmatId] = useState('')
    let [weapon, setWeapon] = useState('')
    let [weaponId, setWeaponId] = useState('')
    let [stars, setStars] = useState('')
    let [starsNumber, setStarsNumber] = useState('')
    useEffect(() => {
        if (app.game === 'Genshin') {
            getEnemyWeaponMaterials().then(res => res && (materials.setEnemyWeaponMaterials(res.data)))
            getEnemyMaterials().then(res => res && (materials.setEnemyMaterials(res.data)))
            getWeaponMaterials().then(res => res && (materials.setWeaponMaterials(res.data)))
        }
        else if (app.game === 'Zzz') {
            getZzzWeaponMaterials().then(res => res && (materials.setWeaponMaterials(res.data)))
        }
    }, [materials, app.game])
    const select = e => {
        setFile(e.target.files[0])
    }
    const addWeapon = () => {
        let formData = new FormData()
        formData.append('name', name)
        formData.append('enemyMaterialId', enemymatId)
        formData.append('enemyWeaponMaterialId', ewmatId)
        formData.append('weaponMaterialId', wmatId)
        formData.append('weaponId', weaponId)
        formData.append('stars', starsNumber)
        formData.append('img', file)
        if (app.game === 'Genshin') {
            createWeapon(formData).then(res => props.onHide())
        }
        else if (app.game === 'Zzz') {
            createZzzWeapon(formData).then(res => props.onHide())
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
                    Создание Оружия
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Form>
                    <Form.Control value={name} onChange={e => { setName(e.target.value) }} className='mt-2 mb-2' placeholder='Enter name' />
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {wmat === '' ? 'Выберите Материал Для Оружия' : wmat}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {materials.weaponMaterials.map(e =>
                                <Dropdown.Item
                                    onClick={() => { setWMat(e.name); setWmatId(e.id) }}
                                    key={e.id}>
                                    <StyledBox display='flex' align='center' jstf='center' >
                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/weaponMaterials/' : '/zzz/weaponMaterials/') + e.img1}></img>
                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/weaponMaterials/' : '/zzz/weaponMaterials/') + e.img2}></img>
                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/weaponMaterials/' : '/zzz/weaponMaterials/') + e.img3}></img>
                                        {app.game === 'Genshin' && <img alt='stone' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + '/weaponMaterials/' + e.img4}></img>}
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    {app.game === 'Genshin' && <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {enemymat === '' ? 'Выберите Материал Врага' : enemymat}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {materials.enemyMaterials.map(e =>
                                <Dropdown.Item
                                    onClick={() => { setEnemymat(e.name); setEnemymatId(e.id) }}
                                    key={e.id}>
                                    <StyledBox display='flex' align='center' jstf='center' >
                                        <img alt='enemy material' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + '/enemyMaterials/' + e.img1}></img>
                                        <img alt='enemy material' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + '/enemyMaterials/' + e.img2}></img>
                                        <img alt='enemy material' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + '/enemyMaterials/' + e.img3}></img>
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>}
                    {app.game === 'Genshin' && <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {ewmat === '' ? 'Выберите Оружейный Материал Врагов' : ewmat}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {materials.enemyWeaponMaterials.map(e =>
                                <Dropdown.Item
                                    onClick={() => { setEwmat(e.name); setEwmatId(e.id) }}
                                    key={e.id}>
                                    <StyledBox display='flex' align='center' jstf='center' >
                                        <img alt='talent' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + '/enemyWeaponMaterials/' + e.img1}></img>
                                        <img alt='talent' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + '/enemyWeaponMaterials/' + e.img2}></img>
                                        <img alt='talent' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + '/enemyWeaponMaterials/' + e.img3}></img>
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>}
                    {app.game === 'Genshin' && <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {weapon === '' ? 'Выберите Тип Оружия' : weapon}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setWeapon('Одноручное'); setWeaponId(1) }}>Одноручное</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setWeapon('Двуручное'); setWeaponId(2) }}>Двуручное</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setWeapon('Копье'); setWeaponId(3) }}>Копье</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setWeapon('Лук'); setWeaponId(4) }}>Лук</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setWeapon('Катализатор'); setWeaponId(5) }}>Катализатор</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>}
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning   '>
                            {stars === '' ? 'Выберите Редкость' : stars}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setStars("Редкое"); setStarsNumber(3) }}>Редкое</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setStars("Эпическое"); setStarsNumber(4) }}>Эпическое</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setStars('Легендарное'); setStarsNumber(5) }}>Легендарное</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {/* <Form.Control value={price} onChange={e => { setPrice(Number(e.target.value)) }} className='mt-2 mb-2' placeholder='Enter price' type='number' /> */}
                    <Form.Control onChange={select} className='mt-2 mb-2' type='file' />
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Button disabled={
                    !name || !wmat || !stars || !file
                } variant='outline-success' onClick={addWeapon}>Добавить Оружие</Button>
                <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>)
})
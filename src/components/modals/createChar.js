import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Dropdown, Form } from 'react-bootstrap/esm/';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { getBossMaterials, getEnemyMaterials, getLocalSpecialtys, getStones, getTalents, getWBMaterials } from '../../http/materialAPI';
import { createChar } from '../../http/charAPI';
import { StyledBox } from '../../styledComponents/styled-components';
export const CreateCharacter = observer((props) => {
    let { materials } = useContext(AppContext)
    let [name, setName] = useState('')
    let [file, setFile] = useState(null)
    let [stone, setStone] = useState('')
    let [stoneId, setStoneId] = useState('')
    let [bossmat, setBossmat] = useState('')
    let [bossmatId, setBossmatId] = useState('')
    let [spec, setSpec] = useState('')
    let [specId, setSpecId] = useState('')
    let [enemymat, setEnemymat] = useState('')
    let [enemymatId, setEnemymatId] = useState('')
    let [talent, setTalent] = useState('')
    let [talentId, setTalentId] = useState('')
    let [wbmat, setWbmat] = useState('')
    let [wbmatId, setWbmatId] = useState('')
    let [weapon, setWeapon] = useState('')
    let [weaponId, setWeaponId] = useState('')
    let [region, setRegion] = useState('')
    let [regionId, setRegionId] = useState('')
    let [sex, setSex] = useState('')
    let [sexId, setSexId] = useState('')
    let [stars, setStars] = useState('')
    let [starsNumber, setStarsNumber] = useState('')
    let [size, setSize] = useState('')
    let [sizeNumber, setSizeNumber] = useState('')
    useEffect(() => {
        getStones().then(res => (materials.setStones(res.data)))
        getEnemyMaterials().then(res => (materials.setEnemyMaterials(res.data)))
        getBossMaterials().then(res => (materials.setBossMaterials(res.data)))
        getLocalSpecialtys().then(res => (materials.setLocalSpecialtys(res.data)))
        getTalents().then(res => (materials.setTalents(res.data)))
        getWBMaterials().then(res => (materials.setWeekBossMaterials(res.data)))
    }, [materials])
    const select = e => {
        setFile(e.target.files[0])
    }
    const addChar = () => {
        let formData = new FormData()
        formData.append('name', name)
        formData.append('localSpecialtyId', specId)
        formData.append('enemyMaterialId', enemymatId)
        formData.append('bossMaterialId', bossmatId)
        formData.append('stoneTypeId', stoneId)
        formData.append('talentMaterialId', talentId)
        formData.append('weekBossMaterialId', wbmatId)
        formData.append('weaponId', weaponId)
        formData.append('region', regionId)
        formData.append('sex', sexId)
        formData.append('stars', starsNumber)
        formData.append('size', sizeNumber)
        formData.append('img', file)
        createChar(formData).then(res => props.onHide())
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
                    Создание Персонажа
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{backgroundColor: '#212529', border: '2px solid yellow'}}>
                <Form>
                    <Form.Control value={name} onChange={e => { setName(e.target.value) }} className='mt-2 mb-2' placeholder='Enter name' />
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {stone === '' ? 'Выберите Камень' : stone}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {materials.stones.map(e =>
                                <Dropdown.Item
                                    onClick={() => { setStone(e.name); setStoneId(e.id) }}
                                    key={e.id}>
                                    <StyledBox display='flex' align='center' jstf='center' >
                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + '/stones/' + e.img4}></img>
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {bossmat === '' ? 'Выберите Материал Босса' : bossmat}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {materials.bossMaterials.map(e =>
                                <Dropdown.Item
                                    onClick={() => { setBossmat(e.name); setBossmatId(e.id) }}
                                    key={e.id}>
                                    <StyledBox display='flex' align='center' jstf='center' >
                                        <img alt='boss material' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + '/bossMaterials/' + e.img}></img>
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2' >
                        <Dropdown.Toggle variant='outline-warning'>
                            {spec === '' ? 'Выберите Диковинку' : spec}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {materials.localSpecialtys.map(e =>
                                <Dropdown.Item
                                    onClick={() => { setSpec(e.name); setSpecId(e.id) }}
                                    key={e.id}>
                                    <StyledBox display='flex' align='center' jstf='center' >
                                        <img alt='local specialty' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + '/localSpecialtys/' + e.img}></img>
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
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
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {talent === '' ? 'Выберите книгу талантов' : talent}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {materials.talents.map(e =>
                                <Dropdown.Item
                                    onClick={() => { setTalent(e.name); setTalentId(e.id) }}
                                    key={e.id}>
                                    <StyledBox display='flex' align='center' jstf='center' >
                                        <img alt='talent' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + '/talents/' + e.img1}></img>
                                        <img alt='talent' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + '/talents/' + e.img2}></img>
                                        <img alt='talent' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + '/talents/' + e.img3}></img>
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {wbmat === '' ? 'Выберите материал еженедельного босса' : wbmat}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {materials.weekBossMaterials.map(e =>
                                <Dropdown.Item
                                    onClick={() => { setWbmat(e.name); setWbmatId(e.id) }}
                                    key={e.id}>
                                    <StyledBox display='flex' align='center' jstf='center' >
                                        <img alt='week boss material' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + '/weekBossMaterials/' + e.img}></img>
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {weapon === '' ? 'Выберите Оружие' : weapon}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setWeapon('Одноручное'); setWeaponId(1) }}>Одноручное</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setWeapon('Двуручное'); setWeaponId(2) }}>Двуручное</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setWeapon('Копье'); setWeaponId(3) }}>Копье</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setWeapon('Лук'); setWeaponId(4) }}>Лук</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setWeapon('Катализатор'); setWeaponId(5) }}>Катализатор</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
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
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {sex === '' ? 'Выберите Пол' : sex}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setSex('Женский'); setSexId(1) }}>Женский</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setSex('Мужской'); setSexId(2) }}>Мужской</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning   '>
                            {stars === '' ? 'Выберите Редкость' : stars}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setStars("Эпический"); setStarsNumber(4) }}>Эпический</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setStars('Легендарный'); setStarsNumber(5) }}>Легендарный</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {size === '' ? 'Выберите Размер Модельки' : size}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setSize("Низкая"); setSizeNumber(1) }}>Низкая</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setSize('Средняя'); setSizeNumber(2) }}>Средняя</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setSize('Высокая'); setSizeNumber(3) }}>Высокая</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control onChange={select} className='mt-2 mb-2' type='file' />
                </Form>
            </Modal.Body>
            <Modal.Footer style={{backgroundColor: '#212529', border: '2px solid yellow'}}>
                <Button disabled={
                    !name || !stone || !bossmat || !spec || !enemymat || !talent || !wbmat || !weapon || !region || !sex || !stars || !file
                } variant='outline-success' onClick={addChar}>Добавить Персонажа</Button>
                <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>)
})
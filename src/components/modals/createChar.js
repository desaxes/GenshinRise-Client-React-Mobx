import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Dropdown, Form } from 'react-bootstrap/esm/';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { getBossMaterials, getEnemyMaterials, getLocalSpecialtys, getStones, getTalents, getWBMaterials } from '../../http/materialAPI';
import { createChar } from '../../http/charAPI';
import { StyledBox } from '../../styledComponents/styled-components';
import { getZzzBossMaterials, getZzzEnemyMaterials, getZzzTalents, getZzzWBMaterials } from '../../http/zzz/materialAPI';
import { createZzzChar } from '../../http/zzz/charAPI';
import { getHonkaiBossMaterials, getHonkaiEnemyMaterials, getHonkaiTalents, getHonkaiWBMaterials } from '../../http/honkai/materialAPI';
import { createHonkaiChar } from '../../http/honkai/charAPI';
export const CreateCharacter = observer((props) => {
    let { materials, app } = useContext(AppContext)
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
    let [pathId, setPathId] = useState('')
    let elements = [{
        name: 'Ветер',
        id: 1
    }, {
        name: 'Мнимый',
        id: 2
    }, {
        name: 'Электро',
        id: 3
    }, {
        name: 'Квант',
        id: 4
    }, {
        name: 'Физа',
        id: 5
    }, {
        name: 'Огонь',
        id: 6
    }, {
        name: 'Лед',
        id: 7
    }]
    useEffect(() => {
        if (app.game === 'Genshin') {
            getStones().then(res => res && (materials.setStones(res.data)))
            getEnemyMaterials().then(res => res && (materials.setEnemyMaterials(res.data)))
            getBossMaterials().then(res => res && (materials.setBossMaterials(res.data)))
            getLocalSpecialtys().then(res => res && (materials.setLocalSpecialtys(res.data)))
            getTalents().then(res => res && (materials.setTalents(res.data)))
            getWBMaterials().then(res => res && (materials.setWeekBossMaterials(res.data)))
        }
        else if (app.game === 'Zzz') {
            getZzzEnemyMaterials().then(res => res && (materials.setEnemyMaterials(res.data)))
            getZzzBossMaterials().then(res => res && (materials.setBossMaterials(res.data)))
            getZzzTalents().then(res => res && (materials.setTalents(res.data)))
            getZzzWBMaterials().then(res => res && (materials.setWeekBossMaterials(res.data)))
        }
        else if (app.game === 'Honkai') {
            getHonkaiEnemyMaterials().then(res => res && (materials.setEnemyMaterials(res.data)))
            getHonkaiBossMaterials().then(res => res && (materials.setBossMaterials(res.data)))
            getHonkaiTalents().then(res => res && (materials.setTalents(res.data)))
            getHonkaiWBMaterials().then(res => res && (materials.setWeekBossMaterials(res.data)))
        }
    }, [materials, app.game])
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
        formData.append('pathId', pathId)
        formData.append('img', file)
        if (app.game === 'Genshin') {
            createChar(formData).then(res => props.onHide())
        }
        else if (app.game === 'Zzz') {
            createZzzChar(formData).then(res => props.onHide())
        }
        else if (app.game === 'Honkai') {
            createHonkaiChar(formData).then(res => props.onHide())
        }
    }
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{ marginTop: '50px' }}
        >
            <Modal.Header closeButton style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'yellow' }}>
                    Создание Персонажа
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Form>
                    <Form.Control value={name} onChange={e => { setName(e.target.value) }} className='mt-2 mb-2' placeholder='Enter name' />
                    {app.game != 'Zzz' && <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {stone === '' ? (app.game === 'Genshin' ? 'Выберите Камень' : 'Выберите Элемент') : stone}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {(app.game === 'Genshin' ? materials.stones : elements).map(e =>
                                <Dropdown.Item
                                    onClick={() => { setStone(e.name); setStoneId(e.id) }}
                                    key={e.id}>
                                    <StyledBox display='flex' align='center' jstf='center' >
                                        {app.game === 'Genshin' && <img alt='stone' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + '/stones/' + e.img4}></img>}
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>}
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
                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/bossMaterials/' : (app.game === 'Zzz' ? '/zzz/bossMaterials/' : '/honkai/bossMaterials/')) + e.img}></img>
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    {app.game === 'Genshin' && <Dropdown className='mt-2 mb-2' >
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
                    </Dropdown>}
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {enemymat === '' ? (app.game != 'Zzz' ? 'Выберите Материал Врага' : 'Выберите Жетоны Специализации Персонажа') : enemymat}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {materials.enemyMaterials.map(e =>
                                <Dropdown.Item
                                    onClick={() => { setEnemymat(e.name); setEnemymatId(e.id) }}
                                    key={e.id}>
                                    <StyledBox display='flex' align='center' jstf='center' >
                                        <img alt='enemy material' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/enemyMaterials/' : (app.game === 'Zzz' ? '/zzz/enemyMaterials/' : '/honkai/enemyMaterials/')) + e.img1}></img>
                                        <img alt='enemy material' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/enemyMaterials/' : (app.game === 'Zzz' ? '/zzz/enemyMaterials/' : '/honkai/enemyMaterials/')) + e.img2}></img>
                                        <img alt='enemy material' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/enemyMaterials/' : (app.game === 'Zzz' ? '/zzz/enemyMaterials/' : '/honkai/enemyMaterials/')) + e.img3}></img>
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {talent === '' ? (app.game === 'Genshin' ? 'Выберите Книгу Талантов' : (app.game === 'Zzz' ? 'Выберите Тип Чипов' : 'Выберите Материал Следов')) : talent}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {materials.talents.map(e =>
                                <Dropdown.Item
                                    onClick={() => { setTalent(e.name); setTalentId(e.id); setPathId(e.pathId) }}
                                    key={e.id}>
                                    <StyledBox display='flex' align='center' jstf='center' >
                                        <img alt='talent' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/talents/' : (app.game === 'Zzz' ? '/zzz/talents/' : '/honkai/talents/')) + e.img1}></img>
                                        <img alt='talent' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/talents/' : (app.game === 'Zzz' ? '/zzz/talents/' : '/honkai/talents/')) + e.img2}></img>
                                        <img alt='talent' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/talents/' : (app.game === 'Zzz' ? '/zzz/talents/' : '/honkai/talents/')) + e.img3}></img>
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
                                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? '/weekBossMaterials/' : (app.game === 'Zzz' ? '/zzz/weekBossMaterials/' : '/honkai/weekBossMaterials/')) + e.img}></img>
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>
                    {app.game === 'Genshin' && <Dropdown className='mt-2 mb-2'>
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
                    </Dropdown>}
                    {app.game === 'Genshin' && <Dropdown className='mt-2 mb-2'>
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
                    </Dropdown>}
                    {app.game === 'Zzz' && <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {region === '' ? 'Выберите Фракцию' : region}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setRegion('Хитрые Зайцы'); setRegionId(1) }}>Хитрые Зайцы</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Комбинат Белобог'); setRegionId(2) }}>Комбинат Белобог</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Агентство домашнего персонала Виктория'); setRegionId(3) }}>Агентство домашнего персонала Виктория</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Отряд Обол'); setRegionId(4) }}>Отряд Обол</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Секция 6'); setRegionId(5) }}>Секция 6</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Особая группа отдела угрозыска'); setRegionId(6) }}>Особая группа отдела угрозыска</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Сыны Калидона'); setRegionId(7) }}>Сыны Калидона</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Созвездие Лиры'); setRegionId(8) }}>Созвездие Лиры</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>}
                    {app.game === 'Honkai' && <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {region === '' ? 'Выберите Фракцию' : region}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setRegion('Звездный Экспресс'); setRegionId(1) }}>Звездный Экспресс</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Космическая станция Герта'); setRegionId(2) }}>Космическая станция Герта</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Белобог'); setRegionId(3) }}>Белобог</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Альянс Сяньчжоу'); setRegionId(4) }}>Альянс Сяньчжоу</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Пенакония'); setRegionId(5) }}>Пенакония</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Охотники за Стеларонами'); setRegionId(6) }}>Охотники за Стеларонами</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('КММ'); setRegionId(7) }}>КММ</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Общество Гениев'); setRegionId(8) }}>Общество Гениев</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Галактические Рейнджеры'); setRegionId(9) }}>Галактические Рейнджеры</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Гильдия Эрудитов'); setRegionId(10) }}>Гильдия Эрудитов</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Самоуничтожители'); setRegionId(11) }}>Самоуничтожители</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Сад Воспоминаний'); setRegionId(12) }}>Сад Воспоминаний</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRegion('Рыцари Красоты'); setRegionId(13) }}>Рыцари Красоты</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>}
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
                    {app.game === 'Genshin' && <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {size === '' ? 'Выберите Размер Модельки' : size}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setSize("Низкая"); setSizeNumber(1) }}>Низкая</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setSize('Средняя'); setSizeNumber(2) }}>Средняя</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setSize('Высокая'); setSizeNumber(3) }}>Высокая</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>}
                    <Form.Control onChange={select} className='mt-2 mb-2' type='file' />
                </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                <Button disabled={
                    !name || !bossmat || !enemymat || !talent || !wbmat || !region || !sex || !stars || !file
                } variant='outline-success' onClick={addChar}>Добавить Персонажа</Button>
                <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
            </Modal.Footer>
        </Modal>)
})
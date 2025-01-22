import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { AppContext } from '..';
import { getChars, getCharsFromCol } from '../http/charAPI';
import { Char } from '../components/char';
import { observer } from 'mobx-react-lite';
import { CharOptionsForCollection } from '../components/modals/charOptionForCollection';
import { StyledBox, StyledTitle } from '../styledComponents/styled-components';
import { getWeapons, getWeaponsFromCol } from '../http/weaponAPI';
import { Weapon } from '../components/weapon';
import { WeaponOptionsForCollection } from '../components/modals/weaponOptionsForCollection';
import { getZzzChars, getZzzCharsFromCol } from '../http/zzz/charAPI';
import { getZzzWeapons, getZzzWeaponsFromCol } from '../http/zzz/weaponAPI';
import { getHonkaiChars, getHonkaiCharsFromCol } from '../http/honkai/charAPI';
import { getHonkaiWeapons, getHonkaiWeaponsFromCol } from '../http/honkai/weaponAPI';
import { Button } from 'react-bootstrap';
import { getGenshinArts } from '../http/artsAPI';
import { getZzzArts } from '../http/zzz/artsAPI';
import { getHonkaiArts } from '../http/honkai/artsAPI';

const Collection = observer(() => {
    const { chars, app, arts } = useContext(AppContext)
    const { weapons } = useContext(AppContext)
    const [mod, setMod] = useState('chars')
    const [currentGame, setCurrentGame] = useState()
    const [id, setId] = useState()
    const [propId, setPropId] = useState(0)
    const [modalType, setModalType] = useState()
    const [modalOptions, setModalOptions] = useState(false)
    const createModal = (id, type) => {
        setId(id)
        setModalType(type)
        setModalOptions(true)
    }
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])
    useEffect(() => {
        if (mod === 'chars') {
            if (app.game === "Genshin") {
                getWeapons().then(res => weapons.setWeapons(res.data))
                getGenshinArts().then(res => arts.setArts(res.data))
            }
            else if (app.game === "Zzz") {
                getZzzWeapons().then(res => weapons.setWeapons(res.data))
                getZzzArts().then(res => arts.setArts(res.data))
            }
            else if (app.game === "Honkai") {
                getHonkaiWeapons().then(res => weapons.setWeapons(res.data))
                getHonkaiArts().then(res => arts.setArts(res.data))
            }
        }
    }, [app.game, arts, mod, weapons])
    useEffect(() => {
        if (currentGame !== app.game) {
            chars.setElement('')
            chars.setMaterial('')
            chars.setPath('')
            chars.setTalent('')
            chars.setWeapon('')
            chars.setRegion('')
            chars.setStars('')
            chars.setSex('')
            chars.setSize('')
            chars.setSearchBy('')
            weapons.setWeapon('')
            weapons.setMaterial('')
            weapons.setPathId('')
            weapons.setStars('')
            weapons.setSearchBy('')
            setPropId(0)
            setCurrentGame(app.game)
        }
    }, [app.game, chars, currentGame, weapons])
    useEffect(() => {
        let query = ''
        if (mod === 'chars') {
            if (chars.element !== '') {
                query = query + 'stoneTypeId=' + chars.element + '&'
            }
            if (chars.talent !== '') {
                query = query + 'talentMaterialId=' + chars.talent + '&'
            }
            if (chars.path !== '') {
                query = query + 'pathId=' + chars.path + '&'
            }
            if (chars.material !== '') {
                query = query + 'enemyMaterialId=' + chars.material + '&'
            }
            if (chars.weapon !== '') {
                query = query + 'weaponId=' + chars.weapon + '&'
            }
            if (chars.region !== '') {
                query = query + 'region=' + chars.region + '&'
            }
            if (chars.stars !== '') {
                query = query + 'stars=' + chars.stars + '&'
            }
            if (chars.sex !== '') {
                query = query + 'sex=' + chars.sex + '&'
            }
            if (chars.size !== '') {
                query = query + 'size=' + chars.size + '&'
            }
            if (chars.searchBy !== '') {
                query = query + 'name=' + chars.searchBy + '&'
            }
        }
        if (mod === 'weapons') {
            if (weapons.weapon !== '') {
                query = query + 'weaponId=' + weapons.weapon + '&'
            }
            if (weapons.material !== '') {
                query = query + 'weaponMaterialId=' + weapons.material + '&'
            }
            if (weapons.stars !== '') {
                query = query + 'stars=' + weapons.stars + '&'
            }
            if (weapons.pathId !== '') {
                query = query + 'pathId=' + weapons.pathId + '&'
            }
            if (weapons.searchBy !== '') {
                query = query + 'name=' + weapons.searchBy + '&'
            }
        }
        if (app.game === 'Genshin') {
            if (mod === 'chars') { getCharsFromCol(query).then(res => { res && chars.setChars(res.data) }) }
            else if (mod === 'weapons') {
                getWeaponsFromCol(query).then(res => { res && weapons.setWeapons(res.data) })
                getChars().then(res => chars.setChars(res.data))
            }
        }
        else if (app.game === 'Zzz') {
            if (mod === 'chars') { getZzzCharsFromCol(query).then(res => { res && chars.setChars(res.data) }) }
            else if (mod === 'weapons') {
                getZzzWeaponsFromCol(query).then(res => { res && weapons.setWeapons(res.data) })
                getZzzChars().then(res => chars.setChars(res.data))
            }
        }
        else if (app.game === 'Honkai') {
            if (mod === 'chars') { getHonkaiCharsFromCol(query).then(res => { res && chars.setChars(res.data) }) }
            else if (mod === 'weapons') {
                getHonkaiWeaponsFromCol(query).then(res => { res && weapons.setWeapons(res.data) })
                getHonkaiChars().then(res => chars.setChars(res.data))
            }
        }
    }, [app.game, chars.material, chars.talent, chars.element,
    chars.weapon, chars.region, chars.stars, chars.sex,
    chars.size, chars.searchBy, chars, chars.path,
    weapons.material, weapons.weapon, weapons.stars, weapons.searchBy,
        weapons, weapons.pathId, mod])
    let characters = chars.chars.chars.map(e => <Char gridpart={3} key={e.id} char={e} onShow={createModal} />)
    let weaponsArray = weapons.weapons.weapons.filter(e => (app.game !== 'Honkai' && propId !== 0) ? e.weaponInfo?.prop?.id === propId : e).map(e => <Weapon gridpart={3} key={e.id} weapon={e} onShow={createModal} />)
    return (
        <>
            <Container style={{ textShadow: '2px 2px 2px black' }}>
                <StyledTitle className='mt-3' color='yellow'>Коллекция</StyledTitle>
                <StyledBox display='flex' gap='10px'>
                    <Button variant={mod === 'chars' ? 'warning' : 'outline-warning'} onClick={() => setMod('chars')}>
                        Персонажи
                    </Button>
                    <Button variant={mod === 'weapons' ? 'warning' : 'outline-warning'} onClick={() => setMod('weapons')}>
                        Оружие
                    </Button>
                </StyledBox>
                {mod === 'chars' &&
                    <Row className='mt-3 pb-5'>
                        <Col md={3} className='mt-5'>
                            {app.game !== 'Zzz' && <StyledTitle color='yellow' fz='22px'>
                                Стихия
                            </StyledTitle >}
                            {app.game !== 'Zzz' && <Row className='mb-2'>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setElement(1)} variant={chars.element === 1 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>{app.game === 'Genshin' ? 'Анемо' : 'Ветер'}</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setElement(2)} variant={chars.element === 2 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>{app.game === 'Genshin' ? 'Гео' : 'Мнимый'}</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setElement(3)} variant={chars.element === 3 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Электро</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setElement(4)} variant={chars.element === 4 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>{app.game === 'Genshin' ? 'Дендро' : 'Квант'}</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setElement(5)} variant={chars.element === 5 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>{app.game === 'Genshin' ? 'Гидро' : 'Физический'}</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setElement(6)} variant={chars.element === 6 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>{app.game === 'Genshin' ? 'Пиро' : 'Огонь'}</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setElement(7)} variant={chars.element === 7 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>{app.game === 'Genshin' ? 'Крио' : 'Лед'}</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setElement('')} variant={chars.element === '' ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Все</Button></Col>
                            </Row>}
                            {app.game === 'Zzz' && <StyledTitle color='yellow' fz='22px'>
                                Специализация
                            </StyledTitle >}
                            {app.game === 'Zzz' && <Row className='mb-2'>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setMaterial(1)} variant={chars.material === 1 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Аномалия</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setMaterial(2)} variant={chars.material === 2 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Нападение</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setMaterial(3)} variant={chars.material === 3 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Устрашение</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setMaterial(4)} variant={chars.material === 4 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Поддержка</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setMaterial(5)} variant={chars.material === 5 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Оборона</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setMaterial('')} variant={chars.material === '' ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Все</Button></Col>
                            </Row>}
                            {app.game === 'Honkai' && <StyledTitle color='yellow' fz='22px'>
                                Путь
                            </StyledTitle >}
                            {app.game === 'Honkai' && <Row className='mb-2'>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setPath(1)} variant={chars.path === 1 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Разрушение</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setPath(2)} variant={chars.path === 2 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Охота</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setPath(3)} variant={chars.path === 3 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Эрудиция</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setPath(4)} variant={chars.path === 4 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Гармония</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setPath(5)} variant={chars.path === 5 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Небытие</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setPath(6)} variant={chars.path === 6 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Сохранение</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setPath(7)} variant={chars.path === 7 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Изобилие</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setPath('')} variant={chars.path === '' ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Все</Button></Col>
                            </Row>}
                            {app.game === 'Zzz' && <StyledTitle color='yellow' fz='22px'>
                                Элемент
                            </StyledTitle >}
                            {app.game === 'Zzz' && <Row className='mb-2'>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setTalent(1)} variant={chars.talent === 1 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Поджог</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setTalent(2)} variant={chars.talent === 2 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Шок</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setTalent(3)} variant={chars.talent === 3 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Физа</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setTalent(4)} variant={chars.talent === 4 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Лед</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setTalent(5)} variant={chars.talent === 5 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Эфир</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setTalent('')} variant={chars.talent === '' ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Все</Button></Col>
                            </Row>}
                            {app.game === 'Genshin' && <StyledTitle color='yellow' fz='22px'>
                                Оружие
                            </StyledTitle>}
                            {app.game === 'Genshin' && <Row className='mb-2'>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setWeapon(1)} variant={chars.weapon === 1 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Одноручное</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setWeapon(2)} variant={chars.weapon === 2 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Двуручное</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setWeapon(3)} variant={chars.weapon === 3 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Древковое</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setWeapon(4)} variant={chars.weapon === 4 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Стрелковое</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setWeapon(5)} variant={chars.weapon === 5 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Катализатор</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setWeapon('')} variant={chars.weapon === '' ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Все</Button></Col>
                            </Row>}
                            <StyledTitle color='yellow' fz='22px'>
                                {app.game === 'Genshin' ? 'Регион' : 'Фракция'}
                            </StyledTitle>
                            {app.game === 'Genshin' && <Row className='mb-2'>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(1)} variant={chars.region === 1 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Мондштадт </Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(2)} variant={chars.region === 2 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Ли Юэ</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(3)} variant={chars.region === 3 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Инадзума</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(4)} variant={chars.region === 4 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Сумеру</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(5)} variant={chars.region === 5 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Фонтейн</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(6)} variant={chars.region === 6 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Натлан' </Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(7)} variant={chars.region === 7 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Снежная' </Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion('')} variant={chars.region === '' ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Все</Button></Col>
                            </Row>}
                            {app.game === 'Zzz' && <Row className='mb-2'>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(1)} variant={chars.region === 1 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Хитрые Зайцы</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(2)} variant={chars.region === 2 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Комбинат Белобог</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(3)} variant={chars.region === 3 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Виктория</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(4)} variant={chars.region === 4 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Отряд Обол</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(5)} variant={chars.region === 5 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Секция 6</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(6)} variant={chars.region === 6 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Угрозыск</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(7)} variant={chars.region === 7 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Сыны Калидона</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(8)} variant={chars.region === 8 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Созвездие Лиры</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion('')} variant={chars.region === '' ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Все</Button></Col>
                            </Row>}
                            {app.game === 'Honkai' && <Row className='mb-2'>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(1)} variant={chars.region === 1 ? 'warning' : 'outline-warning'} style={{ width: '140px', fontWeight: 'bold' }}>Экспресс</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(2)} variant={chars.region === 2 ? 'warning' : 'outline-warning'} style={{ width: '140px', fontWeight: 'bold' }}>Герта</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(3)} variant={chars.region === 3 ? 'warning' : 'outline-warning'} style={{ width: '140px', fontWeight: 'bold' }}>Белобог</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(4)} variant={chars.region === 4 ? 'warning' : 'outline-warning'} style={{ width: '140px', fontWeight: 'bold' }}>Сяньчжоу</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(5)} variant={chars.region === 5 ? 'warning' : 'outline-warning'} style={{ width: '140px', fontWeight: 'bold' }}>Пенакония</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(11)} variant={chars.region === 11 ? 'warning' : 'outline-warning'} style={{ width: '140px', fontWeight: 'bold' }}>Небытие </Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(6)} variant={chars.region === 6 ? 'warning' : 'outline-warning'} style={{ width: '140px', fontWeight: 'bold' }}>Охотники за Стеларонами</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(8)} variant={chars.region === 8 ? 'warning' : 'outline-warning'} style={{ width: '140px', fontWeight: 'bold' }}>Общество Гениев</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(9)} variant={chars.region === 9 ? 'warning' : 'outline-warning'} style={{ width: '140px', fontWeight: 'bold' }}>Галактические Рейнджеры</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(10)} variant={chars.region === 10 ? 'warning' : 'outline-warning'} style={{ width: '140px', fontWeight: 'bold' }}>Гильдия Эрудитов</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(12)} variant={chars.region === 12 ? 'warning' : 'outline-warning'} style={{ width: '140px', fontWeight: 'bold' }}>Сад Воспоминаний</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(13)} variant={chars.region === 13 ? 'warning' : 'outline-warning'} style={{ width: '140px', fontWeight: 'bold' }}>Рыцари Красоты</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(7)} variant={chars.region === 7 ? 'warning' : 'outline-warning'} style={{ width: '140px', fontWeight: 'bold' }}>КММ</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion('')} variant={chars.region === '' ? 'warning' : 'outline-warning'} style={{ width: '140px', fontWeight: 'bold' }}>Все</Button></Col>
                            </Row>}
                            <StyledTitle color='yellow' fz='22px'>
                                Редкость
                            </StyledTitle>
                            <Row className='mb-2'>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setStars(4)} variant={chars.stars === 4 ? 'warning' : 'outline-warning'} style={{ width: '80px', fontWeight: 'bold' }}>4★</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setStars(5)} variant={chars.stars === 5 ? 'warning' : 'outline-warning'} style={{ width: '80px', fontWeight: 'bold' }}>5★</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setStars('')} variant={chars.stars === '' ? 'warning' : 'outline-warning'} style={{ width: '80px', fontWeight: 'bold' }}>Все</Button></Col>
                            </Row>
                            <StyledTitle color='yellow' fz='22px'>
                                Пол
                            </StyledTitle>
                            <Row className='mb-2'>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setSex(1)} variant={chars.sex === 1 ? 'warning' : 'outline-warning'} style={{ width: '100px', fontWeight: 'bold' }}>Женский</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setSex(2)} variant={chars.sex === 2 ? 'warning' : 'outline-warning'} style={{ width: '100px', fontWeight: 'bold' }}>Мужской</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setSex('')} variant={chars.sex === '' ? 'warning' : 'outline-warning'} style={{ width: '50px', fontWeight: 'bold' }}>Все</Button></Col>
                            </Row>
                            {app.game === 'Genshin' && <StyledTitle color='yellow' fz='22px'>
                                Рост
                            </StyledTitle>}
                            {app.game === 'Genshin' && <Row className='mb-2'>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setSize(1)} variant={chars.size === 1 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Низкий</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setSize(2)} variant={chars.size === 2 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Средний</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setSize(3)} variant={chars.size === 3 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Высокий</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => chars.setSize('')} variant={chars.size === '' ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Все</Button></Col>
                            </Row>}
                        </Col>
                        <Col className='mt-4 d-flex flex-column align-items-center' md={'9'}>
                            <Row md={'auto'} className='d-flex justify-content-center'
                                style={{ width: '100%' }}
                            >
                                {characters.length ? characters : <StyledTitle fz='24px' color='red'>Персонажи Отсутствуют</StyledTitle>}
                            </Row>
                        </Col>
                    </Row>}
                {mod === 'weapons' &&
                    <Row className='mt-3 pb-5'>
                        <Col md={3} className='mt-5'>
                            {app.game === 'Genshin' && <StyledTitle color='yellow' fz='22px'>
                                Тип Оружия
                            </StyledTitle>}
                            {app.game === 'Genshin' && < Row className='mb-2'>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setWeapon(1)} variant={weapons.weapon === 1 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Одноручное</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setWeapon(2)} variant={weapons.weapon === 2 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Двуручное</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setWeapon(3)} variant={weapons.weapon === 3 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Древковое</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setWeapon(4)} variant={weapons.weapon === 4 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Стрелковое</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setWeapon(5)} variant={weapons.weapon === 5 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Катализатор</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setWeapon('')} variant={weapons.weapon === '' ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Все</Button></Col>
                            </Row>}
                            {app.game === 'Zzz' && <StyledTitle color='yellow' fz='22px'>
                                Тип Амплификатора
                            </StyledTitle>}
                            {app.game === 'Zzz' && < Row className='mb-2'>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setMaterial(1)} variant={weapons.material === 1 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Аномалия</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setMaterial(2)} variant={weapons.material === 2 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Нападение</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setMaterial(3)} variant={weapons.material === 3 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Устрашение</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setMaterial(4)} variant={weapons.material === 4 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Поддержка</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setMaterial(5)} variant={weapons.material === 5 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Оборона</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setMaterial('')} variant={weapons.material === '' ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Все</Button></Col>
                            </Row>}
                            {app.game === 'Honkai' && <StyledTitle color='yellow' fz='22px'>
                                Путь
                            </StyledTitle>}
                            {app.game === 'Honkai' && < Row className='mb-2'>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setPathId(1)} variant={weapons.pathId === 1 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Разрушение</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setPathId(2)} variant={weapons.pathId === 2 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Охота</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setPathId(3)} variant={weapons.pathId === 3 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Эрудиция</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setPathId(4)} variant={weapons.pathId === 4 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Гармония</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setPathId(5)} variant={weapons.pathId === 5 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Небытие</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setPathId(6)} variant={weapons.pathId === 6 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Сохранение</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setPathId(7)} variant={weapons.pathId === 7 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Изобилие</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setPathId('')} variant={weapons.pathId === '' ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Все</Button></Col>
                            </Row>}
                            <StyledTitle color='yellow' fz='22px'>
                                Редкость
                            </StyledTitle>
                            <Row className='mb-2'>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setStars(3)} variant={weapons.stars === 3 ? 'warning' : 'outline-warning'} style={{ width: '80px', fontWeight: 'bold' }}>3★</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setStars(4)} variant={weapons.stars === 4 ? 'warning' : 'outline-warning'} style={{ width: '80px', fontWeight: 'bold' }}>4★</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setStars(5)} variant={weapons.stars === 5 ? 'warning' : 'outline-warning'} style={{ width: '80px', fontWeight: 'bold' }}>5★</Button></Col>
                                <Col md='auto' className='mt-1'><Button onClick={() => weapons.setStars('')} variant={weapons.stars === '' ? 'warning' : 'outline-warning'} style={{ width: '80px', fontWeight: 'bold' }}>Все</Button></Col>
                            </Row>
                            {app.game !== 'Honkai' && <StyledBox>
                                <StyledTitle color='yellow' fz='22px'>
                                    Основная Хар-ка
                                </StyledTitle>
                                <Row className='mb-2' style={{ justifyContent: 'space-between' }}>
                                    <Col md='auto' className='mt-1'><Button onClick={() => setPropId(1)} variant={propId === 1 ? 'warning' : 'outline-warning'} style={{ fontWeight: 'bold', width: '140px' }}>HP</Button></Col>
                                    <Col md='auto' className='mt-1'><Button onClick={() => setPropId(3)} variant={propId === 3 ? 'warning' : 'outline-warning'} style={{ fontWeight: 'bold', width: '140px' }}>Сила Атаки</Button></Col>
                                    <Col md='auto' className='mt-1'><Button onClick={() => setPropId(5)} variant={propId === 5 ? 'warning' : 'outline-warning'} style={{ fontWeight: 'bold', width: '140px' }}>Защита</Button></Col>
                                    <Col md='auto' className='mt-1'><Button onClick={() => setPropId(7)} variant={propId === 7 ? 'warning' : 'outline-warning'} style={{ fontWeight: 'bold', width: '140px' }}>{app.game === 'Genshin' ? 'МС' : (app.game === 'Zzz' && 'ЗА')}</Button></Col>
                                    <Col md='auto' className='mt-1'><Button onClick={() => setPropId(8)} variant={propId === 8 ? 'warning' : 'outline-warning'} style={{ fontWeight: 'bold', width: '140px' }}>ВЭ</Button></Col>
                                    <Col md='auto' className='mt-1'><Button onClick={() => setPropId(9)} variant={propId === 9 ? 'warning' : 'outline-warning'} style={{ fontWeight: 'bold', width: '140px' }}>Крит. Шанс</Button></Col>
                                    <Col md='auto' className='mt-1'><Button onClick={() => setPropId(10)} variant={propId === 10 ? 'warning' : 'outline-warning'} style={{ fontWeight: 'bold', width: '140px' }}>Крит. Урон</Button></Col>
                                    {app.game === 'Genshin' && <Col md='auto' className='mt-1'><Button onClick={() => setPropId(19)} variant={propId === 19 ? 'warning' : 'outline-warning'} style={{ fontWeight: 'bold', width: '140px' }}>Физ. Урон</Button></Col>}
                                    {app.game === 'Zzz' && <Col md='auto' className='mt-1'><Button onClick={() => setPropId(17)} variant={propId === 17 ? 'warning' : 'outline-warning'} style={{ fontWeight: 'bold', width: '140px' }}>Пробивание</Button></Col>}
                                    {app.game === 'Zzz' && <Col md='auto' className='mt-1'><Button onClick={() => setPropId(18)} variant={propId === 18 ? 'warning' : 'outline-warning'} style={{ fontWeight: 'bold', width: '140px' }}>Импульс</Button></Col>}
                                    <Col md='auto' className='mt-1'><Button onClick={() => setPropId(0)} variant={propId === 0 ? 'warning' : 'outline-warning'} style={{ fontWeight: 'bold', width: '140px' }}>Все</Button></Col>
                                </Row>
                            </StyledBox>}
                        </Col>
                        <Col className='mt-4 d-flex flex-column align-items-center' md={9}>
                            <Row className='d-flex justify-content-center'
                                jstf='space-between' gap='30px' style={{ width: '100%' }}
                            >
                                {weaponsArray.length ? weaponsArray : <StyledTitle align='center' fz='24px' color='red'>Оружие Отсутствует</StyledTitle>}
                            </Row>
                        </Col>
                    </Row >}
                {modalOptions && modalType === 'char' && <CharOptionsForCollection
                    show={true}
                    onHide={() => setModalOptions(false)}
                    charId={id}
                    currentGame={app.game}
                />}
                {modalOptions && modalType === 'weapon' && <WeaponOptionsForCollection
                    show={true}
                    onHide={() => setModalOptions(false)}
                    weaponId={id}
                    currentGame={app.game}
                />}
            </Container>
        </>
    )
})

export default Collection
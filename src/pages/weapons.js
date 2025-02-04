import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { AppContext } from '..';
import { getChars } from '../http/charAPI';
import { Button } from 'react-bootstrap/esm/';
import { StyledBox, StyledTitle } from '../styledComponents/styled-components';
import { observer } from 'mobx-react-lite';
import Form from 'react-bootstrap/Form';
import { getWeapons } from '../http/weaponAPI';
import { Weapon } from '../components/weapon';
import { WeaponOptions } from '../components/modals/weaponOptions';
import { getZzzWeapons } from '../http/zzz/weaponAPI';
import { getHonkaiWeapons } from '../http/honkai/weaponAPI';
import { getZzzChars } from '../http/zzz/charAPI';
import { getHonkaiChars } from '../http/honkai/charAPI';

const Weapons = observer(() => {
    const { weapons, app, chars } = useContext(AppContext)
    const [weaponId, setWeaponId] = useState()
    const [propId, setPropId] = useState(0)
    const [currentGame, setCurrentGame] = useState()
    const [modalOptions, setModalOptions] = useState(false)
    const createModal = (id) => {
        setWeaponId(id)
        setModalOptions(true)
    }
    useEffect(() => {
        if (currentGame !== app.game) {
            weapons.setWeapon('')
            weapons.setMaterial('')
            weapons.setPathId('')
            weapons.setStars('')
            weapons.setSearchBy('')
            setPropId(0)
            setCurrentGame(app.game)
        }
    }, [app.game, currentGame, weapons])
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])
    useEffect(() => {
        let query = ''
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
        if (app.game === 'Genshin') {
            getWeapons(query).then(res => { res && weapons.setWeapons(res.data) })
            getChars().then(res => chars.setChars(res.data))
        }
        else if (app.game === 'Zzz') {
            getZzzWeapons(query).then(res => { res && weapons.setWeapons(res.data) })
            getZzzChars().then(res => chars.setChars(res.data))
        }
        else if (app.game === 'Honkai') {
            getHonkaiWeapons(query).then(res => { res && weapons.setWeapons(res.data) })
            getHonkaiChars().then(res => chars.setChars(res.data))
        }
    }, [app.game, weapons.material, weapons.weapon, weapons.stars, weapons.searchBy, weapons, weapons.pathId, chars])
    let weaponsArray = weapons.weapons.weapons.filter(e => (app.game !== 'Honkai' && propId !== 0) ? e.weaponInfo?.prop?.id === propId : e).map(e => <Weapon gridpart={4} key={e.id} weapon={e} onShow={createModal} />)
    return (
        <>
            <Container style={{ textShadow: '2px 2px 2px black' }}>
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
                            <Col md='auto' className='mt-1'><Button onClick={() => weapons.setPathId(8)} variant={weapons.pathId === 8 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Память</Button></Col>
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
                        {/* <Dropdown>
                                <Dropdown.Toggle variant='outline-success'>
                                    {'Элемент'}
                                </Dropdown.Toggle>
                                <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto', backgroundColor:'transparent' }}>
                                    <Dropdown.Item style={{backgroundColor:'Red'}}>
                                        Пиро
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}
                    </Col>
                    <Col className='mt-4 d-flex flex-column align-items-center' md={9}>
                        <Form className="d-flex" >
                            <Form.Control
                                type="search"
                                placeholder="Поиск"
                                className="me-2"
                                aria-label="Поиск"
                                value={weapons.searchBy}
                                onChange={e => weapons.setSearchBy(e.target.value)}
                                style={{ color: 'red', fontWeight: 'bold' }}
                            />
                        </Form>
                        <Row className='d-flex justify-content-center'
                            jstf='space-between' gap='30px' style={{ width: '100%' }}
                        >
                            {weaponsArray}
                        </Row>
                    </Col>
                </Row >
                {modalOptions && <WeaponOptions
                    show={true}
                    onHide={() => setModalOptions(false)}
                    weaponId={weaponId}
                    currentGame={app.game}
                />
                }
            </Container >
        </>
    )
})
export default Weapons
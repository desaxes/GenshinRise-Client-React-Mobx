import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { AppContext } from '..';
import { getChars } from '../http/charAPI';
import { Char } from '../components/char';
import { CharOptions } from '../components/modals/charOptions';
import { Button } from 'react-bootstrap/esm/';
import { StyledTitle } from '../styledComponents/styled-components';
import { observer } from 'mobx-react-lite';
import Form from 'react-bootstrap/Form';
import { getZzzChars } from '../http/zzz/charAPI';
import { getHonkaiChars } from '../http/honkai/charAPI';

const Characters = observer(() => {
    const { chars, app } = useContext(AppContext)
    const [charId, setCharId] = useState()
    const [modalOptions, setModalOptions] = useState(false)
    const createModal = (id) => {
        setCharId(id)
        setModalOptions(true)
    }
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])
    useEffect(() => {
        let query = ''
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
        if (app.game === 'Genshin') {
            getChars(query).then(res => { res && chars.setChars(res.data) })
        }
        else if (app.game === 'Zzz') {
            getZzzChars(query).then(res => { res && chars.setChars(res.data) })
        }
        else if (app.game === 'Honkai') {
            getHonkaiChars(query).then(res => { res && chars.setChars(res.data) })
        }
        // getStones().then(res => materials.setElements(res.data.map(e => e.id)))
    }, [app.game, chars.material, chars.talent, chars.element, chars.weapon, chars.region, chars.stars, chars.sex, chars.size, chars.searchBy, chars, chars.path])
    let characters = chars.chars.chars.map(e => <Char gridpart={4} key={e.id} char={e} onShow={createModal} />)
    return (
        <>
            <Container style={{ textShadow: '2px 2px 2px black' }}>
                <Row className='mt-3 pb-5'>
                    <Col md={3} className='mt-5'>
                        {app.game != 'Zzz' && <StyledTitle color='yellow' fz='22px'>
                            Стихия
                        </StyledTitle >}
                        {app.game != 'Zzz' && <Row className='mb-2'>
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
                        {app.game != 'Honkai' && <Row className='mb-2'>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(1)} variant={chars.region === 1 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>{app.game === 'Genshin' ? 'Мондштадт' : 'Хитрые Зайцы'}</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(2)} variant={chars.region === 2 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>{app.game === 'Genshin' ? 'Ли Юэ' : 'Комбинат Белобог'}</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(3)} variant={chars.region === 3 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>{app.game === 'Genshin' ? 'Инадзума' : 'Виктория'}</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(4)} variant={chars.region === 4 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>{app.game === 'Genshin' ? 'Сумеру' : 'Отряд Обол'}</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(5)} variant={chars.region === 5 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>{app.game === 'Genshin' ? 'Фонтейн' : 'Секция 6'}</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(6)} variant={chars.region === 6 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>{app.game === 'Genshin' ? 'Натлан' : 'Угрозыск'}</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(7)} variant={chars.region === 7 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>{app.game === 'Genshin' ? 'Снежная' : 'Сыны Калидона'}</Button></Col>
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
                    <Col className='mt-4 d-flex flex-column align-items-center' md={'9'}>
                        <Form className="d-flex" >
                            <Form.Control
                                type="search"
                                placeholder="Поиск"
                                className="me-2"
                                aria-label="Поиск"
                                value={chars.searchBy}
                                onChange={e => chars.setSearchBy(e.target.value)}
                                style={{ color: 'red', fontWeight: 'bold' }}
                            />
                        </Form>
                        <Row md={'auto'} className='d-flex justify-content-center'
                            style={{ width: '100%' }}
                        >
                            {characters}
                        </Row>
                    </Col>
                </Row>
                {modalOptions && <CharOptions
                    show={true}
                    onHide={() => setModalOptions(false)}
                    charId={charId}
                />}
            </Container>
        </>
    )
}
)
export default Characters
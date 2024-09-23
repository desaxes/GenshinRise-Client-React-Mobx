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

const Characters = observer(() => {
    const { chars } = useContext(AppContext)
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
        getChars(query).then(res => { res && chars.setChars(res.data) })
        // getStones().then(res => materials.setElements(res.data.map(e => e.id)))
    }, [chars.element, chars.weapon, chars.region, chars.stars, chars.sex, chars.size, chars.searchBy, chars])
    let characters = chars.chars.chars.map(e => <Char gridpart={4} key={e.id} char={e} onShow={createModal} />)
    return (
        <>
            <Container >
                <Row className='mt-3 pb-5'>
                    <Col md={3} className='mt-5'>
                        <StyledTitle color='yellow' fz='22px'>
                            Стихия
                        </StyledTitle >
                        <Row className='mb-2'>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setElement(1)} variant={chars.element === 1 ? 'warning' : 'outline-warning'} style={{ width: '85px', fontWeight: '' }}>Анемо</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setElement(2)} variant={chars.element === 2 ? 'warning' : 'outline-warning'} style={{ width: '85px', fontWeight: 'bold' }}>Гео</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setElement(3)} variant={chars.element === 3 ? 'warning' : 'outline-warning'} style={{ width: '85px', fontWeight: 'bold' }}>Электро</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setElement(4)} variant={chars.element === 4 ? 'warning' : 'outline-warning'} style={{ width: '85px', fontWeight: 'bold' }}>Дендро</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setElement(5)} variant={chars.element === 5 ? 'warning' : 'outline-warning'} style={{ width: '85px', fontWeight: 'bold' }}>Гидро</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setElement(6)} variant={chars.element === 6 ? 'warning' : 'outline-warning'} style={{ width: '85px', fontWeight: 'bold' }}>Пиро</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setElement(7)} variant={chars.element === 7 ? 'warning' : 'outline-warning'} style={{ width: '85px', fontWeight: 'bold' }}>Крио</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setElement('')} variant={chars.element === '' ? 'warning' : 'outline-warning'} style={{ width: '85px', fontWeight: 'bold' }}>Все</Button></Col>
                        </Row>
                        <StyledTitle color='yellow' fz='22px'>
                            Оружие
                        </StyledTitle>
                        <Row className='mb-2'>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setWeapon(1)} variant={chars.weapon === 1 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Одноручное</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setWeapon(2)} variant={chars.weapon === 2 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Двуручное</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setWeapon(3)} variant={chars.weapon === 3 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Древковое</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setWeapon(4)} variant={chars.weapon === 4 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Стрелковое</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setWeapon(5)} variant={chars.weapon === 5 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Катализатор</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setWeapon('')} variant={chars.weapon === '' ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Все</Button></Col>
                        </Row>
                        <StyledTitle color='yellow' fz='22px'>
                            Регион
                        </StyledTitle>
                        <Row className='mb-2'>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(1)} variant={chars.region === 1 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Мондштадт</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(2)} variant={chars.region === 2 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Ли Юэ</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(3)} variant={chars.region === 3 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Инадзума</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(4)} variant={chars.region === 4 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Сумеру</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(5)} variant={chars.region === 5 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Фонтейн</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(6)} variant={chars.region === 6 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Натлан</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion(7)} variant={chars.region === 7 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Снежная</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setRegion('')} variant={chars.region === '' ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Все</Button></Col>
                        </Row>
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
                        <StyledTitle color='yellow' fz='22px'>
                            Рост
                        </StyledTitle>
                        <Row className='mb-2'>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setSize(1)} variant={chars.size === 1 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Низкий</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setSize(2)} variant={chars.size === 2 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Средний</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setSize(3)} variant={chars.size === 3 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Высокий</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => chars.setSize('')} variant={chars.size === '' ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Все</Button></Col>
                        </Row>
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
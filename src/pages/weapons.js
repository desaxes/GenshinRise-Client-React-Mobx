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
import { getWeapons } from '../http/weaponAPI';
import { Weapon } from '../components/weapon';
import { WeaponOptions } from '../components/modals/weaponOptions';

export const Weapons = observer(() => {
    const { weapons } = useContext(AppContext)
    const [weaponId, setWeaponId] = useState()
    const [modalOptions, setModalOptions] = useState(false)
    const createModal = (id) => {
        setWeaponId(id)
        setModalOptions(true)
    }
    useEffect(() => {
        let query = ''
        if (weapons.weapon !== '') {
            query = query + 'weaponId=' + weapons.weapon + '&'
        }
        if (weapons.stars !== '') {
            query = query + 'stars=' + weapons.stars + '&'
        }
        if (weapons.searchBy !== '') {
            query = query + 'name=' + weapons.searchBy + '&'
        }
        getWeapons(query).then(res => weapons.setWeapons(res.data))
    }, [weapons.weapon, weapons.stars, weapons.searchBy, weapons])
    let weaponsArray = weapons.weapons.weapons.map(e => <Weapon gridpart={4} key={e.id} weapon={e} onShow={createModal} />)
    return (
        <>
            <Container >
                <Row className='mt-3 pb-5'>
                    <Col md={3} className='mt-5'>
                        <StyledTitle color='yellow' fz='22px'>
                            Тип Оружия
                        </StyledTitle>
                        <Row className='mb-2'>
                            <Col md='auto' className='mt-1'><Button onClick={() => weapons.setWeapon(1)} variant={weapons.weapon === 1 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Одноручное</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => weapons.setWeapon(2)} variant={weapons.weapon === 2 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Двуручное</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => weapons.setWeapon(3)} variant={weapons.weapon === 3 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Древковое</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => weapons.setWeapon(4)} variant={weapons.weapon === 4 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Стрелковое</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => weapons.setWeapon(5)} variant={weapons.weapon === 5 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Катализатор</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => weapons.setWeapon('')} variant={weapons.weapon === '' ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Все</Button></Col>
                        </Row>
                        <StyledTitle color='yellow' fz='22px'>
                            Редкость
                        </StyledTitle>
                        <Row className='mb-2'>
                            <Col md='auto' className='mt-1'><Button onClick={() => weapons.setStars(3)} variant={weapons.stars === 3 ? 'warning' : 'outline-warning'} style={{ width: '80px', fontWeight: 'bold' }}>3★</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => weapons.setStars(4)} variant={weapons.stars === 4 ? 'warning' : 'outline-warning'} style={{ width: '80px', fontWeight: 'bold' }}>4★</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => weapons.setStars(5)} variant={weapons.stars === 5 ? 'warning' : 'outline-warning'} style={{ width: '80px', fontWeight: 'bold' }}>5★</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => weapons.setStars('')} variant={weapons.stars === '' ? 'warning' : 'outline-warning'} style={{ width: '80px', fontWeight: 'bold' }}>Все</Button></Col>
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
                            jstf='space-between' gap='30px' style={{width:'100%'}}
                        >
                            {weaponsArray}
                        </Row>
                    </Col>
                </Row>
                {modalOptions && <WeaponOptions
                    show={true}
                    onHide={() => setModalOptions(false)}
                    weaponId={weaponId}
                />}
            </Container>
        </>
    )
})
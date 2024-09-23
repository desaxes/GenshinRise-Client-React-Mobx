import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from './link';
import { ADMIN_ROUTE, BANNER_ROUTE, CHAR_ROUTE, COLLECT_ROUTE, MAIN_PAGE, RES_ROUTE, RISE_ROUTE, ROLL_ROUTE, STAT_ROUTE, WEAPON_ROUTE } from '../utils/constants';
import { StyledBox } from '../styledComponents/styled-components';
import { observer } from 'mobx-react-lite'
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
export const NavBar = observer(() => {
    const location = useLocation()
    return (
        <Navbar style={{position:'fixed',zIndex:'1000000',top:'0',width:'100%',marginBottom:'200px'}} bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Link weight='bold' fz='22px' to={MAIN_PAGE}>GENSHINRISE</Link>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                    >
                        <StyledBox jstf='space-around' display='flex' align='center' padding='5px 10px' gap='30px'>
                            <Row>
                                <Col mb={'auto'}>
                                    <Link to={MAIN_PAGE}
                                        border='2px yellow solid' fz='18px' weight='bold' href="#action1"
                                        bg={location.pathname === MAIN_PAGE ? 'yellow' : 'transparent'}
                                        color={location.pathname === MAIN_PAGE ? 'black' : 'white'}
                                    >Главная</Link>
                                </Col>
                                <Col mb={'auto'} className='mb-2'>
                                    <Link to={CHAR_ROUTE}
                                        border='2px yellow solid' fz='18px' weight='bold' href="#action2"
                                        bg={location.pathname === CHAR_ROUTE ? 'yellow' : 'transparent'}
                                        color={location.pathname === CHAR_ROUTE ? 'black' : 'white'}
                                    >Персонажи</Link>
                                </Col>
                                <Col mb={'auto'} className='mb-2'>
                                    <Link to={WEAPON_ROUTE}
                                        border='2px yellow solid' fz='18px' weight='bold' href="#action3"
                                        bg={location.pathname === WEAPON_ROUTE ? 'yellow' : 'transparent'}
                                        color={location.pathname === WEAPON_ROUTE ? 'black' : 'white'}
                                    >Оружие</Link>
                                </Col>
                                <Col mb={'auto'} className='mb-2'>
                                    <Link to={RISE_ROUTE}
                                        border='2px yellow solid' fz='18px' weight='bold' href="#action4"
                                        bg={location.pathname === RISE_ROUTE ? 'yellow' : 'transparent'}
                                        color={location.pathname === RISE_ROUTE ? 'black' : 'white'}
                                    >Возвышение</Link>
                                </Col>
                                <Col mb={'auto'} className='mb-2'>
                                    <Link to={COLLECT_ROUTE}
                                        border='2px yellow solid' fz='18px' weight='bold' href="#action5"
                                        bg={location.pathname === COLLECT_ROUTE ? 'yellow' : 'transparent'}
                                        color={location.pathname === COLLECT_ROUTE ? 'black' : 'white'}
                                    >Коллекция</Link>
                                </Col>
                                <Col mb={'auto'} className='mb-2'>
                                    <Link to={RES_ROUTE}
                                        border='2px yellow solid' fz='18px' weight='bold' href="#action1"
                                        bg={location.pathname === RES_ROUTE ? 'yellow' : 'transparent'}
                                        color={location.pathname === RES_ROUTE ? 'black' : 'white'}
                                    >Ресурсы</Link>
                                </Col>
                                <Col mb={'auto'} className='mb-2'>
                                    <Link to={ROLL_ROUTE}
                                        border='2px yellow solid' fz='18px' weight='bold' href="#action1"
                                        bg={location.pathname === ROLL_ROUTE ? 'yellow' : 'transparent'}
                                        color={location.pathname === ROLL_ROUTE ? 'black' : 'white'}
                                    >Молитвы</Link>
                                </Col>
                                <Col mb={'auto'} className='mb-2'>
                                    <Link to={STAT_ROUTE}
                                        border='2px yellow solid' fz='18px' weight='bold' href="#action1"
                                        bg={location.pathname === STAT_ROUTE ? 'yellow' : 'transparent'}
                                        color={location.pathname === STAT_ROUTE ? 'black' : 'white'}
                                    >Статистика</Link>
                                </Col>
                                                                <Col mb={'auto'} className='mb-2'>
                                    <Link to={BANNER_ROUTE}
                                        border='2px yellow solid' fz='18px' weight='bold' href="#action1"
                                        bg={location.pathname === BANNER_ROUTE ? 'yellow' : 'transparent'}
                                        color={location.pathname === BANNER_ROUTE ? 'black' : 'white'}
                                    >Баннеры</Link>
                                </Col>
                            </Row>
                        </StyledBox>
                    </Nav>
                    <StyledBox padding='20px' margin='0 20px 0 auto'>
                        <StyledBox
                            jstf='center'
                            display='flex'
                            gap='30px'>
                            <Link to={ADMIN_ROUTE} border='2px green solid' fz='18px'>Admin</Link>
                        </StyledBox>
                    </StyledBox>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
})

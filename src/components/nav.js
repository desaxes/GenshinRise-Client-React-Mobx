import React, { useContext, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from './link';
import { ADMIN_ROUTE, ARTS_ROUTE, BANNER_ROUTE, CHAR_ROUTE, COLLECT_ROUTE, MAIN_PAGE, RES_ROUTE, RISE_ROUTE, ROLL_ROUTE, STAT_ROUTE, WEAPON_ROUTE } from '../utils/constants';
import { StyledBox } from '../styledComponents/styled-components';
import { observer } from 'mobx-react-lite'
import { useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { Dropdown } from 'react-bootstrap';
import { AppContext } from '..';
export const NavBar = observer(() => {
    const location = useLocation()
    const { app } = useContext(AppContext)
    useEffect(() => {
        console.log(app.game)
    }, [app, app.game])
    // const [state, setState] = useState('GenshinRise')
    return (
        <Navbar style={{ border: 'solid 2px yellow', position: 'fixed', zIndex: '1000000', top: '0', width: '100%', marginBottom: '200px' }} bg="dark" data-bs-theme="dark" expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Dropdown style={{ margin: '0px 30px 0 10px' }}>
                    <Dropdown.Toggle style={{ color: 'yellow', border: 'yellow 2px solid', background: 'transparent', fontSize: '24px', fontWeight: 'bold' }} variant="success" id="dropdown-basic">
                        {app.game}Rise
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => { app.setGame('Genshin') }} href="#/action-1">Genshin</Dropdown.Item>
                        <Dropdown.Item onClick={() => app.setGame('Honkai')} href="#/action-2">Honkai</Dropdown.Item>
                        <Dropdown.Item onClick={() => app.setGame('Zzz')} href="#/action-3">ZZZ</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {/* <Link weight='bold' fz='22px' to={MAIN_PAGE}>GENSHINRISE</Link> */}
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                    >
                        <StyledBox jstf='space-around' display='flex' align='center' padding='5px 10px' gap='30px'>
                            <Row style={{ display: 'flex', alignItems: 'center' }}>
                                <Col mb={'auto'} >
                                    <Link to={MAIN_PAGE}
                                        border='2px yellow solid' fz='18px' weight='bold' href="#action1"
                                        bg={location.pathname === MAIN_PAGE ? 'yellow' : 'transparent'}
                                        color={location.pathname === MAIN_PAGE ? 'black' : 'white'}
                                    >Главная</Link>
                                </Col>
                                <Col mb={'auto'} >
                                    <Link to={CHAR_ROUTE}
                                        border='2px yellow solid' fz='18px' weight='bold' href="#action2"
                                        bg={location.pathname === CHAR_ROUTE ? 'yellow' : 'transparent'}
                                        color={location.pathname === CHAR_ROUTE ? 'black' : 'white'}
                                    >Персонажи</Link>
                                </Col>
                                <Col mb={'auto'} >
                                    <Link to={WEAPON_ROUTE}
                                        border='2px yellow solid' fz='18px' weight='bold' href="#action3"
                                        bg={location.pathname === WEAPON_ROUTE ? 'yellow' : 'transparent'}
                                        color={location.pathname === WEAPON_ROUTE ? 'black' : 'white'}
                                    >Оружие</Link>
                                </Col>
                                <Col mb={'auto'} >
                                    <Link to={ARTS_ROUTE}
                                        border='2px yellow solid' fz='18px' weight='bold' href="#action1"
                                        bg={location.pathname === ARTS_ROUTE ? 'yellow' : 'transparent'}
                                        color={location.pathname === ARTS_ROUTE ? 'black' : 'white'}
                                    >Артефакты</Link>
                                </Col>
                                <Col mb={'auto'} >
                                    <Link to={RISE_ROUTE}
                                        border='2px yellow solid' fz='18px' weight='bold' href="#action4"
                                        bg={location.pathname === RISE_ROUTE ? 'yellow' : 'transparent'}
                                        color={location.pathname === RISE_ROUTE ? 'black' : 'white'}
                                    >Возвышение</Link>
                                </Col>
                                <Col mb={'auto'} >
                                    <Link to={COLLECT_ROUTE}
                                        border='2px yellow solid' fz='18px' weight='bold' href="#action5"
                                        bg={location.pathname === COLLECT_ROUTE ? 'yellow' : 'transparent'}
                                        color={location.pathname === COLLECT_ROUTE ? 'black' : 'white'}
                                    >Коллекция</Link>
                                </Col>
                                {app.game === 'Genshin' && <Col mb={'auto'} >
                                    <Link to={RES_ROUTE}
                                        border='2px yellow solid' fz='18px' weight='bold' href="#action1"
                                        bg={location.pathname === RES_ROUTE ? 'yellow' : 'transparent'}
                                        color={location.pathname === RES_ROUTE ? 'black' : 'white'}
                                    >Ресурсы</Link>
                                </Col>}
                                <Col mb={'auto'} >
                                    <Link to={ROLL_ROUTE}
                                        border='2px yellow solid' fz='18px' weight='bold' href="#action1"
                                        bg={location.pathname === ROLL_ROUTE ? 'yellow' : 'transparent'}
                                        color={location.pathname === ROLL_ROUTE ? 'black' : 'white'}
                                    >Крутки</Link>
                                </Col>
                                <Col mb={'auto'} >
                                    <Link to={STAT_ROUTE}
                                        border='2px yellow solid' fz='18px' weight='bold' href="#action1"
                                        bg={location.pathname === STAT_ROUTE ? 'yellow' : 'transparent'}
                                        color={location.pathname === STAT_ROUTE ? 'black' : 'white'}
                                    >Статистика</Link>
                                </Col>
                                <Col mb={'auto'} >
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

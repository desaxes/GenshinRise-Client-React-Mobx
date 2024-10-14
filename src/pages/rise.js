import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { AppContext } from '..';
import { getCharsFromRise } from '../http/charAPI';
import { Char } from '../components/char';
import { RisingModal } from '../components/modals/risingModal';
import { observer } from 'mobx-react-lite';
import { StyledTitle } from '../styledComponents/styled-components';
import { getWeaponsFromRise } from '../http/weaponAPI';
import { Weapon } from '../components/weapon';
import { RisingModalWeapon } from '../components/modals/risingModalWeapon';
import { getZzzCharFromRiseById, getZzzCharsFromRise } from '../http/zzz/charAPI';
import { getZzzWeaponsFromRise } from '../http/zzz/weaponAPI';

const Rise = observer(() => {
    const { chars, app } = useContext(AppContext)
    const { weapons } = useContext(AppContext)
    const [id, setId] = useState()
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
        if (app.game === 'Genshin') {
            getCharsFromRise().then(res => { res && chars.setChars(res.data) })
            getWeaponsFromRise().then(res => { res && weapons.setWeapons(res.data) })
        }
        else if (app.game === 'Zzz') {
            getZzzCharsFromRise().then(res => { res && chars.setChars(res.data) })
            getZzzWeaponsFromRise().then(res => { res && weapons.setWeapons(res.data) })
        }
    }, [chars, weapons, app.game])
    let characters = chars.chars.chars.map(e => <Char gridpart={3} key={e.id} char={e} onShow={createModal} />)
    let weaponArray = weapons.weapons.weapons.map(e => <Weapon gridpart={3} key={e.id} weapon={e} onShow={createModal} />)
    return (
        <>
            <Container style={{textShadow: '2px 2px 2px black'}}>
                <StyledTitle color='yellow' className='mt-3' fz='26px'>Персонажи</StyledTitle>
                <Row className='mt-1 pb-1'>
                    <Col className='mt-1 d-flex flex-column align-items-center' md={12}>
                        <Row className='d-flex justify-content-center'
                            style={{ width: '100%' }}
                        >
                            {characters.length ? characters : <StyledTitle fz='24px' color='red'>Персонажи Отсутствуют</StyledTitle>}
                        </Row>
                    </Col>
                </Row>
                <StyledTitle color='yellow' className='mt-3' fz='26px'>Оружие</StyledTitle>
                <Row className='mt-1 pb-1'>
                    <Col className='mt-1 d-flex flex-column align-items-center' md={12}>
                        <Row className='d-flex justify-content-center'
                            style={{ width: '100%' }}
                        >
                            {weaponArray.length ? weaponArray : <StyledTitle fz='24px' color='red'>Оружие Отсутствует</StyledTitle>}
                        </Row>
                    </Col>
                </Row>
                {modalOptions && modalType === 'char' && <RisingModal
                    show={true}
                    onHide={() => setModalOptions(false)}
                    charId={id}
                />}
                {modalOptions && modalType === 'weapon' && <RisingModalWeapon
                    show={true}
                    onHide={() => setModalOptions(false)}
                    weaponId={id}
                />}
            </Container>
        </>
    )

})
export default Rise
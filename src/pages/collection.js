import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { AppContext } from '..';
import { getCharsFromCol } from '../http/charAPI';
import { Char } from '../components/char';
import { observer } from 'mobx-react-lite';
import { CharOptionsForCollection } from '../components/modals/charOptionForCollection';
import { StyledTitle } from '../styledComponents/styled-components';
import { getWeaponsFromCol } from '../http/weaponAPI';
import { Weapon } from '../components/weapon';
import { WeaponOptions } from '../components/modals/weaponOptions';
import { WeaponOptionsForCollection } from '../components/modals/weaponOptionsForCollection';
import { getZzzCharsFromCol } from '../http/zzz/charAPI';
import { getZzzWeaponsFromCol } from '../http/zzz/weaponAPI';
import { getHonkaiCharsFromCol } from '../http/honkai/charAPI';
import { getHonkaiWeaponsFromCol } from '../http/honkai/weaponAPI';

const Collection = observer(() => {
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
            getCharsFromCol().then(res => { res && chars.setChars(res.data) })
            getWeaponsFromCol().then(res => { res && weapons.setWeapons(res.data) })
        }
        else if (app.game === 'Zzz') {
            getZzzCharsFromCol().then(res => { res && chars.setChars(res.data) })
            getZzzWeaponsFromCol().then(res => { res && weapons.setWeapons(res.data) })
        }
        else if (app.game === 'Honkai') {
            getHonkaiCharsFromCol().then(res => { res && chars.setChars(res.data) })
            getHonkaiWeaponsFromCol().then(res => { res && weapons.setWeapons(res.data) })
        }
    }, [chars, weapons, app.game])
    let characters = chars.chars.chars.map(e => <Char gridpart={3} key={e.id} char={e} onShow={createModal} />)
    let weaponsArray = weapons.weapons.weapons.map(e => <Weapon gridpart={3} key={e.id} weapon={e} onShow={createModal} />)
    return (
        <>
            <Container style={{textShadow: '2px 2px 2px black'}}>
                <StyledTitle className='mt-3' color='yellow'>Коллекция</StyledTitle>
                <StyledTitle fz='24px' className='mt-3' color='yellow'>Персонажи</StyledTitle>
                <Row className='pb-3'>
                    <Col className='mt-3 d-flex flex-column align-items-center' md={12}>
                        <Row className='d-flex justify-content-center'
                            style={{ width: '100%' }}
                        >
                            {characters.length ? characters : <StyledTitle fz='24px' color='red'>Персонажи Отсутствуют</StyledTitle>}
                        </Row>
                    </Col>
                </Row>
                <StyledTitle fz='24px' color='yellow'>Оружие</StyledTitle>
                <Row className='pb-5'>
                    <Col className='mt-1 d-flex flex-column align-items-center' md={12}>
                        <Row className='d-flex justify-content-center'
                            style={{ width: '100%' }}
                        >
                            {weaponsArray.length ? weaponsArray : <StyledTitle fz='24px' color='red'>Оружие Отсутствует</StyledTitle>}
                        </Row>
                    </Col>
                </Row>
                {modalOptions && modalType === 'char' && <CharOptionsForCollection
                    show={true}
                    onHide={() => setModalOptions(false)}
                    charId={id}
                />}
                {modalOptions && modalType === 'weapon' && <WeaponOptionsForCollection
                    show={true}
                    onHide={() => setModalOptions(false)}
                    weaponId={id}
                />}
            </Container>
        </>
    )
})

export default Collection
import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import { CreateStone } from '../components/modals/createStone'
import { CreateCharacter } from '../components/modals/createChar'
import { CreateBossMaterial } from '../components/modals/createBM'
import { CreateEnemyMaterial } from '../components/modals/createEM'
import { CreateLocalSpecialty } from '../components/modals/createLS'
import { CreateTalentBook } from '../components/modals/createTalent'
import { CreateWBMaterial } from '../components/modals/createWBM'
import { CreateWeaponMaterial } from '../components/modals/createWM'
import { CreateEWMaterial } from '../components/modals/createEWM'
import { CreateWeapon } from '../components/modals/createWeapon'
import { AppContext } from '..'
import { observer } from 'mobx-react-lite'

const Admin = observer(() => {
    const { app } = useContext(AppContext)
    const [modalStoneShow, setModalStoneShow] = useState(false)
    const [modalBMShow, setModalBMShow] = useState(false)
    const [modalEMShow, setModalEMShow] = useState(false)
    const [modalLSShow, setModalLSShow] = useState(false)
    const [modalTalentShow, setModalTalentShow] = useState(false)
    const [modalWBMShow, setModalWBMShow] = useState(false)
    const [modalCharShow, setModalCharShow] = useState(false)
    const [modalWMatShow, setModalWMatShow] = useState(false)
    const [modalEWMatShow, setModalEWMatShow] = useState(false)
    const [modalWeaponSHow, setModalWeaponSHow] = useState(false)
    useEffect(() => {
        console.log(app.game)
    }, [app.game])
    return (
        <div>
            <Container className='d-flex mt-5 flex-column'>
                {app.game === 'Genshin' && <Button onClick={() => setModalStoneShow(true)}
                    className='mt-3 p-4' variant='outline-warning'><h2>Добавить Камень Возвышения</h2></Button>}
                <Button onClick={() => setModalBMShow(true)}
                    className='mt-3 p-4' variant='outline-warning'><h2>Добавить Материал Босса</h2></Button>
                <Button onClick={() => setModalEMShow(true)}
                    className='mt-3 p-4' variant='outline-warning'><h2>Добавить Материал Врагов</h2></Button>
                {app.game === 'Genshin' && <Button onClick={() => setModalLSShow(true)}
                    className='mt-3 p-4' variant='outline-warning'><h2>Добавить Диковинку</h2></Button>}
                <Button onClick={() => setModalTalentShow(true)}
                    className='mt-3 p-4' variant='outline-warning'><h2>Добавить Материал Талантов</h2></Button>
                <Button onClick={() => setModalWBMShow(true)}
                    className='mt-3 p-4' variant='outline-warning'><h2>Добавить Материал Еженедельных Боссов</h2></Button>
                <Button onClick={() => setModalCharShow(true)}
                    className='mt-3 p-4' variant='outline-warning'><h2>Добавить Персонажа</h2></Button>
                {app.game !== 'Honkai' && <Button onClick={() => setModalWMatShow(true)}
                    className='mt-3 p-4' variant='outline-warning'><h2>Добавить Материал Для Оружия</h2></Button>}
                {app.game === 'Genshin' && <Button onClick={() => setModalEWMatShow(true)}
                    className='mt-3 p-4' variant='outline-warning'><h2>Добавить Материал Врагов Для Оружия</h2></Button>}
                <Button onClick={() => setModalWeaponSHow(true)}
                    className='mt-3 p-4 mb-5' variant='outline-warning'><h2>Добавить Оружие</h2></Button>
                {modalStoneShow && <CreateStone show={true} onHide={() => setModalStoneShow(false)} />}
                {modalBMShow && <CreateBossMaterial show={true} onHide={() => setModalBMShow(false)} />}
                {modalEMShow && <CreateEnemyMaterial show={true} onHide={() => setModalEMShow(false)} />}
                {modalLSShow && <CreateLocalSpecialty show={true} onHide={() => setModalLSShow(false)} />}
                {modalTalentShow && <CreateTalentBook show={true} onHide={() => setModalTalentShow(false)} />}
                {modalWBMShow && <CreateWBMaterial show={true} onHide={() => setModalWBMShow(false)} />}
                {modalCharShow && <CreateCharacter show={true} onHide={() => setModalCharShow(false)} />}
                {modalWMatShow && <CreateWeaponMaterial show={true} onHide={() => setModalWMatShow(false)} />}
                {modalEWMatShow && <CreateEWMaterial show={true} onHide={() => setModalEWMatShow(false)} />}
                {modalWeaponSHow && <CreateWeapon show={true} onHide={() => setModalWeaponSHow(false)} />}
            </Container>
        </div>
    )
})
export default Admin
import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { observer } from 'mobx-react-lite';
import { AppContext } from '..';
import { getTalents } from '../http/materialAPI';
import { StyledBox, StyledTitle } from '../styledComponents/styled-components';
import { getChars, getCharsFromCol, getCharsFromRise, getMaxValues } from '../http/charAPI';
import { Char } from '../components/char';
import Button from 'react-bootstrap/Button';
import { Progress } from '../components/progress';
import { getWeaponMaterials } from '../http/weaponMatAPI';
import { getWeapons, getWeaponsFromCol, getWeaponsFromRise } from '../http/weaponAPI';
import { Weapon } from '../components/weapon';
import { WeaponProgress } from '../components/weaponProgress';
import { CharOptionsForMain } from '../components/modals/charOptionForMain';
import { WeaponOptionsForMain } from '../components/modals/weaponOptionsForMain';
import { getZzzCharsFromRise } from '../http/zzz/charAPI';
import { getZzzWeaponsFromRise } from '../http/zzz/weaponAPI';
import { getHonkaiCharsFromRise } from '../http/honkai/charAPI';
import { getHonkaiWeaponsFromRise } from '../http/honkai/weaponAPI';
import { Gems } from '../components/gems';

const Main = observer(() => {
    const { materials } = useContext(AppContext)
    const { chars } = useContext(AppContext)
    const { weapons } = useContext(AppContext)
    const { app } = useContext(AppContext)
    let days = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];
    let date = new Date();
    let n = date.getDay()
    const [id, setId] = useState()
    const [modalOptions, setModalOptions] = useState(false)
    const [modalType, setModalType] = useState(false)
    const [rise, setRise] = useState([])
    const [gemsMode, setGemsMode] = useState(false)
    const [weaponRise, setWeaponRise] = useState([])
    const [group, setGroup] = useState('collection')
    const createModal = (id, type) => {
        setId(id)
        setModalType(type)
        setModalOptions(true)
    }
    useEffect(() => {
        getTalents().then(res => {
            if (res) {
                if (n != 0) {
                    materials.setTodayTalents(res.data.filter(e => e.days === n || e.days === n - 3).map(e => e.id))
                }
                else {
                    materials.setTodayTalents(res.data.map(e => e.id))
                }
                if (group === 'collection') {
                    getCharsFromCol().then(res => {
                        const filtered = res.data.chars.filter(e => materials.todayTalents.some(t => t === e.talentMaterialId))
                        chars.setChars({ chars: filtered, total: filtered.length })

                    })
                }
                else if (group === 'rise') {
                    getCharsFromRise().then(res => {
                        const filtered = res.data.chars.filter(e => materials.todayTalents.some(t => t === e.talentMaterialId))
                        chars.setChars({ chars: filtered, total: filtered.length })
                    })
                }
                else if (group === 'all') {
                    getChars().then(res => {
                        const filtered = res.data.chars.filter(e => materials.todayTalents.some(t => t === e.talentMaterialId))
                        chars.setChars({ chars: filtered, total: filtered.length })
                    })
                }
            }
        })
        getWeaponMaterials().then(res => {
            if (res) {
                if (n != 0) {
                    weapons.setTodayMaterials(res.data.filter(e => e.days === n || e.days === n - 3).map(e => e.id))
                }
                else {
                    weapons.setTodayMaterials(res.data.map(e => e.id))
                }
                if (group === 'collection') {
                    getWeaponsFromCol().then(res => {
                        const filtered = res.data.weapons.filter(e => weapons.todayMaterials.some(t => t === e.weaponMaterialId))
                        weapons.setWeapons({ weapons: filtered, total: filtered.length })
                    })
                }
                else if (group === 'rise') {
                    getWeaponsFromRise().then(res => {
                        const filtered = res.data.weapons.filter(e => weapons.todayMaterials.some(t => t === e.weaponMaterialId))
                        weapons.setWeapons({ weapons: filtered, total: filtered.length })
                    })
                }
                else if (group === 'all') {
                    getWeapons().then(res => {
                        const filtered = res.data.weapons.filter(e => weapons.todayMaterials.some(t => t === e.weaponMaterialId))
                        weapons.setWeapons({ weapons: filtered, total: filtered.length })
                    })
                }
            }
        })
    }, [group, n, chars, materials, weapons])
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])
    useEffect(() => {
        if (app.game === 'Genshin') {
            getCharsFromRise().then(res => { res && setRise(res.data.chars); app.setUpdated(false) })
            getWeaponsFromRise().then(res => { res && setWeaponRise(res.data.weapons); app.setUpdated(false) })
        }
        else if (app.game === 'Zzz') {
            getZzzCharsFromRise().then(res => { res && setRise(res.data.chars); app.setUpdated(false) })
            getZzzWeaponsFromRise().then(res => { res && setWeaponRise(res.data.weapons); app.setUpdated(false) })
        }
        else if (app.game === 'Honkai') {
            getHonkaiCharsFromRise().then(res => { res && setRise(res.data.chars); app.setUpdated(false) })
            getHonkaiWeaponsFromRise().then(res => { res && setWeaponRise(res.data.weapons); app.setUpdated(false) })
        }
    }, [app.updated, app, app.game])
    let characters = chars.chars.chars.map(e => <Char gridpart={4} key={e.id} char={e} onShow={createModal} />)
    let weaponsArray = weapons.weapons.weapons.map(e => <Weapon gridpart={4} key={e.id} weapon={e} onShow={createModal} />)
    let progressArray = rise.map(e => ({
        id: e.id,
        img: e.img,
        progress: app.game === 'Genshin' ? (e.stone1count + e.stone2count + e.stone3count + e.stone4count +
            e.localSpecialtyCount + e.enemyMaterial1Count + e.enemyMaterial2Count +
            e.enemyMaterial3Count + e.enemyMaterial1CountForTalent + e.enemyMaterial2CountForTalent +
            e.enemyMaterial3CountForTalent + e.bossMaterialCount + e.talentMaterial1Count +
            e.talentMaterial2Count + e.talentMaterial3Count + e.weekBossMaterialCount) :
            (e.enemyMaterial1Count + e.enemyMaterial2Count +
                e.enemyMaterial3Count + e.bossMaterialCount + e.talentMaterial1Count +
                e.talentMaterial2Count + e.talentMaterial3Count + e.weekBossMaterialCount),
        max: 714
    }))
    let progressWeaponArray = weaponRise.map(e => ({
        id: e.id,
        img: e.img,
        stars: e.stars,
        progress: app.game === 'Genshin' ? (e.weaponMat1Count + e.weaponMat2Count + e.weaponMat3Count + e.weaponMat4Count +
            e.enemyMat1Count + e.enemyMat2Count + e.enemyMat3Count +
            e.enemyWMat1Count + e.enemyWMat2Count + e.enemyWMat3Count) :
            (app.game === 'Zzz' ? (e.weaponMat1Count + e.weaponMat2Count + e.weaponMat3Count) :
                (e.weaponMat1Count + e.weaponMat2Count + e.weaponMat3Count +
                    e.enemyMat1Count + e.enemyMat2Count + e.enemyMat3Count
                )),
        max: 714
    }))
    const statistic = progressArray.map(e => <Progress key={e.id} id={e.id} img={e.img} current={e.progress} max={e.max} />)
    const weaponStatistic = progressWeaponArray.map(e => <WeaponProgress stars={e.stars} key={e.id} id={e.id} img={e.img} current={e.progress} max={e.max} />)
    return (
        <Container style={{ textShadow: '2px 2px 2px black' }}>
            <Row className='mb-5'>
                {app.game === 'Genshin' && <Col md={9}>
                    <Row className='mt-3'>
                        <StyledTitle color='yellow'>Повышение уровня талантов</StyledTitle>
                        <StyledTitle color='yellow' fz='22px'>{days[n]}</StyledTitle>
                        <StyledBox className='mt-2' display='flex' gap='20px'>
                            <Button onClick={() => setGroup('collection')} variant={group === 'collection' ? 'warning' : 'outline-warning'} color='yellow' fz='22px'>Персонажи и Оружие в Коллекции</Button>
                            <Button onClick={() => setGroup('rise')} variant={group === 'rise' ? 'warning' : 'outline-warning'} color='yellow' fz='22px'>Прокачиваемые Персонажи и Оружие</Button>
                            <Button onClick={() => setGroup('all')} variant={group === 'all' ? 'warning' : 'outline-warning'} color='yellow' fz='22px'>Все Персонажи и Оружие</Button>
                            <Button onClick={() => setGemsMode(!gemsMode)} variant={gemsMode === true ? 'danger' : 'outline-danger'} color='yellow' fz='22px'>Сбережения</Button>
                        </StyledBox>
                    </Row>
                    {gemsMode && <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <Gems />
                    </div>}
                    <Row className='mt-3 pb-5'>
                        <Col className='d-flex flex-column align-items-center' md={12}>
                            <Row className='d-flex justify-content-center'
                                display='grid' dir='column' width='100%'
                                jstf='space-between' gap='30px'
                                style={{ width: '100%' }}
                            >
                                {characters.length ? characters : <StyledTitle fz='24px' color='red'>Персонажи Отсутствуют</StyledTitle>}
                            </Row>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <StyledTitle color='yellow'>Возвышение оружия</StyledTitle>
                        <StyledTitle color='yellow' fz='22px'>{days[n]}</StyledTitle>
                    </Row>
                    <Row className='mt-3 pb-5'>
                        <Col className='d-flex flex-column align-items-center' md={12}>
                            <Row className='d-flex justify-content-center'
                                jstf='space-between' gap='30px' style={{ width: '100%' }}
                            >
                                {weaponsArray.length ? weaponsArray : <StyledTitle fz='24px' color='red'>Оружие Отсутствует</StyledTitle>}
                            </Row>
                        </Col>
                    </Row>
                    {modalOptions && modalType === 'char' && <CharOptionsForMain
                        show={true}
                        onHide={() => setModalOptions(false)}
                        charId={id}
                    />}
                    {modalOptions && modalType === 'weapon' && <WeaponOptionsForMain
                        show={true}
                        onHide={() => setModalOptions(false)}
                        weaponId={id}
                    />}
                </Col>}
                {app.game != 'Genshin' &&
                    <Col style={{ display: 'flex', flexDirection: 'column' }}>
                        <StyledTitle color='yellow'>Сбережения</StyledTitle>
                        <Gems />
                    </Col>}
                <Col md={1}>
                </Col>
                <Col md={2} className='mt-4'>
                    <StyledTitle align='center' color='yellow' fz='26px'>Статистика Накоплений</StyledTitle>
                    {statistic}
                    {weaponStatistic}
                </Col>
            </Row>
        </Container >
    )
})
export default Main
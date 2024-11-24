import { useContext, useEffect, useState } from "react"
import { getEventStatistic, getStandartStatistic, getStatistic, getWeaponStatistic } from "../http/rollAPI"
import { StyledBox, StyledImg, StyledTitle } from "../styledComponents/styled-components"
import { Button, Col, Container, Row } from "react-bootstrap"
import { getCharFromColById, getCharStatistic, getCharsFromCol, getCharsWithSortByPatchCounter, getCharsWithSortByPatchNumber, getCharsWithSortByRelease } from "../http/charAPI"
import { AppContext } from ".."
import { getZzzEventStatistic, getZzzStandartStatistic, getZzzWeaponStatistic } from "../http/zzz/rollAPI"
import { observer } from "mobx-react-lite"
import { getZzzCharsFromCol, getZzzCharStatistic, getZzzCharsWithSortByPatchCounter, getZzzCharsWithSortByPatchNumber, getZzzCharsWithSortByRelease } from "../http/zzz/charAPI"
import { getHonkaiEventStatistic, getHonkaiStandartStatistic, getHonkaiWeaponStatistic } from "../http/honkai/rollAPI"
import { getHonkaiCharsFromCol, getHonkaiCharStatistic, getHonkaiCharsWithSortByPatchCounter, getHonkaiCharsWithSortByPatchNumber, getHonkaiCharsWithSortByRelease } from "../http/honkai/charAPI"

import anemo from '../img/elements/anemo.webp'
import pyro from '../img/elements/pyro.png'
import hydro from '../img/elements/hydro.png'
import dendro from '../img/elements/dendro.png'
import kryo from '../img/elements/kryo.png'
import electro from '../img/elements/electro.png'
import geo from '../img/elements/geo.png'
import phys from '../img/honkaielements/phys.png'
import fire from '../img/honkaielements/fire.png'
import ice from '../img/honkaielements/ice.png'
import elec from '../img/honkaielements/electro.png'
import wind from '../img/honkaielements/wind.png'
import kvant from '../img/honkaielements/kvant.png'
import mnim from '../img/honkaielements/mnim.png'
import onehand from '../img/weapons/genshin/1h.webp'
import twohand from '../img/weapons/genshin/2h.webp'
import polearm from '../img/weapons/genshin/polearm.webp'
import cata from '../img/weapons/genshin/cata.webp'
import bow from '../img/weapons/genshin/bow.webp'
import neb from '../img/weapons/hsr/neb.webp'
import raz from '../img/weapons/hsr/raz.webp'
import ohot from '../img/weapons/hsr/ohot.webp'
import erud from '../img/weapons/hsr/erud.webp'
import save from '../img/weapons/hsr/save.webp'
import izo from '../img/weapons/hsr/izo.webp'
import harm from '../img/weapons/hsr/harm.webp'
import attack from '../img/weapons/zzz/attack.png'
import defense from '../img/weapons/zzz/defense.png'
import anomaly from '../img/weapons/zzz/anomaly.png'
import support from '../img/weapons/zzz/support.png'
import stun from '../img/weapons/zzz/stun.png'
import zzzElectro from '../img/zzzelems/elec.png'
import zzzEther from '../img/zzzelems/ether.png'
import zzzFire from '../img/zzzelems/fire.png'
import zzzIce from '../img/zzzelems/ice.png'
import zzzPhys from '../img/zzzelems/phys.png'

const Statistic = observer(() => {
    const [sRolls, setSRolls] = useState([])
    const [eRolls, setERolls] = useState([])
    const [wRolls, setWRolls] = useState([])
    const [sort, setSort] = useState(false)
    const [charStatistic, setCharStatistic] = useState([])
    const [regionStatistic, setRegionStatistic] = useState([])
    const [col, setCol] = useState()
    const [charsPN, setCharsPN] = useState()
    const [charsPC, setCharsPC] = useState()
    const [charsR, setCharsR] = useState()
    const { app } = useContext(AppContext)
    useEffect(() => {
        if (app.game === 'Genshin') {
            getStandartStatistic().then(res => {
                res && setSRolls(res.data)
            })
            getEventStatistic().then(res => {
                res && setERolls(res.data)
            })
            getWeaponStatistic().then(res => {
                res && setWRolls(res.data)
            })
            getCharsWithSortByPatchNumber().then(res => setCharsPN(res.data))
            getCharsWithSortByPatchCounter().then(res => setCharsPC(res.data))
            getCharsWithSortByRelease().then(res => setCharsR(res.data))
        }
        else if (app.game === 'Zzz') {
            getZzzStandartStatistic().then(res => {
                res && setSRolls(res.data)
            })
            getZzzEventStatistic().then(res => {
                res && setERolls(res.data)
            })
            getZzzWeaponStatistic().then(res => {
                res && setWRolls(res.data)
            })
            getZzzCharsWithSortByPatchNumber().then(res => setCharsPN(res.data))
            getZzzCharsWithSortByPatchCounter().then(res => setCharsPC(res.data))
            getZzzCharsWithSortByRelease().then(res => setCharsR(res.data))
        }
        else if (app.game === 'Honkai') {
            getHonkaiStandartStatistic().then(res => {
                res && setSRolls(res.data)
            })
            getHonkaiEventStatistic().then(res => {
                res && setERolls(res.data)
            })
            getHonkaiWeaponStatistic().then(res => {
                res && setWRolls(res.data)
            })
            getHonkaiCharsWithSortByPatchNumber().then(res => setCharsPN(res.data))
            getHonkaiCharsWithSortByPatchCounter().then(res => setCharsPC(res.data))
            getHonkaiCharsWithSortByRelease().then(res => setCharsR(res.data))
        }
    }, [app.game])
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])
    useEffect(() => {
        if (app.game === 'Genshin') {
            getCharsFromCol().then(res => {
                setCol(res.data.chars.map(e => e.id))
            })
            getCharStatistic().then(res => { setCharStatistic(res.data.elements.all); setRegionStatistic(res.data.regions.all) })
        }
        else if (app.game === 'Zzz') {
            getZzzCharsFromCol().then(res => {
                setCol(res.data.chars.map(e => e.id))
            })
            getZzzCharStatistic().then(res => { setCharStatistic(res.data.elements.all); setRegionStatistic(res.data.regions.all) })
        }
        else if (app.game === 'Honkai') {
            getHonkaiCharsFromCol().then(res => {
                setCol(res.data.chars.map(e => e.id))
            })
            getHonkaiCharStatistic().then(res => { setCharStatistic(res.data.elements.all); setRegionStatistic(res.data.regions.all) })
        }
    }, [app.game])
    const charTableCell = charStatistic?.map(
        e => <Col
            style={{ borderLeft: 'yellow solid 2px' }}>
            {e.chars.filter(
                i => sort ? col?.some(c => c === i.id) : i
            ).map(
                i =>
                    <StyledImg opacity={col?.some(e => e === i.id) ? '100%' : '30%'}
                        style={{ margin: '5px' }} width={'55px'}
                        src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + i.img} />)}
        </Col>)
    const regionTableRow = regionStatistic?.map(
        e => <Col
            style={{ border: 'yellow solid 2px' }}>
            {e.chars.filter(
                i => sort ? col?.some(c => c === i.id) : i
            ).map(
                i =>
                    <StyledImg br='15px' opacity={col?.some(e => e === i.id) ? '100%' : '30%'}
                        style={{ margin: '5px' }} width={'70px'}
                        src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + i.img} />)}
        </Col>)

    const srollsComp = sRolls.filter(e => e._id.stars > 3).map(e => e._id.isChar ?
        <StyledBox className='mb-4'>
            <StyledImg height={app.game === 'Honkai' && '90px'} width='65px' br={app.game != 'Honkai' ? '50%' : '16px'} bg={e._id.stars === 5 ? 'orange' : (e._id.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e._id.img} />
            <p style={{ position: 'absolute', top: '100%', right: '38%', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>x{e.count}</p>
        </StyledBox>
        :
        <StyledBox className='mb-4'>
            <StyledImg height={app.game === 'Honkai' && '90px'} width='65px' br={app.game != 'Honkai' ? '50%' : '16px'} bg={e._id.stars === 5 ? 'orange' : (e._id.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e._id.img} />
            <p style={{ position: 'absolute', top: '100%', right: '38%', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>x{e.count}</p>
        </StyledBox>)
    const erollsComp = eRolls.filter(e => e._id.stars > 3).map(e => e._id.isChar ?
        <StyledBox className='mb-4'>
            <StyledImg height={app.game === 'Honkai' && '90px'} width='65px' br={app.game != 'Honkai' ? '50%' : '16px'} bg={e._id.stars === 5 ? 'orange' : (e._id.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e._id.img} />
            <p style={{ position: 'absolute', top: '100%', right: '38%', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>x{e.count}</p>
        </StyledBox>
        :
        <StyledBox className='mb-4'>
            <StyledImg height={app.game === 'Honkai' && '90px'} width='65px' br={app.game != 'Honkai' ? '50%' : '16px'} bg={e._id.stars === 5 ? 'orange' : (e._id.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e._id.img} />
            <p style={{ position: 'absolute', top: '100%', right: '38%', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>x{e.count}</p>
        </StyledBox>)
    const wrollsComp = wRolls.filter(e => e._id.stars > 3).map(e => e._id.isChar ?
        <StyledBox className='mb-4'>
            <StyledImg height={app.game === 'Honkai' && '90px'} width='65px' br={app.game != 'Honkai' ? '50%' : '16px'} bg={e._id.stars === 5 ? 'orange' : (e._id.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e._id.img} />
            <p style={{ position: 'absolute', top: '100%', right: '38%', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>x{e.count}</p>
        </StyledBox>
        :
        <StyledBox className='mb-4'>
            <StyledImg height={app.game === 'Honkai' && '90px'} width='65px' br={app.game != 'Honkai' ? '50%' : '16px'} bg={e._id.stars === 5 ? 'orange' : (e._id.stars === 4 ? '#4600f6' : '#4682B4')} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : (app.game === 'Zzz' ? '/zzz/weapons/' : '/honkai/weapons/')) + e._id.img} />
            <p style={{ position: 'absolute', top: '100%', right: '38%', fontSize: '20px', color: 'white', fontWeight: 'bold' }}>x{e.count}</p>
        </StyledBox>)
    return (
        <>
            <Container style={{ textShadow: '2px 2px 2px black' }} className="mt-3">
                <Button onClick={() => setSort(!sort)} variant="outline-warning" style={{ position: 'fixed', right: '40px', top: '50%', width: '120px' }}>{sort ? 'Отобразить Персонажей' : 'Скрыть Персонажей'}</Button>
                <StyledTitle fz='26px' align='center' color="yellow">Награды Стандартного Баннера 4★ и 5★</StyledTitle>
                <Row md={'auto'} className='mt-3 mb-3 d-flex justify-content-center'
                >
                    {srollsComp.length ? srollsComp : <StyledTitle color="red" fz='22px'>Нет Данных</StyledTitle>}
                </Row>
                <StyledTitle fz='26px' align='center' color="yellow">Награды Ивентового Баннера 4★ и 5★</StyledTitle>
                <Row md={'auto'} className='mt-3 mb-3 d-flex justify-content-center'
                >
                    {erollsComp.length ? erollsComp : <StyledTitle color="red" fz='22px'>Нет Данных</StyledTitle>}
                </Row>
                <StyledTitle fz='26px' align='center' color="yellow">Награды Оружейного Баннера 4★ и 5★</StyledTitle>
                <Row md={'auto'} className='mt-3 mb-5 d-flex justify-content-center'
                >
                    {wrollsComp.length ? wrollsComp : <StyledTitle color="red" fz='22px'>Нет Данных</StyledTitle>}
                </Row>
                <StyledTitle fz='26px' align='center' color="yellow">Таблица персонажей</StyledTitle>
                {app.game === 'Genshin' && <StyledBox className='mt-3 mb-5'>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={anemo} /></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={geo} /></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={electro} /></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={dendro} /></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={hydro} /></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={pyro} /></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={kryo} /></Col>
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ width: '70px' }} src={onehand} /></Col>
                        {charTableCell[0]}
                        {charTableCell[1]}
                        {charTableCell[2]}
                        {charTableCell[3]}
                        {charTableCell[4]}
                        {charTableCell[5]}
                        {charTableCell[6]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ width: '70px' }} src={twohand} /></Col>
                        {charTableCell[7]}
                        {charTableCell[8]}
                        {charTableCell[9]}
                        {charTableCell[10]}
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                        {charTableCell[11]}
                        {charTableCell[12]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ width: '70px' }} src={polearm} /></Col>
                        {charTableCell[13]}
                        {charTableCell[14]}
                        {charTableCell[15]}
                        {charTableCell[16]}
                        {charTableCell[17]}
                        {charTableCell[18]}
                        {charTableCell[19]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ width: '70px' }} src={bow} /></Col>
                        {charTableCell[20]}
                        {charTableCell[21]}
                        {charTableCell[22]}
                        {charTableCell[23]}
                        {charTableCell[24]}
                        {charTableCell[25]}
                        {charTableCell[26]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ width: '70px' }} src={cata} /></Col>
                        {charTableCell[27]}
                        {charTableCell[28]}
                        {charTableCell[29]}
                        {charTableCell[30]}
                        {charTableCell[31]}
                        {charTableCell[32]}
                        {charTableCell[33]}
                    </Row>
                </StyledBox>}
                {app.game === 'Honkai' && <StyledBox className='mt-3 mb-5'>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={wind} /></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={mnim} /></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={elec} /></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={kvant} /></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={phys} /></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={fire} /></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={ice} /></Col>
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', borderLeft: 'yellow solid 2px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ width: '70px' }} src={raz} /></Col>
                        {charTableCell[0]}
                        {charTableCell[1]}
                        {charTableCell[2]}
                        {charTableCell[3]}
                        {charTableCell[4]}
                        {charTableCell[5]}
                        {charTableCell[6]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', borderLeft: 'yellow solid 2px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ width: '70px' }} src={ohot} /></Col>
                        {charTableCell[7]}
                        {charTableCell[8]}
                        {charTableCell[9]}
                        {charTableCell[10]}
                        {charTableCell[11]}
                        {charTableCell[12]}
                        {charTableCell[13]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', borderLeft: 'yellow solid 2px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ width: '70px' }} src={erud} /></Col>
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                        {charTableCell[14]}
                        {charTableCell[15]}
                        {charTableCell[16]}
                        {charTableCell[17]}
                        {charTableCell[18]}
                        {charTableCell[19]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', borderLeft: 'yellow solid 2px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ width: '70px' }} src={harm} /></Col>
                        {charTableCell[20]}
                        {charTableCell[21]}
                        {charTableCell[22]}
                        {charTableCell[23]}
                        {charTableCell[24]}
                        {charTableCell[25]}
                        {charTableCell[26]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', borderLeft: 'yellow solid 2px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ width: '70px' }} src={neb} /></Col>
                        {charTableCell[27]}
                        {charTableCell[28]}
                        {charTableCell[29]}
                        {charTableCell[30]}
                        {charTableCell[31]}
                        {charTableCell[32]}
                        {charTableCell[33]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', borderLeft: 'yellow solid 2px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ width: '70px' }} src={save} /></Col>
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                        {charTableCell[34]}
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                        {charTableCell[35]}
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                        {charTableCell[36]}
                        {charTableCell[37]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', borderLeft: 'yellow solid 2px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ width: '70px' }} src={izo} /></Col>
                        {charTableCell[38]}
                        {charTableCell[39]}
                        {charTableCell[40]}
                        {charTableCell[41]}
                        {charTableCell[42]}
                        {charTableCell[43]}
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                    </Row>
                </StyledBox>}
                {app.game === 'Zzz' && <StyledBox className='mt-3 mb-5'>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={zzzFire} /></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={zzzElectro} /></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={zzzPhys} /></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={zzzIce} /></Col>
                        <Col style={{ color: 'yellow', textAlign: 'center', borderLeft: 'yellow solid 2px' }}><img style={{ width: '40px' }} src={zzzEther} /></Col>
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', borderLeft: 'yellow solid 2px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ width: '40px' }} src={anomaly} /></Col>
                        {charTableCell[0]}
                        {charTableCell[1]}
                        {charTableCell[2]}
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', borderLeft: 'yellow solid 2px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ width: '40px' }} src={attack} /></Col>
                        {charTableCell[3]}
                        {charTableCell[4]}
                        {charTableCell[5]}
                        {charTableCell[6]}
                        {charTableCell[7]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', borderLeft: 'yellow solid 2px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ width: '40px' }} src={stun} /></Col>
                        {charTableCell[8]}
                        {charTableCell[9]}
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                        {charTableCell[10]}
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', borderLeft: 'yellow solid 2px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ width: '40px' }} src={support} /></Col>
                        {charTableCell[11]}
                        {charTableCell[12]}
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                        {charTableCell[13]}
                        {charTableCell[14]}
                    </Row>
                    <Row style={{ border: 'yellow solid 2px' }}>
                        <Col style={{ color: 'yellow', borderLeft: 'yellow solid 2px', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ width: '40px' }} src={defense} /></Col>
                        {charTableCell[15]}
                        {charTableCell[16]}
                        {charTableCell[17]}
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                        <Col style={{ borderLeft: 'yellow solid 2px', height: '160px' }}></Col>
                    </Row>
                </StyledBox>}
                <StyledTitle fz='26px' align='center' color="yellow">{app.game === 'Genshin' ? 'Таблица персонажей по регионам' : 'Таблица персонажей по фракциям'}</StyledTitle>
                <StyledBox className="mt-3 mb-5">
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">{app.game === 'Genshin' ? 'Мондштадт' : (app.game === 'Zzz' ? 'Хитрые Зайцы' : 'Звездный Экспресс')}</StyledTitle>{regionTableRow[0]}</StyledBox>
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">{app.game === 'Genshin' ? 'Ли Юэ' : (app.game === 'Zzz' ? 'Комбинат Белобог' : 'Станция Герта')}</StyledTitle>{regionTableRow[1]}</StyledBox>
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">{app.game === 'Genshin' ? 'Инадзума' : (app.game === 'Zzz' ? 'Виктория' : 'Белобог')}</StyledTitle>{regionTableRow[2]}</StyledBox>
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">{app.game === 'Genshin' ? 'Сумеру' : (app.game === 'Zzz' ? 'Отряд Обол' : 'Альянс Сяньчжоу')}</StyledTitle>{regionTableRow[3]}</StyledBox>
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">{app.game === 'Genshin' ? 'Фонтейн' : (app.game === 'Zzz' ? 'Секция 6' : 'Пенакония')}</StyledTitle>{regionTableRow[4]}</StyledBox>
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">{app.game === 'Genshin' ? 'Натлан' : (app.game === 'Zzz' ? 'Угрозыск' : 'Охотники за Стеларонами')}</StyledTitle>{regionTableRow[5]}</StyledBox>
                    <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">{app.game === 'Genshin' ? 'Снежная' : (app.game === 'Zzz' ? 'Сыны Калидона' : 'КММ')}</StyledTitle>{regionTableRow[6]}</StyledBox>
                    {app.game === 'Honkai' && <StyledBox align='center' display='flex'><StyledTitle style={{ width: '150px' }} fz='22px' align='center' color="yellow">{'Разное'}</StyledTitle>{regionTableRow[7]}{regionTableRow[8]}{regionTableRow[9]}{regionTableRow[10]}{regionTableRow[11]} {regionTableRow[12]} </StyledBox>}
                </StyledBox>
                <Row style={{ margin: '30px 0' }}>
                    <StyledTitle fz='26px' align='center' color="yellow">{'Последнее Появление в Баннере'}</StyledTitle>
                    <StyledTitle fz='26px' align='center' color="yellow">{'★★★★★'}</StyledTitle>
                    <Row style={{ justifyContent: 'center' }}>
                        {charsPN?.chars?.filter(e => e.stars === 5).map(e => (e.charInfo?.lastPatch && e.charInfo?.lastPatch != 0) ? <Col md='auto' style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                            <img style={{ width: '60px', margin: '15px 0' }} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img} />
                            <StyledTitle style={{ position: 'absolute', bottom: '-7%', border: 'solid yellow 1px', backgroundColor: 'red', padding: '0 5px', borderRadius: '16px', right: '0' }} color='yellow' fz='22px'>{Math.floor(e.charInfo?.lastPatch) == e.charInfo?.lastPatch ? e.charInfo?.lastPatch + '.0' : e.charInfo?.lastPatch}</StyledTitle>
                        </Col> : '')}
                    </Row>
                    <StyledTitle fz='26px' align='center' color="yellow">{'★★★★'}</StyledTitle>
                    <Row style={{ justifyContent: 'center' }}>
                        {charsPN?.chars?.filter(e => e.stars === 4).map(e => (e.charInfo?.lastPatch && e.charInfo?.lastPatch != 0) ? <Col md='auto' style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                            <img style={{ width: '60px', margin: '15px 0' }} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img} />
                            <StyledTitle style={{ position: 'absolute', bottom: '-7%', border: 'solid yellow 1px', backgroundColor: 'red', padding: '0 5px', borderRadius: '16px', right: '0' }} color='yellow' fz='22px'>{Math.floor(e.charInfo?.lastPatch) == e.charInfo?.lastPatch ? e.charInfo?.lastPatch + '.0' : e.charInfo?.lastPatch}</StyledTitle>
                        </Col> : '')}
                    </Row>
                </Row>
                <Row style={{ margin: '30px 0' }}>
                    <StyledTitle fz='26px' align='center' color="yellow">{'Кол-во Появлений в Баннерах'}</StyledTitle>
                    <StyledTitle fz='26px' align='center' color="yellow">{'★★★★★'}</StyledTitle>
                    <Row style={{ justifyContent: 'center' }}>
                        {charsPC?.chars?.filter(e => e.stars === 5).map(e => (e.charInfo?.patchCounter && e.charInfo?.patchCounter != 0) ? <Col md='auto' style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                            <img style={{ width: '60px', margin: '15px 0' }} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img} />
                            <StyledTitle style={{ position: 'absolute', bottom: '-7%', border: 'solid yellow 1px', backgroundColor: 'red', padding: '0 5px', borderRadius: '16px', right: '0' }} color='yellow' fz='22px'>{e.charInfo?.patchCounter}</StyledTitle>
                        </Col> : '')}
                    </Row>
                    <StyledTitle fz='26px' align='center' color="yellow">{'★★★★'}</StyledTitle>
                    <Row style={{ justifyContent: 'center' }}>
                        {charsPC?.chars?.filter(e => e.stars === 4).map(e => (e.charInfo?.patchCounter && e.charInfo?.patchCounter != 0) ? <Col md='auto' style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                            <img style={{ width: '60px', margin: '15px 0' }} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img} />
                            <StyledTitle style={{ position: 'absolute', bottom: '-7%', border: 'solid yellow 1px', backgroundColor: 'red', padding: '0 5px', borderRadius: '16px', right: '0' }} color='yellow' fz='22px'>{e.charInfo?.patchCounter}</StyledTitle>
                        </Col> : '')}
                    </Row>
                </Row>
                <Row style={{ margin: '30px 0' }}>
                    <StyledTitle fz='26px' align='center' color="yellow">{'Порядок выхода персонажей'}</StyledTitle>
                    <StyledTitle fz='26px' align='center' color="yellow">{'★★★★★'}</StyledTitle>
                    <Row style={{ justifyContent: 'center' }}>
                        {charsR?.chars?.filter(e => e.stars === 5).map(e => e.charInfo?.firstPatch && <Col md='auto' style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                            <img style={{ width: '60px', margin: '15px 0' }} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img} />
                            <StyledTitle style={{ position: 'absolute', bottom: '-7%', border: 'solid yellow 1px', backgroundColor: 'red', padding: '0 5px', borderRadius: '16px', right: '0' }} color='yellow' fz='22px'>{Math.floor(e.charInfo?.firstPatch) == e.charInfo?.firstPatch ? e.charInfo?.firstPatch + '.0' : e.charInfo?.firstPatch}</StyledTitle>
                        </Col>)}
                    </Row>
                    <StyledTitle fz='26px' align='center' color="yellow">{'★★★★'}</StyledTitle>
                    <Row style={{ justifyContent: 'center' }}>
                        {charsR?.chars?.filter(e => e.stars === 4).map(e => e.charInfo?.firstPatch && <Col md='auto' style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                            <img style={{ width: '60px', margin: '15px 0' }} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + e.img} />
                            <StyledTitle style={{ position: 'absolute', bottom: '-7%', border: 'solid yellow 1px', backgroundColor: 'red', padding: '0 5px', borderRadius: '16px', right: '0' }} color='yellow' fz='22px'>{Math.floor(e.charInfo?.firstPatch) == e.charInfo?.firstPatch ? e.charInfo?.firstPatch + '.0' : e.charInfo?.firstPatch}</StyledTitle>
                        </Col>)}
                    </Row>
                </Row>
            </Container>
        </>
    )
})
export default Statistic
import { observer } from 'mobx-react-lite'
import { StyledBox } from '../styledComponents/styled-components'
import Col from 'react-bootstrap/esm/Col'
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
import { useContext } from 'react'
import { AppContext } from '..'
export const Char = observer((props) => {
    const { app } = useContext(AppContext)
    return (
        <Col md={props.gridpart} className='mt-4' style={{}}  >
            <StyledBox style={{ height: '220px', background: props.char.stars === 5 ? 'orange' : '#4600f6' }}
                width='100%' cursor='pointer'
                padding='15px 15px'
                display='flex'
                dir='column'
                shadow='4px 5px 14px violet' br='15px'
                jstf='end' hover='0 5px 15px red'
                align='center'
                onClick={() => { props.onShow(props.char.id, 'char') }}
            >
                <StyledBox width='100%' display='flex' dir='row' jstf='space-between' padding='5px 10px' align='center' style={{ position: 'absolute', top: '5%' }} >
                    {app.game === 'Genshin' && < img style={{ width: '50px', borderRadius: '25px', backgroundColor: 'black', border: 'red 3px solid' }} src={
                        props.char.weaponId === 1 ? onehand :
                            (props.char.weaponId === 2 ? twohand : (
                                props.char.weaponId === 3 ? polearm : (
                                    props.char.weaponId === 4 ? bow : cata
                                )
                            ))
                    } />}
                    {app.game === 'Zzz' && < img style={{ width: '50px', borderRadius: '25px', backgroundColor: 'black', border: 'red 3px solid' }} src={
                        props.char.enemyMaterialId === 1 ? anomaly :
                            (props.char.enemyMaterialId === 2 ? attack : (
                                props.char.enemyMaterialId === 3 ? stun : (
                                    props.char.enemyMaterialId === 4 ? support : defense
                                )
                            ))
                    } />}
                    {app.game === 'Honkai' && < img style={{ width: '50px', border: 'red 3px solid', borderRadius: '25px' }} src={
                        props.char.pathId === 1 ? raz :
                            (props.char.pathId === 2 ? ohot : (
                                props.char.pathId === 3 ? erud : (
                                    props.char.pathId === 4 ? harm : (
                                        props.char.pathId === 5 ? neb : (
                                            props.char.pathId === 6 ? save : izo
                                        )
                                    )
                                )
                            ))
                    } />}
                    {app.game === 'Zzz' && < img style={{ width: '50px', borderRadius: '25px', backgroundColor: 'black', border: 'red 3px solid' }} src={
                        props.char.talentMaterialId === 1 ? zzzFire :
                            (props.char.talentMaterialId === 2 ? zzzElectro : (
                                props.char.talentMaterialId === 3 ? zzzPhys : (
                                    props.char.talentMaterialId === 4 ? zzzIce : zzzEther
                                )
                            ))
                    } />}
                    {props.char.stoneTypeId === 1 && <img alt='element' style={{ width: '50px', margin: '0 5px', borderRadius: '25px', backgroundColor: 'black', border: 'red 3px solid' }} src={app.game === 'Genshin' ? anemo : wind}></img>}
                    {props.char.stoneTypeId === 6 && <img alt='element' style={{ width: '50px', margin: '0 5px', borderRadius: '25px', backgroundColor: 'black', border: 'red 3px solid' }} src={app.game === 'Genshin' ? pyro : fire}></img>}
                    {props.char.stoneTypeId === 5 && <img alt='element' style={{ width: '50px', margin: '0 5px', borderRadius: '25px', backgroundColor: 'black', border: 'red 3px solid' }} src={app.game === 'Genshin' ? hydro : phys}></img>}
                    {props.char.stoneTypeId === 4 && <img alt='element' style={{ width: '50px', margin: '0 5px', borderRadius: '25px', backgroundColor: 'black', border: 'red 3px solid' }} src={app.game === 'Genshin' ? dendro : kvant}></img>}
                    {props.char.stoneTypeId === 7 && <img alt='element' style={{ width: '50px', margin: '0 5px', borderRadius: '25px', backgroundColor: 'black', border: 'red 3px solid' }} src={app.game === 'Genshin' ? kryo : ice}></img>}
                    {props.char.stoneTypeId === 3 && <img alt='element' style={{ width: '50px', margin: '0 5px', borderRadius: '25px', backgroundColor: 'black', border: 'red 3px solid' }} src={app.game === 'Genshin' ? electro : elec}></img>}
                    {props.char.stoneTypeId === 2 && <img alt='element' style={{ width: '50px', margin: '0 5px', borderRadius: '25px', backgroundColor: 'black', border: 'red 3px solid' }} src={app.game === 'Genshin' ? geo : mnim}></img>}
                </StyledBox>
                <img alt='character'
                    style={{ maxWidth: '120px', height: '120px', borderRadius: '15px' }}
                    src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/chars/" : (app.game === 'Zzz' ? '/zzz/chars/' : '/honkai/chars/')) + props.char.img}></img>
                <div style={{ fontWeight: 'bold', fontSize: '20px', color: 'white' }}>{props.char.name}</div>
            </StyledBox>
        </Col>
    )
})

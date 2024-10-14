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
import { useContext } from 'react'
import { AppContext } from '..'
export const Char = observer((props) => {
    const {app}=useContext(AppContext)
    return (
        <Col md={props.gridpart} className='mt-4'  >
            <StyledBox style={{ background: props.char.stars === 5 ? 'orange' : '#4600f6' }}
                width='100%' cursor='pointer'
                padding='0px 15px'
                display='flex'
                shadow='4px 5px 14px violet' br='15px'
                jstf='space-around' hover='0 5px 15px red'
                align='center'
                c
                onClick={() => { props.onShow(props.char.id, 'char') }}
            >
                <img alt='character'
                    style={{ maxWidth: '150px',height:'150px', borderRadius: '15px' }}
                    src={process.env.REACT_APP_API_URL + (app.game==='Genshin'?"/chars/":'/zzz/chars/') + props.char.img}></img>
                <StyledBox display='flex' dir='column' style={{ marginLeft: '10px' }} >
                    {props.char.stoneTypeId === 1 && <img alt='element' style={{ width: '60px', margin: '0 15px' }} src={anemo}></img>}
                    {props.char.stoneTypeId === 6 && <img alt='element' style={{ width: '60px', margin: '0 15px' }} src={pyro}></img>}
                    {props.char.stoneTypeId === 5 && <img alt='element' style={{ width: '60px', margin: '0 15px' }} src={hydro}></img>}
                    {props.char.stoneTypeId === 4 && <img alt='element' style={{ width: '60px', margin: '0 15px' }} src={dendro}></img>}
                    {props.char.stoneTypeId === 7 && <img alt='element' style={{ width: '60px', margin: '0 15px' }} src={kryo}></img>}
                    {props.char.stoneTypeId === 3 && <img alt='element' style={{ width: '60px', margin: '0 15px' }} src={electro}></img>}
                    {props.char.stoneTypeId === 2 && <img alt='element' style={{ width: '60px', margin: '0 15px' }} src={geo}></img>}
                    <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>{props.char.name}</div>
                </StyledBox>
            </StyledBox>
        </Col>
    )
})

import { observer } from 'mobx-react-lite'
import { StyledBox } from '../styledComponents/styled-components'
import Col from 'react-bootstrap/esm/Col'
export const Weapon = observer((props) => {
    return (
        <Col md={props.gridpart} className='mt-4'>
            <StyledBox style={{ background: props.weapon.stars === 5 ? 'orange' : (props.weapon.stars === 4 ? '#4600f6' : '#4682B4') }}
                width='100%' cursor='pointer'
                height='100%'
                padding='10px 15px'
                display='flex'
                dir='column'
                shadow='4px 5px 14px violet' br='15px'
                jstf='space-around' hover='0 5px 15px red'
                align='center'
                onClick={() => { props.onShow(props.weapon.id, 'weapon') }}
            >
                <img alt='character'
                    style={{ maxWidth: '150px', borderRadius: '15px' }}
                    src={process.env.REACT_APP_API_URL + "/weapons/" + props.weapon.img}></img>
                <StyledBox display='flex' dir='column' style={{ marginLeft: '10px' }} >
                    <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'white' }}>{props.weapon.name}</div>
                </StyledBox>
            </StyledBox>
        </Col >
    )
})

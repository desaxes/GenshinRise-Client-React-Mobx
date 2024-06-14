import { observer } from 'mobx-react-lite'
import { StyledBox } from '../styledComponents/styled-components'
import Col from 'react-bootstrap/esm/Col'
import { useContext } from 'react'
import { AppContext } from '..'
export const Material = observer((props) => {
    const { materials } = useContext(AppContext)
    const bg = materials.timers.some(e => e.materialId === props.mat.id)
    return (
        <Col md='auto' className='mt-4'  >
            <StyledBox style={{ background: bg ? 'red' : '#6a9e73' }}
                width='100%' cursor='pointer'
                padding='0px 40px 0px 5px'
                display='flex'
                shadow='4px 5px 14px violet' br='15px'
                jstf='space-around' hover='0 5px 15px red'
                align='center'
                onClick={() => { props.onShow(props.mat.id) }}
            >
                <img alt='character'
                    style={{ maxWidth: '150px', borderRadius: '15px' }}
                    src={process.env.REACT_APP_API_URL + "/localSpecialtys/" + props.mat.img}></img>
                <StyledBox display='flex' dir='column' style={{ marginLeft: '10px', maxWidth: '100px', padding: '0 30px 0 0' }} >
                    <div style={{ fontWeight: 'bold', fontSize: '16px', color: 'white' }}>{props.mat.name}</div>
                </StyledBox>
            </StyledBox>
        </Col>
    )
})

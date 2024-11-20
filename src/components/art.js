import { observer } from 'mobx-react-lite'
import { StyledBox } from '../styledComponents/styled-components'
import Col from 'react-bootstrap/esm/Col'
import { useContext } from 'react'
import { AppContext } from '..'
export const Art = observer((props) => {
    const { app } = useContext(AppContext)
    return (
        <Col md={props.gridpart} className='mt-4'>
            <StyledBox style={{ background: 'orange' }}
                width='100%' cursor='pointer'
                height='100%'
                padding='10px 15px'
                display='flex'
                dir='column'
                shadow='4px 5px 14px violet' br='15px'
                jstf='space-around' hover='0 5px 15px red'
                align='center'
                onClick={() => { props.onShow(props.art.id) }}
            >
                <img alt='art'
                    style={{ width: '150px', borderRadius: '15px' }}
                    src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/arts/" : (app.game === 'Zzz' ? "/zzz/arts/" : '/honkai/arts/')) + props.art.img}></img>
                <StyledBox display='flex' dir='column' style={{ marginLeft: '10px' }} >
                    <div style={{ fontWeight: 'bold', fontSize: '18px', color: 'white' }}>{props.art.name}</div>
                </StyledBox>
            </StyledBox>
        </Col >
    )
})

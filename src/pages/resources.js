import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { AppContext } from '..';
import { getChars } from '../http/charAPI';
import { Char } from '../components/char';
import { CharOptions } from '../components/modals/charOptions';
import { Button } from 'react-bootstrap/esm/';
import { StyledTitle } from '../styledComponents/styled-components';
import { observer } from 'mobx-react-lite';
import Form from 'react-bootstrap/Form';
import { deleteTimer, getLocalSpecialtys, getTimers } from '../http/materialAPI';
import { Material } from '../components/material';
import { MatOtions } from '../components/modals/matOptions';

const Resources = observer(() => {
    const { materials } = useContext(AppContext)
    const { app } = useContext(AppContext)
    const [matId, setMatId] = useState()
    const [modalOptions, setModalOptions] = useState(false)
    const createModal = (id) => {
        setMatId(id)
        setModalOptions(true)
    }
    useEffect(() => {
        getTimers().then(res => {
            if (res) {
                for (let i = 0; i < res.data.length; i++) {
                    const date = new Date
                    if (date.getTime() - res.data[i].time > 172800000) {
                        deleteTimer(res.data[i].materialId)
                    }
                }
                getTimers().then(res => {
                    materials.setTimers(res.data)
                    app.setUpdated(false)
                })
            }
        })
    }, [materials.region, materials, app.updated])
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])
    useEffect(() => {
        getLocalSpecialtys().then(res => {
            if (res) {
                if (materials.region != '') {
                    materials.setLocalSpecialtys(res.data.filter(e => +e.regionId === materials.region))
                }
                else {
                    materials.setLocalSpecialtys(res.data)
                }
            }
        })
    }, [materials.timers])
    let mats = materials.localSpecialtys.map(e => <Material key={e.id} regionId={e.regionId} mat={e} onShow={createModal} />)
    return (
        <>
            <Container >
                <Row className='mt-3 pb-5'>
                    <Col md={3} className='mt-5'>
                        <StyledTitle color='yellow' fz='22px'>
                            Регион
                        </StyledTitle>
                        <Row className='mb-2'>
                            <Col md='auto' className='mt-1'><Button onClick={() => materials.setRegion(1)} variant={materials.region === 1 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Мондштадт</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => materials.setRegion(2)} variant={materials.region === 2 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Ли Юэ</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => materials.setRegion(3)} variant={materials.region === 3 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Инадзума</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => materials.setRegion(4)} variant={materials.region === 4 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Сумеру</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => materials.setRegion(5)} variant={materials.region === 5 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Фонтейн</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => materials.setRegion(6)} variant={materials.region === 6 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Натлан</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => materials.setRegion(7)} variant={materials.region === 7 ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Снежная</Button></Col>
                            <Col md='auto' className='mt-1'><Button onClick={() => materials.setRegion('')} variant={materials.region === '' ? 'warning' : 'outline-warning'} style={{ width: '130px', fontWeight: 'bold' }}>Все</Button></Col>
                        </Row>
                    </Col>
                    <Col className='mt-4 d-flex flex-column align-items-center' md={9}>
                        <Row className='d-flex justify-content-center'
                            display='grid' dir='column' width='100%'
                            jstf='space-between' gap='30px'
                        >
                            {mats.length?mats:<StyledTitle color="red" fz='22px'>Нет Данных с Сервера</StyledTitle>}
                        </Row>
                    </Col>
                </Row>
                {modalOptions && <MatOtions
                    show={true}
                    onHide={() => setModalOptions(false)}
                    matId={matId}
                />}
            </Container>
        </>
    )
}
)
export default Resources
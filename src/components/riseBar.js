import { useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { StyledBox, StyledImg } from './../styledComponents/styled-components';
import { getBossMaterialById, getEnemyMaterialById, getLocalSpecialtyById, getStoneById, getTalentById, getWBMaterialById } from '../http/materialAPI';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { observer } from 'mobx-react-lite';
import { getEnemyWeaponMaterialById, getWeaponMaterialById } from '../http/weaponMatAPI';
export const RiseBar = observer((props) => {
    const [material, setMaterial] = useState({})
    const [tooltip, setTooltip] = useState(false)
    const [url, setUrl] = useState()
    const [form, setForm] = useState(false)
    const [localValue, setLocalValue] = useState()
    const setCount = (operation) => {
        if (operation === '+') {
            if (props.current < props.max) {
                props.counter(props.current + 1)
            }
            else {
                console.log('Максимальное кол-во материалов')
            }
        }
        else {
            if (props.current > 0) {
                props.counter(props.current - 1)
            }
            else {
                console.log('Минимальное кол-во материалов')
            }
        }
    }
    useEffect(() => {
        switch (props.materialBase) {
            case 1:
                getStoneById(props.materialId).then(res => setMaterial(res.data))
                setUrl('/stones/')
                break;
            case 2:
                getLocalSpecialtyById(props.materialId).then(res => setMaterial(res.data))
                setUrl('/localSpecialtys/')
                break;
            case 3:
                getEnemyMaterialById(props.materialId).then(res => setMaterial(res.data))
                setUrl('/enemyMaterials/')
                break;
            case 4:
                getBossMaterialById(props.materialId).then(res => setMaterial(res.data))
                setUrl('/bossMaterials/')
                break;
            case 5:
                getTalentById(props.materialId).then(res => setMaterial(res.data))
                setUrl('/talents/')
                break;
            case 6:
                getWBMaterialById(props.materialId).then(res => setMaterial(res.data))
                setUrl('/weekBossMaterials/')
                break;
            case 7:
                getWeaponMaterialById(props.materialId).then(res => setMaterial(res.data))
                setUrl('/weaponMaterials/')
                break;
            case 8:
                getEnemyWeaponMaterialById(props.materialId).then(res => setMaterial(res.data))
                setUrl('/enemyWeaponMaterials/')
                break;
            default:
                break;
        }
    }, [props.materialBase, props.materialId])
    if (props.max != 0) {
        return (
            <StyledBox display='flex' align='center' className='mt-2' gap='16px'>
                {props.quality === 0 && < StyledImg onMouseOver={() => setTooltip(true)} onMouseOut={() => setTooltip(false)} src={process.env.REACT_APP_API_URL + url + material.img} width={'60px'} />}
                {props.quality === 1 && < StyledImg onMouseOver={() => setTooltip(true)} onMouseOut={() => setTooltip(false)} src={process.env.REACT_APP_API_URL + url + material.img1} width={'60px'} />}
                {props.quality === 2 && < StyledImg onMouseOver={() => setTooltip(true)} onMouseOut={() => setTooltip(false)} src={process.env.REACT_APP_API_URL + url + material.img2} width={'60px'} />}
                {props.quality === 3 && < StyledImg onMouseOver={() => setTooltip(true)} onMouseOut={() => setTooltip(false)} src={process.env.REACT_APP_API_URL + url + material.img3} width={'60px'} />}
                {props.quality === 4 && < StyledImg onMouseOver={() => setTooltip(true)} onMouseOut={() => setTooltip(false)} src={process.env.REACT_APP_API_URL + url + material.img4} width={'60px'} />}
                <ProgressBar onClick={() => { setForm(true) }} style={{ cursor: 'pointer', height: '25px', width: '200px', backgroundColor: 'red' }} now={100 / props.max * props.current}
                    variant="warning" animated
                />
                <div style={{ position: 'absolute', marginLeft: '47%', fontWeight: 'bold', fontStyle: 'italic' }}>{props.current}/{props.max}</div>
                {form && <Form className="d-flex" style={{ position: 'absolute', marginLeft: '20%', width: '300px', height: '30px' }} >
                    <Form.Control
                        type="search"
                        placeholder="Введите значение"
                        className="me-2"
                        aria-label="Введите значение"
                        value={localValue}
                        onChange={e => setLocalValue(e.target.value)}
                        style={{ color: 'red', fontWeight: 'bold' }}
                    />
                    <Button variant='warning' style={{ position: 'absolute', height: '30px', fontSize: '12px', marginLeft: '83%' }} onClick={() => {
                        if (!isNaN(localValue) && localValue !== '') {
                            if (localValue > props.max) {
                                props.counter(props.max)
                            }
                            else if (localValue < 0) {
                                props.counter(0)
                            }
                            else { props.counter(localValue) }
                        }
                        setForm(false)
                    }}>Ок</Button>
                </Form>}
                {!form && <StyledBox display='flex' gap='6px'>
                    <Button style={{ fontWeight: 'bold', fontSize: '16px', height: '25px', padding: '0px 10px' }} variant='outline-danger' onClick={() => setCount('-')}>⇓</Button>
                    <Button style={{ fontWeight: 'bold', fontSize: '16px', height: '25px', padding: '0px 10px' }} variant='outline-warning' onClick={() => setCount('+')}>⇑</Button>
                </StyledBox>}
                {tooltip && <div style={{
                    backgroundColor: 'white',
                    position: 'absolute',
                    fontWeight: 'bold',
                    fontStyle: 'italic',
                    marginBottom: '-22%',
                    padding: '0  5px',
                    border: '4px solid yellow',
                    borderRadius: '15px'
                }}>
                    {material.name}
                </div>}
            </StyledBox>
        )
    }
})
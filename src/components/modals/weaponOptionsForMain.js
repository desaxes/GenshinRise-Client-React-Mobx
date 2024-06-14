import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap/esm/';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { StyledBox, StyledImg } from '../../styledComponents/styled-components';import { addMaxValuesForWeapon, addWeaponToCol, addWeaponToRise, getWeaponFromColById, getWeaponFromRiseById, getWeaponsFromCol, removeMaxValuesForWeapon, removeWeaponFromCol, removeWeaponFromRise } from '../../http/weaponAPI';
import { getWeaponMaterialById } from '../../http/weaponMatAPI';
export const WeaponOptionsForMain = observer((props) => {
    const { weapons } = useContext(AppContext)
    const [mat, setMat] = useState()
    const weapon = weapons.weapons.weapons.find(e => e.id === props.weaponId)
    useEffect(() => {
        getWeaponMaterialById(weapon.weaponMaterialId).then(res => setMat(res.data))
    }, [])
    if (weapon && mat) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered

            >
                <Modal.Header closeButton style={{ backgroundColor: '#212529', border: '2px solid yellow' }}>
                    <Modal.Title id="contained-modal-title-vcenter" style={{ color: 'yellow' }}>
                        {weapon.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ display: "flex", justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow' }}>
                    <StyledBox display='flex'>
                        <img alt='character' src={process.env.REACT_APP_API_URL + "/weapons/" + weapon.img}></img>
                        <StyledBox display='flex' jstf='center' dir='column'>
                            < StyledImg src={process.env.REACT_APP_API_URL + '/weaponMaterials/' + mat.img1} width={'75px'} />
                            < StyledImg src={process.env.REACT_APP_API_URL + '/weaponMaterials/' + mat.img2} width={'75px'} />
                            < StyledImg src={process.env.REACT_APP_API_URL + '/weaponMaterials/' + mat.img3} width={'75px'} />
                            < StyledImg src={process.env.REACT_APP_API_URL + '/weaponMaterials/' + mat.img4} width={'75px'} />
                        </StyledBox>
                    </StyledBox>
                </Modal.Body>
                <Modal.Footer style={{ display: "flex", justifyContent: 'center', backgroundColor: '#212529', border: '2px solid yellow' }}>
                    <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>)
    }
})
import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap/esm/';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { getTalentById } from '../../http/materialAPI';
import { StyledBox, StyledImg } from '../../styledComponents/styled-components';
export const CharOptionsForMain = observer((props) => {
    const { chars } = useContext(AppContext)
    const [talent, setTalent] = useState()
    const char = chars.chars.chars.find(e => e.id === props.charId)
    useEffect(() => {
        getTalentById(char.talentMaterialId).then(res => setTalent(res.data))
    }, [])
    if (char && talent) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered

            >
                <Modal.Header style={{ backgroundColor: '#212529', border: '2px solid yellow' }} closeButton>
                    <Modal.Title style={{ color: 'yellow' }} id="contained-modal-title-vcenter" >
                        {char.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: '#212529', border: '2px solid yellow', display: "flex", justifyContent: 'center' }}>
                    <StyledBox>
                        <img alt='character' src={process.env.REACT_APP_API_URL + "/chars/" + char.img}></img>
                        <StyledBox display='flex' jstf='center'>
                            < StyledImg src={process.env.REACT_APP_API_URL + '/talents/' + talent.img1} width={'80px'} />
                            < StyledImg src={process.env.REACT_APP_API_URL + '/talents/' + talent.img2} width={'80px'} />
                            < StyledImg src={process.env.REACT_APP_API_URL + '/talents/' + talent.img3} width={'80px'} />
                        </StyledBox>
                    </StyledBox>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#212529', border: '2px solid yellow', display: "flex", justifyContent: 'center' }}>
                    <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
                </Modal.Footer>
            </Modal>)
    }
})
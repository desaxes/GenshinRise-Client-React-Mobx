import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Col, Dropdown } from 'react-bootstrap/esm/';
import { observer } from 'mobx-react-lite';
import { StyledBox } from '../styledComponents/styled-components';
export const Banner = observer((props) => {
    return (
        <>
            <Col>
            <p style={{ fontWeight: 'bold',color:'yellow',textAlign:'center' }}>Патч {props.patchNumber}</p>
                <StyledBox
                    width='100%' cursor='pointer'

                    display='flex'
                    margin='25px 0'
                    shadow='6px 5px 15px violet' br='15px'
                    jstf='space-around' hover='0 5px 15px red'
                    align='center'
                    onClick={() => { props.onShow(props.id) }}
                >
                    <StyledBox display='flex' gap='8px'>
                        <img alt='banner'
                            style={{ maxWidth: '270px', borderRadius: '15px' }}
                            src={process.env.REACT_APP_API_URL + "/bannerImgs/" + props.img1}></img>
                        <img alt='banner'
                            style={{ maxWidth: '270px', borderRadius: '15px' }}
                            src={process.env.REACT_APP_API_URL + "/bannerImgs/" + props.img2}></img>
                    </StyledBox>
                </StyledBox>

            </Col>
        </>
    )
})

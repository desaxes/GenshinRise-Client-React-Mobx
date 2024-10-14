import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Col, Dropdown } from 'react-bootstrap/esm/';
import { observer } from 'mobx-react-lite';
import { StyledBox } from '../styledComponents/styled-components';
import { AppContext } from '..';
export const Banner = observer((props) => {
    const { app } = useContext(AppContext)
    return (
        <>
            <Col>
                <p style={{ fontWeight: 'bold', color: 'yellow', textAlign: 'center' }}>Патч {props.patchNumber}</p>
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
                            style={{ width: '270px',height:'150px', borderRadius: '15px' }}
                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/bannerImgs/" : "/zzz/bannerImgs/") + props.img1}></img>
                        {props.img2 && <img alt='banner'
                            style={{ width: '270px',height:'150px', borderRadius: '15px' }}
                            src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/bannerImgs/" : "/zzz/bannerImgs/") + props.img2}></img>}
                    </StyledBox>
                </StyledBox>

            </Col>
        </>
    )
})

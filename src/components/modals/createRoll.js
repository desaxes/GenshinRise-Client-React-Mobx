import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { Button, Dropdown } from 'react-bootstrap/esm/';
import { getChars } from '../../http/charAPI';
import { AppContext } from '../..';
import { observer } from 'mobx-react-lite';
import { StyledBox } from '../../styledComponents/styled-components';
import { getWeapons } from '../../http/weaponAPI';
import { createRoll } from '../../http/rollAPI';
export const CreateRoll = observer((props) => {
    const { chars } = useContext(AppContext)
    const { weapons } = useContext(AppContext)
    const [char, setChar] = useState('')
    const [weapon, setWeapon] = useState('')
    const [stars, setStars] = useState('')
    // const [bannerType, setBannerType] = useState('')
    const [bannerEndPoint, setBannerEndPoint] = useState('')
    const [rewardType, setRewardType] = useState('')
    const [isChar, setIsChar] = useState('')
    const [date, setDate] = useState('')
    const [success, setSuccess] = useState(false)
    useEffect(() => {
        setBannerEndPoint(props.bannerType)
        getChars().then(res => chars.setChars(res.data))
        getWeapons().then(res => weapons.setWeapons(res.data))
    }, [])
    const addRoll = () => {
        createRoll({
            year: +date.split('-')[0],
            month: +date.split('-')[1],
            day: +date.split('-')[2],
            isChar: isChar,
            rewardId: isChar ? char.id : weapon.id,
            rewardName: isChar ? char.name : weapon.name,
            stars: +stars,
            img: isChar ? char.img : weapon.img
        }, bannerEndPoint).then(res => {
            setSuccess(true)
            if (bannerEndPoint === 'standart') {
                props.updateStandart(true)
            }
            else if (bannerEndPoint === 'event') {
                props.updateEvent(true)
            }
            else if (bannerEndPoint === 'weapon') {
                props.updateWeapon(true)
            }
        })
    }
    useEffect(() => {
        setTimeout(() => setSuccess(false), 2000)
    }, [success])
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered

        >
            <Modal.Header style={{ backgroundColor: '#212529', border: '2px solid yellow' }} closeButton>
                <Modal.Title style={{ color: 'yellow' }} id="contained-modal-title-vcenter" >
                    Добавить Молитву
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#212529', border: '2px solid yellow', display: "flex", justifyContent: 'center' }}>
                <StyledBox>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {stars === '' ? 'Выберите Редкость Награды' : stars}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setStars(3) }}>3</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setStars(4) }}>4</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setStars(5) }}>5</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {rewardType === '' ? 'Выберите Тип Награды' : rewardType}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => { setRewardType('Персонаж'); setIsChar(true) }}>Персонаж</Dropdown.Item>
                            <Dropdown.Item onClick={() => { setRewardType('Оружие'); setIsChar(false) }}>Оружие</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <input value={date} onChange={e => setDate(e.target.value)} type='date'></input>
                    {isChar && rewardType != '' && stars != '' && <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {char === '' ? 'Выберите Персонажа' : char.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {chars.chars.chars.filter(e => e.stars === stars).map(e =>
                                <Dropdown.Item
                                    onClick={() => { setChar(e) }}
                                    key={e.id}>
                                    <StyledBox display='flex' align='center' jstf='center' >
                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + '/chars/' + e.img}></img>
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>}
                    {!isChar && rewardType != '' && stars != '' && <Dropdown className='mt-2 mb-2'>
                        <Dropdown.Toggle variant='outline-warning'>
                            {weapon === '' ? 'Выберите Оружие' : weapon.name}
                        </Dropdown.Toggle>
                        <Dropdown.Menu style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {weapons.weapons.weapons.filter(e => e.stars === stars).map(e =>
                                <Dropdown.Item
                                    onClick={() => { setWeapon(e) }}
                                    key={e.id}>
                                    <StyledBox display='flex' align='center' jstf='center' >
                                        <img alt='stone' style={{ maxWidth: '40px' }}
                                            src={process.env.REACT_APP_API_URL + '/weapons/' + e.img}></img>
                                        <p style={{ fontWeight: 'bold' }}>{e.name}</p>
                                    </StyledBox>
                                </Dropdown.Item>)}
                        </Dropdown.Menu>
                    </Dropdown>}
                </StyledBox>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#212529', border: '2px solid yellow', display: "flex", justifyContent: 'center' }}>
                <Button disabled={!stars || isChar ? !char : !weapon || !rewardType || !date || success} variant='outline-warning' onClick={addRoll}>Добавить</Button>
                <Button variant='outline-danger' onClick={props.onHide}>Закрыть</Button>
                {success && <p style={{ color: 'yellow', position: 'absolute', right: '20px' }}>Добавлено!</p>}
            </Modal.Footer>
        </Modal>)
})

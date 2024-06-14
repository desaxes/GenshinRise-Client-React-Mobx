import React from 'react'
import { useNavigate } from 'react-router-dom';
import { StyledLink } from '../styledComponents/styled-components';
export const Link = (props) => {
    const navigate = useNavigate()
    const link = (to) => {
        navigate(to)
    }
    return <StyledLink bg color='yellow' hover='black' {...props} onClick={() => link(props.to)}>
    </StyledLink>
}
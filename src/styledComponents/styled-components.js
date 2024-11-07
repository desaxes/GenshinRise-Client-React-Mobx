import styled from 'styled-components';

export const StyledLink = styled.div`
color:${props => props.color ? props.color : 'white'};
font-size:${props => props.fz} ;
margin:${props => props.margin};
font-weight:${props => props.weight ? props.weight : 'normal'};
cursor:pointer;
transition: 0.3s;
border:${props => props.border};
border-radius:8px;
padding:4px 12px;
align-self:center;
background-color:${props => props.bg ? props.bg : 'transparent'};
&:hover{
    color:${props => props.hover ? props.hover : 'green'}; 
    background-color:yellow;
}
`
export const StyledBox = styled.div`
width:${props => props.width};
height:${props => props.height};
display:${props => props.display};
flex-direction:${props => props.dir};
align-items:${props => props.align};
justify-content:${props => props.jstf};
gap:${props => props.gap};
margin:${props => props.margin};
padding:${props => props.padding};
box-shadow:${props => props.shadow};
background-color:${props => props.bg};
border-radius:${props => props.br};
border:${props => props.border};
cursor:${props => props.cursor};
grid-template-columns:repeat(2,50%);
transition: 0.3s;
position:relative;
color:${props => props.color};
&:hover{
    box-shadow:${props => props.hover}; 
}
`
export const StyledImg = styled.img`
width:${props => props.width ? props.width : '250px'};
height:${props => props.height ? props.height : ''};
opacity:${props => props.opacity ? props.opacity : '100%'};
border-radius:${props => props.br ? props.br : '15px'};
background-color:${props => props.bg ? props.bg : 'transparent'};
`

export const StyledTitle = styled.h1`
color:${props => props.color};
font-size: ${props => props.fz};
width:${props => props.wid};
text-align:${props => props.align};
opacity:${props => props.opacity};
line-height:${props => props.lh};
text-decoration:${props => props.dec};
font-style:${props => props.fs};
margin:${props => props.mar};
cursor:${props => props.cursor};
`
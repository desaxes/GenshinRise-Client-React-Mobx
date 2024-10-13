import { useEffect, useState } from "react";
import { getMaxValues } from "../http/charAPI";
import { StyledBox, StyledImg } from "../styledComponents/styled-components"
import ProgressBar from 'react-bootstrap/ProgressBar';

export const Progress = (props) => {
    const [maximum, setMaximum] = useState(714)
    useEffect(() => {
        getMaxValues().then(res => {
            const e = res.data.find(e => e.id === props.id)
            if (e) {
                setMaximum(e.stone1count + e.stone2count + e.stone3count + e.stone4count +
                    e.localSpecialtyCount + e.enemyMaterial1Count + e.enemyMaterial2Count +
                    e.enemyMaterial3Count + e.enemyMaterial1CountForTalent + e.enemyMaterial2CountForTalent +
                    e.enemyMaterial3CountForTalent + e.bossMaterialCount + e.talentMaterial1Count +
                    e.talentMaterial2Count + e.talentMaterial3Count + e.weekBossMaterialCount
                )
            }
        })
    }, [])
    return (
        <StyledBox className="mt-3" display='flex' align='center' gap='10px'>
            <StyledImg width={'80px'} src={process.env.REACT_APP_API_URL + "/chars/" + props.img}></StyledImg>
            <ProgressBar style={{ height: '25px', width: '100%', backgroundColor: 'red' }} now={100 / maximum * props.current}
                variant="warning" animated></ProgressBar>
        </StyledBox>)
}
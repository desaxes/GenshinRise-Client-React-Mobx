import { useContext, useEffect, useState } from "react";
import { StyledBox, StyledImg } from "../styledComponents/styled-components"
import ProgressBar from 'react-bootstrap/ProgressBar';
import { getMaxValuesForWeapon } from "../http/weaponAPI";
import { AppContext } from "..";

export const WeaponProgress = (props) => {
    const [maximum, setMaximum] = useState(714)
    const { app } = useContext(AppContext)
    useEffect(() => {
        if (app.game === 'Genshin') {
            getMaxValuesForWeapon().then(res => {
                const e = res.data.find(e => e.id === props.id)
                if (e) {
                    setMaximum(e.weaponMat1Count + e.weaponMat2Count + e.weaponMat3Count + e.weaponMat4Count +
                        e.enemyMat1Count + e.enemyMat2Count + e.enemyMat3Count +
                        e.enemyWMat1Count + e.enemyWMat2Count + e.enemyWMat3Count
                    )
                }
                else {
                    if (props.stars === 3) { setMaximum(85) }
                    else if (props.stars === 4) { setMaximum(128) }
                    else if (props.stars === 5) { setMaximum(195) }
                }
            })
        }
    }, [])
    return (
        <StyledBox className="mt-3" display='flex' align='center' gap='10px'>
            <StyledImg width={'80px'} src={process.env.REACT_APP_API_URL + (app.game === 'Genshin' ? "/weapons/" : '/zzz/weapons/') + props.img}></StyledImg>
            <ProgressBar style={{ height: '25px', width: '100%', backgroundColor: 'red' }} now={100 / (app.game === 'Genshin' ? maximum : 67) * props.current}
                variant="warning" animated></ProgressBar>
        </StyledBox>)
}
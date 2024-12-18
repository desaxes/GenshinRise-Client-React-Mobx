import { observer } from "mobx-react-lite"
import { useContext, useEffect, useState } from "react"
import { getGems } from "../http/gemsAPI"
import { StyledBox } from "../styledComponents/styled-components"
import genshinGem from '../img/gems/genshin/gems.webp'
import honkaiGem from '../img/gems/honkai/gems.webp'
import zzzGem from '../img/gems/zzz/gems.webp'
import genshinCash from '../img/gems/genshin/cash.webp'
import honkaiCash from '../img/gems/honkai/cash.webp'
import zzzCash from '../img/gems/zzz/cash.webp'
import genshinRoll from '../img/gems/genshin/roll.webp'
import honkaiRoll from '../img/gems/honkai/roll.webp'
import zzzRoll from '../img/gems/zzz/roll.webp'
import { AppContext } from ".."
export const GemsRow = observer((props) => {
    const [savings, setSavings] = useState()
    const [tooltip, setTooltip] = useState(false)
    const { app } = useContext(AppContext)
    return (
        <StyledBox onMouseEnter={() => setTooltip(true)} onMouseLeave={() => setTooltip(false)} style={{ fontSize: '20px', backgroundColor: props.row.com ? (tooltip ? '#73001bdf' : '#73001b8a') : 'transparent', cursor: props.row.com && 'pointer' }} display='flex' color="yellow" width='100%' border={props.row.com ? 'yellow solid 1px' : 'yellow solid 1px'}>
            <StyledBox style={{ margin: '5px 0', borderRight: 'yellow solid 1px', fontWeight: 'bold' }} display='flex' jstf='center' width='15%'>
                {props.row.year}.{props.row.month}.{props.row.day}
            </StyledBox>
            <StyledBox align='center' gap='7px' style={{ margin: '5px 0', borderRight: 'yellow solid 1px', fontWeight: 'bold' }} display='flex' jstf='center' width='15%'>
                <img style={{ width: '25px', height: '25px' }} src={app.game === 'Genshin' ? genshinGem : (app.game === 'Honkai' ? honkaiGem : zzzGem)} />
                <div style={{ color: props.row?.gems > props.lastRow?.gems ? '#00c92c' : (props.row?.gems < props.lastRow?.gems ? 'red' : 'yellow') }}> {props.row.gems}</div>
            </StyledBox>
            <StyledBox align='center' gap='7px' style={{ margin: '5px 0', borderRight: 'yellow solid 1px', fontWeight: 'bold' }} display='flex' jstf='center' width='12%'>
                <img style={{ width: '25px', height: '25px' }} src={app.game === 'Genshin' ? genshinRoll : (app.game === 'Honkai' ? honkaiRoll : zzzRoll)} />
                <div style={{ color: props.row?.rolls > props.lastRow?.rolls ? '#00c92c' : (props.row?.rolls < props.lastRow?.rolls ? 'red' : 'yellow') }}>
                    {props.row.rolls}
                </div>
            </StyledBox>
            <StyledBox align='center' gap='7px' style={{ margin: '5px 0', borderRight: 'yellow solid 1px', fontWeight: 'bold' }} display='flex' jstf='center' width='15%'>
                <img style={{ width: '25px', height: '25px' }} src={app.game === 'Genshin' ? genshinCash : (app.game === 'Honkai' ? honkaiCash : zzzCash)} />
                <div style={{ color: props.row?.cash > props.lastRow?.cash ? '#00c92c' : (props.row?.cash < props.lastRow?.cash ? 'red' : 'yellow') }}>
                    {props.row.cash}
                </div>
            </StyledBox>
            <StyledBox align='center' gap='7px' style={{ margin: '5px 0', borderRight: 'yellow solid 1px', fontWeight: 'bold' }} display='flex' jstf='center' width='23%'>
                <img style={{ width: '25px', height: '25px' }} src={app.game === 'Genshin' ? genshinGem : (app.game === 'Honkai' ? honkaiGem : zzzGem)} />
                <div style={{ color: 'yellow' }}> {props.row.gems + (Math.floor(props.row.cash / (app.game === 'Genshin' ? 5 : 20)) * 160) + props.row.rolls * 160}</div>
                /
                <img style={{ width: '25px', height: '25px' }} src={app.game === 'Genshin' ? genshinRoll : (app.game === 'Honkai' ? honkaiRoll : zzzRoll)} />
                <div style={{ color: 'yellow' }}> {props.row.rolls + Math.floor(props.row.gems / 160) + Math.floor(props.row.cash / (app.game === 'Genshin' ? 5 : 20))}</div>
            </StyledBox>
            <StyledBox align='center' style={{ margin: '5px 0', fontWeight: 'bold' }} display='flex' jstf='center' width='20%'>
                <div style={{ color: '#00c92c' }}>{props.row.income}</div>
                <img style={{ width: '25px', height: '25px' }} src={app.game === 'Genshin' ? genshinGem : (app.game === 'Honkai' ? honkaiGem : zzzGem)} />
                {/* {props.row?.rolls - props.lastRow?.rolls != 0 && props.lastRow && <div>/</div>}
                {props.row?.rolls - props.lastRow?.rolls != 0 && props.lastRow &&
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
                        <div style={{ color: props.row?.rolls - props.lastRow?.rolls > 0 ? 'green' : 'red' }}>{props.row?.rolls - props.lastRow?.rolls}</div>
                        <img style={{ width: '25px', height: '25px' }} src={app.game === 'Genshin' ? genshinRoll : (app.game === 'Honkai' ? honkaiRoll : zzzRoll)} />
                    </div>}
                {props.row?.cash - props.lastRow?.cash != 0 && props.lastRow && <div>/</div>}
                {props.row?.cash - props.lastRow?.cash != 0 && props.lastRow &&
                    <div style={{ display: 'flex', alignItems: 'center', marginLeft: '5px' }}>
                        <div style={{ color: props.row?.cash - props.lastRow?.cash > 0 ? 'green' : 'red' }}>{props.row?.cash - props.lastRow?.cash}</div>
                        <img style={{ width: '25px', height: '25px' }} src={app.game === 'Genshin' ? genshinCash : (app.game === 'Honkai' ? honkaiCash : zzzCash)} />
                    </div>} */}
                /
                <div style={{ color: 'red', marginLeft: '5px' }}>{props.row.expense}</div>
                <img style={{ width: '25px', height: '25px' }} src={app.game === 'Genshin' ? genshinGem : (app.game === 'Honkai' ? honkaiGem : zzzGem)} />
            </StyledBox>
            {props.row.com && tooltip &&
                <StyledBox style={{
                    backgroundColor: '#73001b8a', width: '300px',
                    position: 'absolute', right: '-32%', zIndex: '100000',
                    border: '2px solid yellow', borderRadius: '12px',
                    padding: '5px', whiteSpace: 'normal', overflowWrap: 'anywhere'
                }}> {props.row.com}
                </StyledBox>}
        </StyledBox>
    )
})
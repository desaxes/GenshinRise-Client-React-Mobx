import React, { Suspense } from 'react'
import { Navigate } from "react-router-dom"
import { ADMIN_ROUTE, COLLECT_ROUTE, CHAR_ROUTE, MAIN_PAGE, WEAPON_ROUTE, RISE_ROUTE, ROLL_ROUTE, STAT_ROUTE, RES_ROUTE, BANNER_ROUTE, ARTS_ROUTE } from "./utils/constants"
import { Arts } from './pages/arts'

const Admin = React.lazy(() => import("./pages/admin"))
const Collection = React.lazy(() => import("./pages/collection"))
const Main = React.lazy(() => import("./pages/main"))
const Characters = React.lazy(() => import("./pages/characters"))
const Weapons = React.lazy(() => import("./pages/weapons"))
const Rise = React.lazy(() => import("./pages/rise"))
const Resources = React.lazy(() => import("./pages/resources"))
const Rolls = React.lazy(() => import("./pages/rolls"))
const Statistic = React.lazy(() => import("./pages/statistic"))
const Banners = React.lazy(() => import("./pages/banners"))

export const publicRoutes = [
    {
        path: ADMIN_ROUTE,
        component: <Suspense><Admin /></Suspense>
    },
    {
        path: MAIN_PAGE,
        component: <Suspense><Main /></Suspense>
    },
    {
        path: CHAR_ROUTE,
        component: <Suspense><Characters /></Suspense>
    },
    {
        path: WEAPON_ROUTE,
        component: <Suspense><Weapons /></Suspense>
    },
    {
        path: COLLECT_ROUTE,
        component: <Suspense><Collection /></Suspense>
    },
    {
        path: RISE_ROUTE,
        component: <Suspense><Rise /></Suspense>
    },
    {
        path: RES_ROUTE,
        component: <Suspense><Resources /></Suspense>
    },
    {
        path: ROLL_ROUTE,
        component: <Suspense><Rolls /></Suspense>
    },
    {
        path: STAT_ROUTE,
        component: <Suspense><Statistic /></Suspense>
    },
    {
        path: BANNER_ROUTE,
        component: <Suspense><Banners /></Suspense>
    },
    {
        path: ARTS_ROUTE,
        component: <Suspense><Arts /></Suspense>
    },
    {
        path: '*',
        component: <Navigate to={MAIN_PAGE} />
    }
]
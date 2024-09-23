import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { publicRoutes } from '../routes'
export const AppRouter = () => {
    return (
        <div style={{ marginTop: '120px' }}>
            <Routes>
                {publicRoutes.map(({ path, component }) =>
                    <Route key={path} path={path} element={component} />)}
            </Routes>
        </div>
    )
}
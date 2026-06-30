import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Landing from './pages/Landing'
import TodaysWalk from './pages/TodaysWalk'
import DayView from './pages/DayView'
import Unsubscribe from './pages/Unsubscribe'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="walk" element={<TodaysWalk />} />
        <Route path="walk/day/:day" element={<DayView />} />
        <Route path="unsubscribe" element={<Unsubscribe />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

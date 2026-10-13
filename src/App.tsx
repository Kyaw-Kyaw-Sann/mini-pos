import { Route, Routes } from 'react-router-dom'

function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="rounded-lg bg-white p-8 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Mini POS</h1>
        <p className="mt-2 text-slate-600">Project setup is ready.</p>
      </div>
    </main>
  )
}

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <p className="text-xl font-semibold">Page not found</p>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App

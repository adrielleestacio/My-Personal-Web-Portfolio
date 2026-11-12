import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Home } from "./pages/Home"
import { NotFound } from "./pages/NotFound"
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {/* Cookieless page counts and real-user Core Web Vitals. Both only load
          their script on Vercel, so local dev stays untouched. */}
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default App

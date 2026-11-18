import { lazy, Suspense } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Home } from "./pages/Home"
import { Toaster } from "@/components/ui/toaster"

// Home is the page nearly every visitor sees, so it ships in the first
// chunk. These two are fetched only by the person who actually opens them.
const HabitAICaseStudy = lazy(() =>
  import("./pages/HabitAICaseStudy").then((m) => ({
    default: m.HabitAICaseStudy,
  }))
)
const NotFound = lazy(() =>
  import("./pages/NotFound").then((m) => ({ default: m.NotFound }))
)

// Both lazy routes start at the top of a fresh page, so a blank screen for
// the one frame it takes to fetch the chunk reads as the page loading
// rather than as something breaking.
const RouteFallback = () => <div className="min-h-screen bg-background" />

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/projects/habitai" element={<HabitAICaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>

      {/* Cookieless page counts and real-user Core Web Vitals. Both only load
          their script on Vercel, so local dev stays untouched. */}
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default App

import { Suspense } from "react"
import {BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Router from "@/pages"
import { Spinner } from "@/shared/components"



function App() {

  return (
    <>
    <Suspense fallback={<Spinner/>}>
      <BrowserRouter>
          <Router/>
      </BrowserRouter>
      <ToastContainer position='bottom-right' />
    </Suspense>
    </>
  )
}

export default App

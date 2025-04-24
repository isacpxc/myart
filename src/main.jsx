import {
  createHashRouter,
  RouterProvider,
} from "react-router";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './nft-block.css'
import App from './App.jsx'
import Profile from "./Profile.jsx"
import Settings from "./Settings.jsx"
import Help from "./Help.jsx"
import ErrorPage from "./ErrorPage.jsx"

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    // children: [
    //   {
    //     path: "profile",
    //     element: <Profile/>
    //   }
    // ]
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/settings",
    element: <Settings />
  },
  {
    path: "/help",
    element: <Help />
  },
  {
    path: "/error",
    element: <ErrorPage />
  }

]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)

import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Location from './pages/Location'
import Sos from './pages/Sos'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Navbar from './components/Navbar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Location />,
  },
  {
    path: "/sos",
    element: <Sos />,
  },
]);

const App = () => {
  return (
    <ChakraProvider>
      <RouterProvider router={router}>
        {router}
      </RouterProvider>
    </ChakraProvider>
  )
}

export default App

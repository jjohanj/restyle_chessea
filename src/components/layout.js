import React from "react"
import { Box, Grid } from "@chakra-ui/core"
import Header from "./header"
import Menu from "./menu"
import "../assets/style.css"

const Layout = ({ children }) => (
  
  <>
    <Header />
    <main className="container">
      {children}
    </main>
  </>
)

export default Layout

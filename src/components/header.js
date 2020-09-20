import React from "react"
import { Link } from "gatsby"
import GatsbyLogo from "../assets/svg/gatsby.inline.svg"
import './header.css'
import {FaChess} from "react-icons/fa"
import {FaStar} from "react-icons/fa"

export default () => (
  <header className="">
    <div className="grid">
    <div className="meta"></div>
      <div className="navigation">
        <div className="container">
          <div className="logo"><span><Link to="/">CHESS<span className="neon">EA</span></Link></span></div>
          <ul>
          <li><Link to="/artikelen">Verslagen</Link ></li>
          <li><Link to="/partijen">Partijen</Link ></li>
          </ul>

        </div>
      </div>
    <div className="bottom-bar"></div>
    </div>

  </header>
)

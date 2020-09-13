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
          <ul>
            <FaStar className="star"/><li><Link to="/artikelen">Verslagen</Link ></li><FaStar className="star"/>
          </ul>
          <div className="logo"><span><Link to="/">CHESS<span className="neon">EA</span></Link></span>
          <div className="stars"><FaStar className="star"/><FaStar className="star"/><FaStar className="star"/></div>
          <FaChess className="fa-chess" /></div>
          <ul>
          </ul>
        </div>
      </div>
    <div className="bottom-bar"></div>
    </div>

  </header>
)

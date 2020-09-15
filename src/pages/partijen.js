import React, {useEffect, useState} from 'react'
import { Heading, Box } from '@chakra-ui/core'
import Image from '../components/image'
import Header from '../components/header'
import {graphql, useStaticQuery, Link, navigate } from "gatsby"
import Img from "gatsby-image"
import { normalizePath } from "../utils/get-url-path"
import "../assets/darkmode.css"
import Layout from '../components/layout'
import {FaExternalLinkAlt} from "react-icons/fa"

function Partijen() {

  const data = useStaticQuery(graphql`
    query {
      allWpTag(sort: {fields: name}) {
        edges {
          node {
            name
          }
        }
      }
      allWpPost(sort: {fields: databaseId, order: DESC}) {
        edges {
          node {
            title
            slug
            uri
            date
            databaseId
            categories {
              nodes {
                name
              }
            }
            tags {
              nodes {
                name
              }
            }
            featuredImage {
                node {
                  localFile {
                    base
                  }
                }
              }
            }
          }
        }
      }

  `);

  var clickLink = (i) => {
    navigate(normalizePath(i));
  }


  var blog = data.allWpPost.edges.filter(item => item.node.categories.nodes.some(obj => obj.name === "game")
).map((item, i) => {
  return (
    <>
    <Image imgName={item.node.featuredImage.node.localFile.base} />
    <div>
    <Link to={normalizePath(item.node.uri)}><h2>{item.node.title}</h2></Link>
      <p className="date">{item.node.date}</p>
      <FaExternalLinkAlt />
    </div>
    </>
  )
});

  return (
    <>
      <Layout >
        <div className="game-wrapper">
          <div className="cards">
          {blog}
          </div>
        </div>
      </Layout>
    </>

  )
}
export default Partijen

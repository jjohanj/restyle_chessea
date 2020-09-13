import React, {useEffect} from 'react'
import { Heading, Box } from '@chakra-ui/core';
import Image from '../components/image'
import Header from '../components/header'
import {graphql, useStaticQuery, Link, navigate } from "gatsby"
import Img from "gatsby-image"
import { normalizePath } from "../utils/get-url-path"
import "../assets/darkmode.css"
import Layout from '../components/layout';

export default () => {

  const data = useStaticQuery(graphql`
    query {
      allWpPost(limit: 7, sort: {fields: databaseId}) {
        edges {
          node {
            title
            slug
            uri
            date
            databaseId
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


  var articles = data.allWpPost.edges.map((item, i) => {
    return (
      <article onClick = {() => clickLink(item.node.uri)} key={i}>
        <Link to={normalizePath(item.node.uri)}><h2>{item.node.title}</h2></Link>
        <Image imgName={item.node.featuredImage.node.localFile.base} />
        <div>
        <p className="date">{item.node.date}</p>
        <span className="btn btn-primary"> Lees meer </span>
        </div>
      </article>
    )
  }
)

  return (
    <>
      <Layout >
        <div className="card-wrapper home">
          <div className="cards">
            {articles}
          </div>
          <Link className="btn btn-light btn-lg" to="/artikelen">Alle verslagen</Link >
        </div>
      </Layout>
    </>

  )
}

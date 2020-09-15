import React, {useEffect, useState} from 'react'
import { Heading, Box } from '@chakra-ui/core';
import Image from '../components/image'
import Header from '../components/header'
import {graphql, useStaticQuery, Link, navigate } from "gatsby"
import Img from "gatsby-image"
import { normalizePath } from "../utils/get-url-path"
import "../assets/darkmode.css"
import Layout from '../components/layout';

function Artikelen({location}) {

  const [tag, setTag] = useState();
  const [filterMenu, setFilterMenu] = useState();
  const [articles, setArticles] = useState([]);

  const { state = {} } = location;
  const { articleTag } = state;

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

  useEffect(() => {
    setFilterMenu(data.allWpTag.edges);
    setArticles(data.allWpPost.edges);

    if (tag && tag != "all" ) {
      setArticles(data.allWpPost.edges.filter(item => {
         return item.node.tags.nodes.some(obj => obj.name === tag);
     })
    );
    }
    else if (tag === "all") {
      setArticles(data.allWpPost.edges);
    }
    else if ( articleTag ) {
       setArticles(data.allWpPost.edges.filter(item =>{
         return item.node.tags.nodes.some(obj => obj.name === articleTag)
     }));
   }
 },[tag, articleTag]
  );

  var clickLink = (i) => {
    navigate(normalizePath(i));
  }

  var menu = null;
  var options = null;
  var blog = null;

  if (filterMenu) {
    options = filterMenu.map((item, i) => {
    return (
       <React.Fragment key={i}><option value={item.node.name}>{item.node.name}</option>
      </React.Fragment>
    )
    });
     menu = filterMenu.map((item, i) => {
      return (
         <React.Fragment key={i}><li><button className="btn btn-light" onClick={() => setTag(item.node.name)}>{item.node.name}</button></li>
        </React.Fragment>
      )
    });
  }

  var blog = articles.filter(item => item.node.categories.nodes.some(obj => obj.name !== "game")
).map((item, i) => {
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
);

  return (
    <>
      <Layout >
        <div className="blog-wrapper">
          <ul className="tags">
                <li><button className="btn btn-light"onClick={() => setTag("all")}>Toon alles</button></li>{menu}</ul>
          <div className="cards">
            {blog}
          </div>
        </div>
      </Layout>
    </>

  )
}
export default Artikelen

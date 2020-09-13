import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { normalizePath } from "../../utils/get-url-path"
import Comments from "../../components/comments1"
import Layout from "../../components/layout"
import CommentsList from "../../components/commentslist"
import '../../components/blogpost.css'

function BlogPost({ data }) {
  const { nextPage, previousPage, page } = data
  const { title, content, featuredImage, databaseId, tags } = page

var tag = null;
if (tags) {
   tag = tags.nodes.map((item, i) => {
    return (
      <li key={i}><Link className="btn btn-light" key={i} to={`/artikelen`}
            state={{ articleTag: item.name }}>{item.name}</Link></li>
    )
  });
}

  return (
  <Layout>
      <article className="blogpost">
        <Img fluid={featuredImage.node.remoteFile.childImageSharp.fluid} />
        <div className="content">
        <h1>{title}</h1>
        <p dangerouslySetInnerHTML={{ __html: content }} />
        <ul>{tag}</ul>
        </div>
      </article>
      <div className="btn-group">
      {!!nextPage && (
        <Link className="btn btn-light btn-lg" to={normalizePath(nextPage.uri)}>Next: {nextPage.title}</Link>
      )}
      <br />
      {!!previousPage && (
        <Link className="btn btn-light btn-lg" to={normalizePath(previousPage.uri)}>
          Previous: {previousPage.title}
        </Link>
      )}
      </div>
      <div className="comments-wrapper">
        <Comments wpId={databaseId} />
      </div>
      <div className="comments-wrapper">
        <CommentsList wpId={databaseId} />
      </div>
    </Layout>
  )
}

export default BlogPost

import React, { useState, useEffect } from "react"
import axios from "axios"

function Commentslist (props) {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      var result = await axios(
        `https://flonxchess.nl/wp-json/wp/v2/comments/?per_page=50&post=${props.wpId}`,
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  var comments = data.reverse().map((item, i) => {
  return (
    <div className="comment" key={i} dangerouslySetInnerHTML={{__html: "<p class='comment-author'>" + item.author_name + ":</p>" + item.content.rendered }}/>
    )
  })

  return (
    <div className="comments-list">{comments}</div>
  )
}
export default Commentslist

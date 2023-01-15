import React from 'react'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'

const Image = ({ data }) => <Img fixed={data.logo.childImageSharp.fixed} />

export default () => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "logo-black.png" }) {
          childImageSharp {
            fixed(width: 103, height: 27) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => <Image data={data} />}
  />
)

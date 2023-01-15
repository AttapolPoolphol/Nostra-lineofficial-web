import React from 'react'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'

const Image = ({ data }) => <Img fixed={data.logo.childImageSharp.fixed} />

export default () => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "logo-white.png" }) {
          childImageSharp {
            fixed(width: 179, height: 47) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => <Image data={data} />}
  />
)

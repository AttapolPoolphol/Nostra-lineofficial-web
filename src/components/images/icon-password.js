import React from 'react'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'

const Image = ({ data }) => <Img fixed={data.logo.childImageSharp.fixed} />

export default () => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "icon-password.png" }) {
          childImageSharp {
            fixed(width: 18, height: 18) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    `}
    render={data => <Image data={data} />}
  />
)

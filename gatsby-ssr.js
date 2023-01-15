/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from 'react'
import { Provider } from 'react-redux'

import createStore from './src/state/store'

// eslint-disable-next-line react/prop-types
const wrapRootElement = ({ element }) => {
  const store = createStore()

  return <Provider store={store}>{element}</Provider>
}

export { wrapRootElement }

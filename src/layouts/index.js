import React from "react"
import Link from "gatsby-link"
import get from "lodash/get"

import styles from '../css/index.scss'


class Template extends React.Component {
  render() {
    const { children } = this.props

    return (
      <div>
        {children()}
      </div>
    )
  }
}

Template.propTypes = {
  location: React.PropTypes.object,
  route: React.PropTypes.object,
}

export default Template
import React from 'react'
import PropTypes from 'prop-types'

const criticalStyles = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  // FIXME: are these critical styles?
  width: '2px',
  backgroundColor: 'green'
}

// REVIEW: might want to memoize this as it creates a new object
// in each render which is passed to React component
const createMarkerStylesWithLeftOffset = leftOffset => ({
  ...criticalStyles,
  left: leftOffset
})

// FIXME: this is used in all marker implementations
// lift into single spot and memoize?
// eslint-disable-next-line
const defaultCustomMarkerRenderer = ({ styles }) => (
  <div style={styles} data-testid="default-customer-marker-id" />
)

class CustomMarker extends React.Component {
  static propTypes = {
    getLeftOffsetFromDate: PropTypes.func.isRequired,
    renderer: PropTypes.func,
    date: PropTypes.number.isRequired
  }

  static defaultProps = {
    renderer: defaultCustomMarkerRenderer
  }
  render() {
    const { date } = this.props
    const leftOffset = this.props.getLeftOffsetFromDate(date)

    const styles = createMarkerStylesWithLeftOffset(leftOffset)
    return this.props.renderer({ styles, date })
  }
}

export default CustomMarker
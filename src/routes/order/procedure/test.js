import React, {Component} from 'react'

class Template extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const props = this.props
    return (
      <div className="template">this is the template file</div>
    )
  }
}

export default Template
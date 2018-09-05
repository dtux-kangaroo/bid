import React from 'react'
class Welcome extends React.PureComponent{
  render(){
    const {name} = this.props;
    return (<div>Hello {name}</div>)
  }
}
export default Welcome
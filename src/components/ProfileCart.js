import React from "react";
import { withRouter } from "react-router-dom";
import { Authentication } from "../shared/AuthenticationContext";


const ProfileCart = (props) => {

  
    const pathUsername = props.match.params.username;
        const loggedUsername = props.username;
        let message = "We cannot edit";
        if (pathUsername === loggedUsername) {
          message = "We can edit";
        }
        return (
          <div>
            <div>{message}</div>
          </div>
        )
  
  
};


class ProfileCartContextWrapper extends React.Component {
  static contextType = Authentication;
  render() {
    return (
      <ProfileCart {...this.props} username = {this.context.state.username}/>
    )
  }
}


export default withRouter(ProfileCartContextWrapper);

import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
// import { Authentication } from "../shared/AuthenticationContext";

const ProfileCart = (props) => {
  const pathUsername = props.match.params.username;
  let message = "We cannot edit";
  if (pathUsername === props.loggedUsername) {
    message = "We can edit";
  }
  return (
    <div>
      <div>{message}</div>
    </div>
  );
};

// class ProfileCartContextWrapper extends React.Component {
//   // static contextType = Authentication;
//   render() {
//     return (
//       <ProfileCart {...this.props} username={this.context.state.username} />
//     );
//   }
// }

const mapStateToProps = (store) => {
  return {
    loggedUsername: store.username,
  };
};
export default connect(mapStateToProps)(withRouter(ProfileCart));

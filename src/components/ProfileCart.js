import React from "react";
import { withRouter } from "react-router-dom";

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
  );
};

export default withRouter(ProfileCart);

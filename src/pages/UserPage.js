import React from "react";
import ProfileCart from "../components/ProfileCart";

const UserPage = (props) => {
  return (
    <div className="container">
      <ProfileCart username={props.username} />
    </div>
  );
};

export default UserPage;

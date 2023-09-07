import axios from "axios";
import React, { Component } from "react";

export function withApiProgress(WrappedComponent, apiPath) {
  return class extends Component {
    static displayName = `ApiProgress(${
      WrappedComponent.displayName || WrappedComponent.name || "Component"
    })`;

    state = {
      pendingApiCall: false,
    };
    componentDidMount() {
      axios.interceptors.request.use((request) => {
        this.updateApiCallFor(request.url, true);
        return request;
      });

      axios.interceptors.response.use(
        (response) => {
          this.updateApiCallFor(response.config.url, false);
          return response;
        },
        (error) => {
          this.updateApiCallFor(error.config.url, false);
          throw error;
        }
      );
    }

    updateApiCallFor = (path, inProgress) => {
      if (path === apiPath) {
        this.setState({ pendingApiCall: inProgress });
      }
    };
    render() {
      const { pendingApiCall } = this.state;

      return (
        <WrappedComponent pendingApiCall={pendingApiCall} {...this.props} />
        // <div>
        //   {React.cloneElement(children, {
        //     pendingApiCall: pendingApiCall,
        //   })}
        // </div>
      );
    }
  };
}

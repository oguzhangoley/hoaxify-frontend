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
      this.requestInterceptor = axios.interceptors.request.use((request) => {
        console.log("running request interceptor", apiPath);
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

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.requestInterceptor);
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

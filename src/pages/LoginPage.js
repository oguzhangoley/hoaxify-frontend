import React, { Component } from "react";
import Input from "../components/Input";
import { login } from "../api/apiCalls";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { connect } from "react-redux";
import { loginHandler, loginSuccess } from "../redux/authActions";
// import { Authentication } from "../shared/AuthenticationContext";

class LoginPage extends Component {
  // static contextType = Authentication;

  state = {
    username: null,
    password: null,
    error: null,
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value, error: null });
  };

  onClickLogin = async (e) => {
    e.preventDefault();
    const { username, password } = this.state;
    const { history, dispatch } = this.props;
    const { push } = history;
    const creds = {
      username,
      password,
    };
    this.setState({
      error: null,
    });
    try {
      // const response = await login(creds);

      // const authState = {
      //   ...response.data,
      //   password: password,
      // };
      // dispatch(loginSuccess(authState));
      await dispatch(loginHandler(creds));
      push("/");
    } catch (err) {
      this.setState({
        error: "asd", //err.response.data.message,
      });
    }
  };

  render() {
    const { t, pendingApiCall } = this.props;
    const { username, password, error } = this.state;
    const buttonEnabled = username && password;
    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t("Login")}</h1>
          <Input
            label={t("Username")}
            name="username"
            onChange={this.onChange}
          />
          <Input
            label={t("Password")}
            name="password"
            type="password"
            onChange={this.onChange}
          />

          {error && <div className="alert alert-danger">{error}</div>}
          <div className="text-center" style={{ padding: 20 }}>
            <ButtonWithProgress
              onClick={this.onClickLogin}
              disabled={!buttonEnabled || pendingApiCall}
              pendingApiCall={pendingApiCall}
              text={t("Login")}
            />
          </div>
        </form>
      </div>
    );
  }
}

const loginPageWithTranslation = withTranslation()(LoginPage);
const loginPageWithApiProgress = withApiProgress(
  loginPageWithTranslation,
  "/api/v1/auth"
);

export default connect()(loginPageWithApiProgress);

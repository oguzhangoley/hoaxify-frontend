import React, { Component } from "react";
import Input from "../components/Input";
import { login } from "../api/apiCalls";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";

class LoginPage extends Component {
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
    const creds = {
      username,
      password,
    };
    this.setState({
      error: null,
    });
    try {
      await login(creds);
    } catch (err) {
      this.setState({
        error: err.response.data.message,
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
export default loginPageWithApiProgress;

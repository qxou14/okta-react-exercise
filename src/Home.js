import React from "react";
import { withOktaAuth } from "@okta/okta-react";

//withOktaAuth provides  oktaauth object and authstate via props to Home
//because I wrap it with home.
//like this -> const { oktaAuth, authState } = this.props;
function Home(props) {
  const login = async () => {
    await props.oktaAuth.signInWithRedirect();
    console.log("login");
  };
  const logout = async () => {
    await props.oktaAuth.signOut();
    console.log("logout");
  };

  let body = null;

  if (props.authState?.isAuthenticated) {
    body = (
      <div className="Buttons">
        <button onClick={() => logout()}>Logout</button>
        {/* Replace me with your root component. */}
      </div>
    );
  } else {
    body = (
      <div className="Buttons">
        <button onClick={() => login()}>Login</button>
      </div>
    );
  }

  return <div>{body}</div>;
}

export default withOktaAuth(Home);

import "./Form.css";
import { NavLink } from "react-router-dom";
import Button from "../../../shared/UIelemets/Button";

const Form = (props) => {
  return (
    <div className="formHolder">
      <div className="content">
        <h1>{props.credentials.heading}</h1>

        <form onSubmit={props.functionToExecute}>
          <input
            type="text"
            placeholder="Email"
            value={props.email}
            onChange={(e) => props.setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}
          />
          <NavLink to={`/${props.credentials.link}`} className="nav-item">
            {props.credentials.navlinkText}
          </NavLink>

          <Button
            className="formButton"
            type="submit"
            text={props.credentials.buttonText}
          />
        </form>
      </div>
    </div>
  );
};

export default Form;

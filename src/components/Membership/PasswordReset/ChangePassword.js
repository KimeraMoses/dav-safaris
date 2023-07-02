import React, { useState } from "react";
import classes from "../Membership.module.css";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  Button,
} from "@material-ui/core";
import { Col, Container, Row } from "react-bootstrap";
import DavLogo from "../../AppBar/DavLogo";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import { DAV_APIS } from "../../../Adapter";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authenticationSuccess } from "../../../store/Slices/authSlice";
import { SaveTokenInLocalStorage } from "../../../store/Actions/AuthActions";
import { DAV_ROLES } from "../../../constants";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [password, showPassword] = useState(false);
  const [values, setValues] = useState({
    password: "",
    confirmPassword: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!navigator.onLine) {
      toast.error("Please check your internet connection and try again");
      return;
    }
    if (values.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await DAV_APIS.auth.resetPassword(
        resetToken,
        values.password
      );
      if (res?.response?.status === 400) {
        toast.error("Token expired, please request a new one");
        navigate("/password-reset");
        setLoading(false);
        return;
      }
      if (res.status === 200) {
        toast.success("Password reset successful");
        const data = res.data;
        dispatch(
          authenticationSuccess({
            data,
            user: data.user,
            token: data.token,
          })
        );
        SaveTokenInLocalStorage(dispatch, data);
        if (data.user.role === DAV_ROLES.AGENT) {
          navigate("/agent-dashboard");
        } else {
          navigate("/dashboard/user");
        }
      }
      setLoading(false);
    } catch (error) {
      toast.error("Something went wrong, please try again");
      setLoading(false);
    }
  };

  return (
    <Container fluid>
      <section className={classes.gpa__registration_section}>
        <Paper className={classes.dav__membership_form_wrapper}>
          <div className={classes.dav__membership_form_wrapper_inner}>
            <div className={classes.dav__membership_row}>
              <div
                className={`col-xs-12 col-sm-6 ${classes.dav__membership_form_side}`}
              >
                <div className={classes.dav__registration_hero}>
                  <DavLogo />

                  <h1>RESET PASSWORD</h1>
                  <p>Enter your new preferred password and confirm it</p>
                </div>
              </div>
              <div
                className={`col-xs-12 col-sm-6 ${classes.dav__membership_form}`}
              >
                <form onSubmit={handleSubmit}>
                  <FormControl
                    className={classes.gpa__form_input_field}
                    variant="filled"
                    size="small"
                    fullWidth
                  >
                    <InputLabel htmlFor="password">New Password</InputLabel>
                    <FilledInput
                      type={password ? "text" : "password"}
                      name="password"
                      onChange={handleChange("password")}
                      required
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => showPassword(!password)}
                            edge="end"
                          >
                            {password ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <FormControl
                    className={classes.gpa__form_input_field}
                    variant="filled"
                    size="small"
                    fullWidth
                  >
                    <InputLabel htmlFor="password">
                      Confirm New Password
                    </InputLabel>
                    <FilledInput
                      type={password ? "text" : "password"}
                      name="confirmPassword"
                      onChange={handleChange("confirmPassword")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => showPassword(!password)}
                            edge="end"
                          >
                            {password ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <Row>
                    <Col
                      sm={{ span: 8, offset: 2 }}
                      xs={{ span: 10, offset: 1 }}
                    >
                      <Button
                        variant="contained"
                        fullWidth
                        color="primary"
                        type="submit"
                        disabled={loading}
                        className={classes.dav__membership_submit_button}
                      >
                        {loading ? "Resetting..." : "Reset Password"}
                      </Button>
                    </Col>
                  </Row>
                </form>
                <div className={classes.gpa__register_form_footer}>
                  Remembered password?
                  <span style={{ marginLeft: 5 }}>
                    <Link to="/login">Login</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </section>
    </Container>
  );
};

export default ChangePassword;

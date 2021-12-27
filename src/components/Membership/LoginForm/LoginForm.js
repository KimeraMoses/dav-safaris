import React, { useEffect, useState } from "react";
import classes from "../Membership.module.css";
import { useSelector, useDispatch } from "react-redux";
import {
  FilledInput,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
  Button,
} from "@material-ui/core";
import { Col, Container, Row } from "react-bootstrap";
import DavLogo from "../../AppBar/DavLogo";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Link,useNavigate } from "react-router-dom";
import { login } from "../../../store/Actions/AuthActions";

const LoginForm = () => {
  const message = useSelector((state) => state.auth.message);
  const isLoading = useSelector(state=>state.auth.isLoading)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    password: "",
    email: "",
    showPassword: false,
  });

  // const action = (key) => (
  //   <Button
  //     onClick={() => {
  //       closeSnackbar(key);
  //     }}
  //   >
  //     OK
  //   </Button>
  // );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: event.target.value });

    if (name === "email" && value.email !== "undefined") {
      setError("");
      let pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!pattern.test(value)) {
        setError("Please enter valid email address.");
      }
    }

    if (name === "password") {
      setError("");
      if (value.length < 6) {
        setError("Password must be atleast 6 characters");
      }
    }
    setError("");
  };

  const LoginHandler = async (e) => {
    e.preventDefault();

    if (values.email.length < 5) {
      return setError("A valid email is required to login");
    }

    if (values.password.length < 6) {
      return setError("Password must be atleast 6 characters");
    }

    try {
      setError("");
      await dispatch(login(values.email, values.password));
      setValues({ password: "" });
      setValues({ email: "" });
      navigate('/dashboard/user')
      // enqueueSnackbar("You have successfully logged in", {
      //   variant: "success",
      //   action,
      //   anchorOrigin: {
      //     vertical: "top",
      //     horizontal: "center",
      //   },
      //   TransitionComponent: Slide,
      // });
    } catch (error) {
      setError(
        "Failed to login, Please verify your account first or double check your credentials if account is already verified"
      );
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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

                  <h1>SIGN IN</h1>
                  <p>
                    Enter your email and password to signin into Dav Safaris
                    Uganda
                  </p>
                </div>
              </div>
              <div
                className={`col-xs-12 col-sm-6 ${classes.dav__membership_form}`}
              >
                <form onSubmit={LoginHandler}>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="filled"
                    value={values.email}
                    type="email"
                    onChange={handleChange}
                    name="email"
                    size="small"
                    className={classes.gpa__form_input_field}
                  />
                  <FormControl
                    className={classes.gpa__form_input_field}
                    variant="filled"
                    size="small"
                    fullWidth
                  >
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <FilledInput
                      type={values.showPassword ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <Row>
                      <Col
                        md={12}
                        xs={12}
                        className={classes.gpa__password_reset_link_wrapper}
                      >
                        <Link to="/password-reset"> Forgot Password? </Link>
                      </Col>
                    </Row>
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
                        className={classes.dav__membership_submit_button}
                      >
                        {isLoading? 'Logging in...': 'Login'}
                      </Button>
                    </Col>
                  </Row>
                </form>
                <div className={classes.gpa__register_form_footer}>
                  Don't have account yet?
                  <span style={{ marginLeft: 5 }}>
                    <Link to="/register">Register</Link>
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

export default LoginForm;

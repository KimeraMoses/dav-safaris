import React, { useEffect, useState } from "react";
import classes from "../Membership.module.css";
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
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [password, showPassword] = useState(false);
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
                <form>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="filled"
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
                      type={password ? "text" : "password"}
                      name="password"
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => showPassword(!password)}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {password ? <Visibility /> : <VisibilityOff />}
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
                        Login
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

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

const RegisterForm = () => {
  const [password, showPassword] = useState(false);
  useEffect(()=>{window.scrollTo(0, 0)},[])
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

                  <h1>SIGN UP</h1>
                  <p>
                    Manage your tours at the comfort of your home by creating
                    your account with Dav Safaris Uganda
                  </p>
                </div>
              </div>
              <div
                className={`col-xs-12 col-sm-6 ${classes.dav__membership_form}`}
              >
                <form>
                  <TextField
                    fullWidth
                    label="User Name"
                    variant="filled"
                    name="text"
                    size="small"
                    className={classes.gpa__form_input_field}
                  />
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
                  </FormControl>
                  <FormControl
                    className={classes.gpa__form_input_field}
                    variant="filled"
                    size="small"
                    fullWidth
                  >
                    <InputLabel htmlFor="password">Comfirm Password</InputLabel>
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
                        Register
                      </Button>
                    </Col>
                  </Row>
                </form>
                <div className={classes.gpa__register_form_footer}>
                  Already have an account?
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

export default RegisterForm;

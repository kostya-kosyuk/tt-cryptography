import { Container, Box, Typography, TextField, Button, ButtonGroup, CircularProgress } from "@mui/material";
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loginAction, registerAction } from "../../store/asyncActions.ts/authAsyncAction";
import { FormEvent, useMemo, useState } from "react";
import * as Yup from "yup";
import { AccountCircle } from "@mui/icons-material";

const loginValidationSchema = Yup.object().shape({
    login: Yup.string()
        .required("Email or Login is required")
        .min(6, "Login must be between 6 and 64 characters")
        .max(64, "Login must be between 6 and 64 characters")
        .matches(/^[a-zA-Z0-9@._-]+$/, "Login may only contain letters, numbers, '@.-_'")
});

const passwordValidationSchema = Yup.object().shape({
    password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be between 6 and 32 characters")
        .max(32, "Password must be between 6 and 32 characters")
});

const Auth = () => {
    const dispatch: ThunkDispatch<RootState, null, AnyAction> = useAppDispatch();

    const isLoading = useAppSelector(state => state.auth.isLoading);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const requestError = useAppSelector(state => state.auth.errorMsg);

    const loginError = useMemo(() => {
        if (login === '') {
            return;
        }

        try {
            loginValidationSchema.validateSync({ login}, { abortEarly: true });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const error = err.errors[0];

                return error;
            }

            return null;
        }
        return null;
    }, [login]);

    const passwordError = useMemo(() => {
        if (password === '') {
            return;
        }
        try {
            passwordValidationSchema.validateSync({ password }, { abortEarly: true });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const error = err.errors[0];

                return error;
            }

            return null;
        }
        return null;
    }, [password]);

    const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (loginError !== null || passwordError !== null) {
            return;
        }

        const e = event.nativeEvent as SubmitEvent;

        if (!e.submitter) {
            return;
        }

        if (e.submitter.id === 'signUp') {
            dispatch(registerAction(login, password));
        }

        if (e.submitter.id === 'signIn') {
            dispatch(loginAction(login, password));
        }
    };

    return (
        <Container
            component="main"
            maxWidth="xs"
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Box
                maxHeight={'50px'}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Box
                    sx={{
                        position: 'relative',
                    }}
                >
                    <AccountCircle
                        sx={{
                            fontSize: "50px",
                        }}
                    />
                    {isLoading &&
                        <CircularProgress
                            size={55}
                            sx={{
                                color: 'light-blue',
                                position: 'absolute',
                                top: -3,
                                left: -2,
                                zIndex: 1,
                            }}
                        />}
                </Box>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleFormSubmit}
                    noValidate
                    sx={{
                        position: 'relative',
                        mt: 1
                    }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="standard-error-helper-text"
                        label="Email or Login"
                        name="login"
                        autoComplete="email"
                        autoFocus
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        error={Boolean(loginError)}
                        helperText={loginError}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="standard-error-helper-text"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        error={Boolean(passwordError)}
                        helperText={passwordError}
                    />
                    <ButtonGroup
                        disableElevation
                        aria-label="Disabled elevation buttons"
                        fullWidth
                        variant="contained"
                    >
                        <Button type="submit" id={'signUp'} sx={{ mt: 2, mb: 2 }}>
                            Sign Up
                        </Button>
                        <Button type="submit" id={'signIn'} sx={{ mt: 2, mb: 2 }}>
                            Sign In
                        </Button>
                    </ButtonGroup>
                    {requestError.length !== 0 &&
                        <Typography
                            color={'error.main'}
                            sx={{
                                position: 'absolute',
                                bottom: -12,
                                ml: 1
                            }}
                        >
                            {requestError[0]}
                        </Typography>}
                </Box>
            </Box>
        </Container>
    );
};

export default Auth;

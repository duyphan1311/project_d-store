import { useEffect, useState } from 'react'
import { isAuthenticated } from '../handlers/authHandler'
import { useNavigate } from 'react-router-dom'
// import bgImage from '../assets/images/login-bg.png'
import { Box, Card, FormControl, TextField, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import authApi from '../api/authApi'

const Login = () => {
    const navigate = useNavigate()
    const [loginErr, setLoginErr] = useState()
    const [phone, setPhone] = useState('')
    const [phoneErr, setPhoneErr] = useState(false)
    const [password, setPassword] = useState('')
    const [passwordErr, setPasswordErr] = useState(false)
    const [onSubmit, setOnSubmit] = useState(false)

    useEffect(() => {
        const checkToken = async () => {
            const res = await isAuthenticated()
            if (res) return navigate('/')
        }
        checkToken()
    }, [])

    const loginSubmit = async () => {
        if (onSubmit) return
        setLoginErr(undefined)

        const checkErr = {
            phone: phone.trim().length === 0,
            password: password.trim().length === 0
        }
        setPhoneErr(checkErr.phone)
        setPasswordErr(checkErr.password)
        if (checkErr.phone || checkErr.password) return

        const params = {
            phone,
            password
        }
        setOnSubmit(true)
        try {
            const res = await authApi.login(params)
            localStorage.setItem('token', res.token)
            setOnSubmit(false)
            navigate('/')
        } catch (err) {
            if (err.response.status === 401) {
                setLoginErr(err.response.data)
            }
            setOnSubmit(false)
        }
    }

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'flex-start',
                // backgroundImage: `url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'right'
            }}
        >
            <Card sx={{
                width: '100%',
                maxWidth: '600px'
            }}>
                <Box
                    sx={{
                        height: '100%',
                        width: '100%',
                        maxWidth: '400px',
                        '& .MuiTextField-root': { mb: 5 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        flexDirection: 'column',
                        margin: 'auto',
                        padding: '5rem 1rem'
                    }}
                >
                    <Typography
                        variant='h5'
                        textAlign='center'
                        mb='4rem'
                        fontWeight='700'
                    >
                        VACCINE PASSPORT
                    </Typography>
                    <FormControl fullWidth>
                        <TextField
                            label='Phone'
                            variant='outlined'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            error={phoneErr}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            label='Password'
                            type='password'
                            variant='outlined'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={passwordErr}
                        />
                    </FormControl>
                    {
                        loginErr && <FormControl>
                            <Typography color="error">
                                {loginErr}
                            </Typography>
                        </FormControl>
                    }
                    <LoadingButton
                        variant='contained'
                        fullWidth
                        size='large'
                        sx={{ marginTop: '1rem' }}
                        onClick={loginSubmit}
                    >
                        Sign in
                    </LoadingButton>
                </Box>
            </Card>
        </Box>
    )
}

export default Login

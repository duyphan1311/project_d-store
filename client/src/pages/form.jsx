import { useEffect, useState } from 'react'
import { isAuthenticated } from '../handlers/authHandler'
import { useNavigate } from 'react-router-dom'
import bgImage from '../assets/images/login-bg.jpg'
import { Box, Card, FormControl, TextField, Typography, Paper } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import categoryApi from '../api/categoryApi'

const Login = () => {
    const navigate = useNavigate()
    const [loginErr, setLoginErr] = useState()
    const [name, setName] = useState('')
    const [nameErr, setNameErr] = useState(false)
    const [image, setImage] = useState('')
    const [imageErr, setImageErr] = useState(false)
    const [onSubmit, setOnSubmit] = useState(false)



    const loginSubmit = async () => {
        if (onSubmit) return
        setLoginErr(undefined)

        const checkErr = {
            name: name.trim().length === 0
        }
        setNameErr(checkErr.name)
        setImageErr(checkErr.image)
        if (checkErr.name || checkErr.image) return

        const params = {
            name,
            image
        }
        setOnSubmit(true)
        try {
            const res = await categoryApi.create(params)
            console.log(res)
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
                width: '100%',
                padding: '60px 120px'
            }}
        >
            <Paper
                sx={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    borderRadius: '20px',
                    overflow: 'hidden',
                }}
                elevation={8}
            >
                <Box
                    sx={{
                        height: '100%',
                        width: '100%',
                        maxWidth: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        margin: 'auto',
                        padding: '5rem 1rem',
                        backgroundImage: `url(${bgImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                </Box>
                <Card sx={{
                    width: '100%',
                    maxWidth: '50%',
                    boxShadow: 'none'
                }}>
                    <Box
                        sx={{
                            height: '100%',
                            width: '100%',
                            maxWidth: '50%',
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
                            LOGIN
                        </Typography>
                        <FormControl fullWidth
                            sx={{
                                borderRadius: '10px'
                            }}>
                            <TextField
                                label='Name'
                                variant='outlined'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                error={nameErr}
                            />
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                label='Image'
                                variant='outlined'
                                name='image'
                                value={image}
                                type='file'
                                onChange={(e) => setImage(e.target.value)}
                                error={imageErr}
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
                            Create
                        </LoadingButton>
                    </Box>
                </Card >
            </Paper>
        </Box>
    )
}

export default Login

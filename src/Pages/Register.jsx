import { Link } from "react-router-dom"

export const Register = () => {

    const [isShowPassword, setIsShowPassword]

    return (
        <>
            <label>Username</label>
            <input type="text" />

            <label>Email</label>
            <input type="Email" />

            <label>Password</label>
            <input type={isShowPassword ? 'text' : 'password'} />

            <p>Already have account? <Link>Login Here</Link> </p>

            <button>Register</button>
            <button>Login With Google</button>

        </>
    )
}
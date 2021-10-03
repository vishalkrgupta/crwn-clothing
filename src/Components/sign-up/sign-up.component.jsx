import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { fireauth, createUserProfileDocument } from '../../firebase/firebase.utils';

import './sign-up.styles.scss'

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;

        if (password !== confirmPassword) {
            alert("Password doesn't match");
            return;
        }

        try {
            const { user } = await fireauth.createUserWithEmailAndPassword(email,
                password);

            await createUserProfileDocument(user, { displayName })
            this.setState({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            });

        } catch (error) {
            console.error(error);
        }
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const { displayName, email, password, confirmPassword } = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>I do not have a account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={this.handleSubmit}>
                    <FormInput name='displayName' value={displayName} label='Display Name'
                        type='text' onChange={this.handleChange}
                        required />
                    <FormInput name='email' value={email} label='email'
                        type='text' onChange={this.handleChange}
                        required />
                    <FormInput name='password' value={password} label='password'
                        type='password' onChange={this.handleChange}
                        required />
                    <FormInput name='confirmPassword' value={confirmPassword} label='confirm Password'
                        type='password' onChange={this.handleChange}
                        required />
                    <CustomButton type='submit'>SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;
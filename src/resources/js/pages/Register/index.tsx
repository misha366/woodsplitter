import React from 'react';
import {MainLayout} from "../../shared/layout/MainLayout";

import '../../../scss/LoginRegistration.scss';
import {Link, useForm, usePage} from "@inertiajs/inertia-react";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const { csrfToken } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const submit = (e) => {
        e.preventDefault();
        post('/register', {
            onError: (e) => {
                // @ts-ignore
                Object.values(e).flat().forEach(msg => toast.error(msg, {
                    className: 'woodsplitter-toast',
                }));
            },
            onSuccess: () => {
                toast.success('You are registered successfully', {
                    className: 'woodsplitter-toast',
                });
            }
        });
    };

    return <div className="authpage">
        <form onSubmit={submit} className="authpage__form">
            <h1 className="authpage__form-title">Register</h1>
            <input type="hidden" name="_token" value={csrfToken} />
            <input
                type="name"
                placeholder="Volodymyr Bocharov Yuriiovych"
                className="authpage__form-name"
                value={data.name}
                onChange={e => setData('name', e.target.value)}
            />
            <input
                type="email"
                placeholder="example@gmail.com"
                className="authpage__form-email"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                className="authpage__form-password"
                value={data.password}
                onChange={e => setData('password', e.target.value)}
            />            
            <input
                type="password"
                placeholder="repeat password"
                className="authpage__form-password"
                value={data.password_confirmation}
                onChange={e => setData('password_confirmation', e.target.value)}
            />
            <button
                type="submit"
                className="authpage__form-submit"
                disabled={processing}
            >Sign Up</button>

            <div className="authpage__form-links">
                <Link href="/">Main</Link>
                <Link href="/login">Sign In</Link>
            </div>
        </form>
    </div>;
};

Register.layout = (page: React.ReactNode) => <MainLayout hideHeaderFooter>{page}</MainLayout>;

export default Register;

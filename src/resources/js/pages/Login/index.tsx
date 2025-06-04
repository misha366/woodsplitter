import React from 'react';
import {MainLayout} from "../../shared/layout/MainLayout";

import '../../../scss/LoginRegistration.scss';
import {Link, useForm, usePage} from "@inertiajs/inertia-react";

import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const { csrfToken } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: ''
    });
    const submit = (e) => {
        e.preventDefault();
        post('/login', {
            onError: (e) => {
                console.log('e', e);
                console.log('errors', errors);
                // @ts-ignore
                Object.values(e).flat().forEach(msg => toast.error(msg, {
                    className: 'woodsplitter-toast',
                }));
            },
            onSuccess: () => {
                toast.success('You are logged in successfully', {
                    className: 'woodsplitter-toast',
                });
            }
        });
    };

    return <div className="authpage">
        <form onSubmit={submit} className="authpage__form">
            <h1 className="authpage__form-title">Login</h1>
            <input type="hidden" name="_token" value={csrfToken} />
            <input
                type="email"
                placeholder="example@gmail.com"
                className="authpage__form-email"
                value={data.email}
                onChange={e => setData('email', e.target.value)}
            />
            <input
                type="password"
                placeholder="*******"
                className="authpage__form-password"
                value={data.password}
                onChange={e => setData('password', e.target.value)}
            />
            <button
                type="submit"
                className="authpage__form-submit"
                disabled={processing}
            >Sign In</button>

            <div className="authpage__form-links">
                <Link href="/">Main</Link>
                <Link href="/register">Sign Up</Link>
            </div>
        </form>
    </div>;
};

Login.layout = (page: React.ReactNode) => <MainLayout hideHeaderFooter>{page}</MainLayout>;

export default Login;

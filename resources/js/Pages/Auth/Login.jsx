import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <GuestLayout>
            <Head title="Login - Stock Manager" />

            <div className="min-h-screen flex items-center justify-center px-4">

                <div className="w-full max-w-md bg-white rounded-2xl border p-8">

                    {/* Title */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            📦 Stock Manager
                        </h1>
                        <p className="text-sm text-gray-500">
                            Connexion à votre espace
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-5">

                        {/* Email */}
                        <div>
                            <InputLabel htmlFor="email" value="Email" />
                            <TextInput
                                id="email"
                                type="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} className="mt-1" />
                        </div>

                        {/* Password */}
                        <div>
                            <InputLabel htmlFor="password" value="Mot de passe" />
                            <TextInput
                                id="password"
                                type="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} className="mt-1" />
                        </div>

                        {/* Button */}
                        <PrimaryButton
                            className="w-full flex justify-center bg-indigo-600 hover:bg-indigo-700"
                            disabled={processing}
                        >
                            Se connecter
                        </PrimaryButton>

                        {/* Register link */}
                        <p className="text-center text-sm text-gray-600">
                            Pas de compte ?{' '}
                            <Link href={route('register')} className="text-indigo-600 hover:underline">
                                Créer un compte
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
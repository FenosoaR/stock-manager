import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <GuestLayout>
            <Head title="Register - Stock Manager" />

            <div className="min-h-screen flex items-center justify-center px-4">

                <div className="w-full max-w-md bg-white rounded-2xl border p-8">

                    {/* Title */}
                    <div className="text-center mb-6">
                        <h1 className="text-2xl font-bold text-gray-800">
                            📦 Stock Manager
                        </h1>
                        <p className="text-sm text-gray-500">
                            Créer un compte
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">

                        {/* Name */}
                        <div>
                            <InputLabel value="Nom" />
                            <TextInput
                                value={data.name}
                                className="mt-1 block w-full rounded-lg"
                                onChange={(e) => setData('name', e.target.value)}
                            />
                            <InputError message={errors.name} />
                        </div>

                        {/* Email */}
                        <div>
                            <InputLabel value="Email" />
                            <TextInput
                                type="email"
                                value={data.email}
                                className="mt-1 block w-full rounded-lg"
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Password */}
                        <div>
                            <InputLabel value="Mot de passe" />
                            <TextInput
                                type="password"
                                value={data.password}
                                className="mt-1 block w-full rounded-lg"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                            <InputError message={errors.password} />
                        </div>

                        {/* Confirm password */}
                        <div>
                            <InputLabel value="Confirmation" />
                            <TextInput
                                type="password"
                                value={data.password_confirmation}
                                className="mt-1 block w-full rounded-lg"
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                            />
                        </div>

                        {/* Button */}
                        <PrimaryButton className="w-full bg-indigo-600 hover:bg-indigo-700">
                            Créer le compte
                        </PrimaryButton>

                        <p className="text-center text-sm text-gray-600">
                            Déjà un compte ?{' '}
                            <Link href={route('login')} className="text-indigo-600 hover:underline">
                                Se connecter
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </GuestLayout>
    );
}
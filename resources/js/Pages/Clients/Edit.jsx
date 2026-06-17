import { Head, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ client }) {

    const { data, setData, put, processing, errors } = useForm({
        first_name: client.first_name || '',
        last_name: client.last_name || '',
        email: client.email || '',
        phone: client.phone || '',
        address: client.address || '',
        city: client.city || '',
        country: client.country || '',
        status: client.status || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('clients.update', client.id));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold">Modifier un client</h2>}
        >
              <Head title="Edit Clients -Stock Manager" />

            <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">

                <form onSubmit={submit} className="space-y-4">

                    {/* First name */}
                    <div>
                        <label className="block text-sm font-medium">Prénom</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                        />
                        {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                    </div>

                    {/* Last name */}
                    <div>
                        <label className="block text-sm font-medium">Nom</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                        />
                        {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <input
                            type="email"
                            className="w-full border rounded px-3 py-2"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="block text-sm font-medium">Téléphone</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                        />
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium">Adresse</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                        />
                    </div>

                    {/* City */}
                    <div>
                        <label className="block text-sm font-medium">Ville</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                        />
                    </div>

                    {/* Country */}
                    <div>
                        <label className="block text-sm font-medium">Pays</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.country}
                            onChange={(e) => setData('country', e.target.value)}
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-medium">Statut</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                        >
                            <option value="active">Actif</option>
                            <option value="inactive">Inactif</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                        {processing ? 'Mise à jour...' : 'Modifier'}
                    </button>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
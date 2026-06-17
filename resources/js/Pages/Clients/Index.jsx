import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage } from "@inertiajs/react";
import { PencilIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function Index({ clients }) {

    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold">Liste des clients</h2>}
        >
            <div className="bg-white p-6 rounded shadow">

                {/* HEADER ACTION */}
                <div className="flex justify-between mb-4">
                    <h1 className="text-lg font-bold">Clients</h1>

                    <Link
                        href={route("clients.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + Ajouter
                    </Link>
                </div>

                {/* FLASH MESSAGE */}
                {flash?.success && (
                    <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                        {flash.success}
                    </div>
                )}

                {/* TABLE */}
                <table className="w-full border">

                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-2">Nom</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Téléphone</th>
                            <th className="p-2">Adresse</th>
                            <th className="p-2">Statut</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clients.data.map((client) => (
                            <tr key={client.id} className="border-t">

                           
                                <td className="p-2 font-medium">
                                    {client.first_name} {client.last_name}
                                </td>

                          
                                <td className="p-2">
                                    {client.email}
                                </td>

                        
                                <td className="p-2">
                                    {client.phone}
                                </td>

                             
                                <td className="p-2">
                                    {client.address}
                                </td>

                        
                                <td className="p-2">
                                    <span className={`px-2 py-1 rounded text-white text-sm
                                        ${client.status === 'active'
                                            ? 'bg-green-500'
                                            : 'bg-red-500'
                                        }`}
                                    >
                                        {client.status}
                                    </span>
                                </td>

                            
                                <td className="p-2 flex gap-2">

                                    <Link
                                        href={route("clients.edit", client.id)}
                                        className="text-blue-600"
                                    >
                                       <PencilIcon className="w-5 h-5" />
                                    </Link>

                                    <Link
                                        href={route("clients.destroy", client.id)}
                                        method="delete"
                                        as="button"
                                        className="text-red-600"
                                    >
                                       <TrashIcon className="w-5 h-5" />
                                    </Link>

                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
                <div className="flex gap-2 mt-4 justify-center">

                {clients.links.map((link, index) => (

                    <Link
                        key={index}
                        href={link.url || ''}
                        className={`px-3 py-2 rounded border
                            ${link.active
                                ? 'bg-blue-600 text-white'
                                : 'bg-white'}
                        `}
                    >
                        {link.label
                            .replace('&laquo;', '«')
                            .replace('&raquo;', '»')}
                    </Link>

                    ))}


</div>
            </div>
        </AuthenticatedLayout>
    );
}
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Link, usePage } from "@inertiajs/react";

export default function Index({ clients }) {
   

    return (
        <AuthenticatedLayout>
            <div className="p-6">

              
                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">
                        Liste des clients
                    </h1>

                    <Link
                        href={route("clients.create")}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Ajouter
                    </Link>
                </div>

                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2">Nom</th>
                            <th className="p-2">Email</th>
                            <th className="p-2">Téléphone</th>
                            <th className="p-2">Adresse</th>
                            <th className="p-2">Statut</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {clients.map((client) => (
                            <tr key={client.id} className="border-t">
                                <td className="p-2">
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
                                    {client.status}
                                </td>

                                <td className="p-2 space-x-2">
                                    <Link
                                        href={route("clients.edit", client.id)}
                                        className="text-blue-600"
                                    >
                                        Modifier
                                    </Link>

                                    <Link
                                        href={route("clients.destroy", client.id)}
                                        method="delete"
                                        as="button"
                                        className="text-red-600"
                                    >
                                        Supprimer
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </AuthenticatedLayout>
    );
}
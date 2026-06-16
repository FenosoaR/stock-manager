import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';

export default function Index({ categories }) {

    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold">Liste des catégories</h2>}
        >
            <div className="bg-white p-6 rounded shadow">



                {/* HEADER ACTION */}
                <div className="flex justify-between mb-4">
                    <h1 className="text-lg font-bold">Catégories</h1>


               

                    <Link
                        href={route('categories.create')}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        + Ajouter
                    </Link>
                </div>

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
                            <th className="p-2">Slug</th>
                            <th className="p-2">Description</th>
                            <th className="p-2">Statut</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {categories.map((cat) => (
                            <tr key={cat.id} className="border-t">

                                <td className="p-2">{cat.name}</td>
                                <td className="p-2">{cat.description}</td>
                                <td className="p-2">{cat.slug}</td>
                                <td className="p-2">
                                    <span className={`px-2 py-1 rounded text-white text-sm
                                        ${cat.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {cat.status}
                                    </span>
                                </td>

                                <td className="p-2 flex gap-2">
                                    <Link
                                        href={route('categories.edit', cat.id)}
                                        className="text-blue-600"
                                    >
                                        Edit
                                    </Link>

                                    <Link
                                        href={route('categories.destroy', cat.id)}
                                        method="delete"
                                        as="button"
                                        className="text-red-600"
                                    >
                                        Delete
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
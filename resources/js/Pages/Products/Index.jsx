import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, usePage } from '@inertiajs/react';
import { PencilIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function Index({ products }) {

    const { flash } = usePage().props;

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold">Liste des produits</h2>}
        >
            <div className="bg-white p-6 rounded shadow">



                {/* HEADER ACTION */}
                <div className="flex justify-between mb-4">
                    <h1 className="text-lg font-bold">Produits</h1>


                    <Link
                        href={route('products.create')}
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
                            <th className="p-2">SKU</th>
                            <th className="p-2">Description</th>
                            <th className="p-2">Prix</th>
                            <th className="p-2">Stock</th>
                            <th className="p-2">Categorie</th>
                            <th className="p-2">Image</th>
                            <th className="p-2">Statut</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.data.map((product) => (
                            <tr key={product.id} className="border-t">

                                <td className="p-2">{product.name}</td>
                                <td className="p-2">{product.sku}</td>
                                <td className="p-2">{product.description}</td>
                                <td className="p-2">{product.price}</td>
                                <td className="p-2">{product.stock}</td>
                                <td className="p-2">{product.category?.name}</td>
                                <td className="p-2">
                                {product.image && product.image !== 'null' ? (
                                    <img
                                        src={`/storage/${product.image}`}
                                        alt={product.name}
                                        width="60"
                                    />
                                ) : (
                                    <span className="text-gray-500 text-sm">
                                        Image non disponible
                                    </span>
                                )}
                                                                    </td>

                                <td className="p-2">
                                    <span className={`px-2 py-1 rounded text-white text-sm
                                        ${product.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}>
                                        {product.status}
                                    </span>
                                </td>

                                <td className="p-2 flex gap-3">
                                    <Link
                                        href={route('products.edit', product.id)}
                                        className="text-blue-600"
                                    >
                                           <PencilIcon className="w-5 h-5" />
                                    </Link>

                                    <Link
                                        href={route('products.destroy', product.id)}
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

                {products.links.map((link, index) => (

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
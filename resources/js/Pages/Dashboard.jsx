import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Link } from '@inertiajs/react';

export default function Dashboard({
    products,
    categories,
    totalProducts,
    totalClients,
    totalCategories,
    lowStockProducts,
    outOfStockProducts,
    filters
}) {

    const { data, setData, get } = useForm({
        search: filters?.search || '',
        category_id: filters?.category_id || '',
        stock: filters?.stock || '',
    });

    const submit = (e) => {
        e.preventDefault();
        get(route('dashboard'), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold">Dashboard</h2>}>

            <div className="p-6 space-y-6">

                {/* 🔍 FILTERS */}
                <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-4 gap-4">

                    {/* SEARCH */}
                    <input
                        type="text"
                        placeholder="Rechercher produit..."
                        className="border p-2 rounded"
                        value={data.search}
                        onChange={e => setData('search', e.target.value)}
                    />

                    {/* CATEGORY */}
                    <select
                        className="border p-2 rounded"
                        value={data.category_id}
                        onChange={e => setData('category_id', e.target.value)}
                    >
                        <option value="">Toutes catégories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>

                    {/* STOCK FILTER */}
                    <select
                        className="border p-2 rounded"
                        value={data.stock}
                        onChange={e => setData('stock', e.target.value)}
                    >
                        <option value="">Tous stocks</option>
                        <option value="low">Low Stock (&lt; 10)</option>
                        <option value="out">Out of Stock</option>
                    </select>

                    {/* BUTTON */}
                    <button className="bg-blue-600 text-white rounded">
                        Filtrer
                    </button>

                </form>

                {/* 📊 STATS */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                    <div className="bg-white p-4 shadow rounded">
                        Produits: {totalProducts}
                    </div>

                    <div className="bg-white p-4 shadow rounded">
                        Clients: {totalClients}
                    </div>

                    <div className="bg-white p-4 shadow rounded">
                        Catégories: {totalCategories}
                    </div>

                    <div className="bg-yellow-100 p-4 shadow rounded">
                        Low Stock: {lowStockProducts}
                    </div>

                    <div className="bg-red-100 p-4 shadow rounded">
                        Out Stock: {outOfStockProducts}
                    </div>

                </div>

                {/* 📦 PRODUCTS TABLE */}
                <div className="bg-white p-4 rounded shadow">

                    <table className="w-full text-sm">

                        <thead>
                            <tr className="border-b text-left">
                                <th className="p-2">Nom</th>
                                <th className="p-2">SKU</th>
                                <th className="p-2">Catégorie</th>
                                <th className="p-2">Stock</th>
                                <th className="p-2">Prix</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map(p => (
                                <tr key={p.id} className="border-b">

                                    <td className="p-2">{p.name}</td>
                                    <td className="p-2">{p.sku}</td>
                                    <td className="p-2">{p.category?.name}</td>

                                    <td className="p-2">
                                        <span className={
                                            p.stock < 10
                                                ? "text-red-600"
                                                : "text-green-600"
                                        }>
                                            {p.stock}
                                        </span>
                                    </td>

                                    <td className="p-2">{p.price} €</td>

                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>

            </div>

        </AuthenticatedLayout>
    );
}
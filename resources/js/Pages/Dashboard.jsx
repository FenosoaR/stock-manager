import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, Link, Head } from '@inertiajs/react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard({
    products,
    categories,
    totalProducts,
    totalClients,
    totalCategories,
    lowStockProducts,
    outOfStockProducts,
    filters,
    chartProducts
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

    const chartProductsSafe = chartProducts ?? [];

    const chartData = {
        labels: chartProductsSafe.map(p => p.name),
        datasets: [
            {
                label: 'Stock',
                data: chartProductsSafe.map(p => p.stock),
                backgroundColor: [
                    '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe',
                ],
                borderRadius: 8,
                barThickness: 38,
            },
        ],
    };
        
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
            legend: { display: false },
            title: { display: false }, 
            tooltip: {
                backgroundColor: '#1f2937',
                padding: 10,
                cornerRadius: 8,
                displayColors: false,
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: '#6b7280', font: { size: 12 } },
            },
            y: {
                beginAtZero: true,
                grid: { color: '#f3f4f6' },
                ticks: { color: '#6b7280', font: { size: 12 } },
            },
        },
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold">Dashboard</h2>}
        >
            <Head title="Dashboard - Stock Manager" />

            <div className="p-6 space-y-6">

                {/* HEADER */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">
                            Dashboard
                        </h1>
                        <p className="text-sm text-gray-500">
                            Vue globale du stock, produits et activité
                        </p>
                    </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                    <div className="bg-white p-5 rounded-xl shadow-sm border">
                        <p className="text-gray-500 text-sm">Produits</p>
                        <p className="text-2xl font-bold">{totalProducts}</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border">
                        <p className="text-gray-500 text-sm">Clients</p>
                        <p className="text-2xl font-bold">{totalClients}</p>
                    </div>

                    <div className="bg-white p-5 rounded-xl shadow-sm border">
                        <p className="text-gray-500 text-sm">Catégories</p>
                        <p className="text-2xl font-bold">{totalCategories}</p>
                    </div>

                    <div className="bg-yellow-50 p-5 rounded-xl border border-yellow-200">
                        <p className="text-yellow-700 text-sm">Low Stock</p>
                        <p className="text-2xl font-bold text-yellow-600">
                            {lowStockProducts}
                        </p>
                    </div>

                    <div className="bg-red-50 p-5 rounded-xl border border-red-200">
                        <p className="text-red-700 text-sm">Out of Stock</p>
                        <p className="text-2xl font-bold text-red-600">
                            {outOfStockProducts}
                        </p>
                    </div>

                </div>

                {/* FILTERS */}
                <form
                    onSubmit={submit}
                    className="bg-white p-4 rounded-xl shadow-sm border grid grid-cols-1 md:grid-cols-4 gap-4"
                >

                    <input
                        type="text"
                        placeholder="🔍 Rechercher produit..."
                        className="border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={data.search}
                        onChange={e => setData('search', e.target.value)}
                    />

                    <select
                        className="border p-2 rounded-lg"
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

                    <select
                        className="border p-2 rounded-lg"
                        value={data.stock}
                        onChange={e => setData('stock', e.target.value)}
                    >
                        <option value="">Tous stocks</option>
                        <option value="low">Low Stock (&lt; 10)</option>
                        <option value="out">Out of Stock</option>
                    </select>

                    <button className="bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Filtrer
                    </button>

                </form>

             
                {chartProducts && chartProducts.length > 0 && (
                    <div className="bg-white p-5 rounded-xl shadow-sm border">
                        <h2 className="font-semibold mb-4">📊 Top 5 produits par stock</h2>
                        <div className="h-56"> {/* hauteur fixe ~224px, ajustez selon vos goûts */}
                            <Bar data={chartData} options={chartOptions} />
                        </div>
                    </div>
                )}

                {/* TABLE */}
                <div className="bg-white p-4 rounded-xl shadow-sm border">

                    <h2 className="font-semibold mb-4">
                        📦 Derniers produits
                    </h2>

                    <table className="w-full text-sm">

                        <thead>
                            <tr className="text-left border-b text-gray-500">
                                <th className="p-2">Nom</th>
                                <th className="p-2">Catégorie</th>
                                <th className="p-2">Stock</th>
                                <th className="p-2">Prix</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.data.map(p => (
                                <tr key={p.id} className="border-b hover:bg-gray-50">

                                    <td className="p-2 font-medium">
                                        {p.name}
                                    </td>

                                    <td className="p-2 text-gray-500">
                                        {p.category?.name}
                                    </td>

                                    <td className="p-2">
                                        <span className={`px-2 py-1 rounded text-xs
                                            ${p.stock < 10
                                                ? "bg-red-100 text-red-600"
                                                : "bg-green-100 text-green-600"
                                            }`}>
                                            {p.stock}
                                        </span>
                                    </td>

                                    <td className="p-2">
                                        {p.price} €
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>

  
                    <div className="flex justify-center mt-6 gap-2">

                        {products.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-3 py-1 rounded border text-sm
                                    ${link.active
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white hover:bg-gray-50'
                                    }
                                    ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}
                                `}
                            >
                                {link.label
                                    .replace('&laquo;', '«')
                                    .replace('&raquo;', '»')}
                            </Link>
                        ))}

                    </div>

                </div>

            </div>

        </AuthenticatedLayout>
    );
}
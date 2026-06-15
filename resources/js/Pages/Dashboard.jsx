import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Dashboard({
    totalProducts,
    totalClients,
    lowStockProducts
}) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold">Dashboard</h2>}
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* PRODUCTS */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500">Produits</h3>
                    <p className="text-3xl font-bold">{totalProducts}</p>
                </div>

                {/* CLIENTS */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500">Clients</h3>
                    <p className="text-3xl font-bold">{totalClients}</p>
                </div>

                {/* STOCK ALERT */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-gray-500">Stock faible</h3>
                    <p className="text-3xl font-bold text-red-500">
                        {lowStockProducts}
                    </p>
                </div>

            </div>
        </AuthenticatedLayout>
    );
}
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm } from '@inertiajs/react';

export default function Index({ movements, products }) {

    const { data, setData, post, reset } = useForm({
        product_id: '',
        type: 'in',
        quantity: 1,
        reason: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('stock.store'), {
            onSuccess: () => reset()
        });
    };

    return (
        <AuthenticatedLayout header={<h2>Stock Management</h2>}>

            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* ================= FORM ================= */}
                <div className="bg-white p-4 rounded shadow">

                    <h2 className="text-lg font-bold mb-4">
                        ➕ Nouveau mouvement de stock
                    </h2>

                    <form onSubmit={submit} className="space-y-3">

                        {/* PRODUIT */}
                        <select
                            className="w-full border p-2 rounded"
                            value={data.product_id}
                            onChange={e => setData('product_id', e.target.value)}
                        >
                            <option value="">-- Choisir produit --</option>
                            {products.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.name} (stock: {p.stock})
                                </option>
                            ))}
                        </select>

                        {/* TYPE */}
                        <select
                            className="w-full border p-2 rounded"
                            value={data.type}
                            onChange={e => setData('type', e.target.value)}
                        >
                            <option value="in">Entrée (+)</option>
                            <option value="out">Sortie (-)</option>
                            <option value="adjustment">Ajustement</option>
                        </select>

                        {/* QUANTITY */}
                        <input
                            type="number"
                            className="w-full border p-2 rounded"
                            value={data.quantity}
                            onChange={e => setData('quantity', e.target.value)}
                            min="1"
                        />

                        {/* REASON */}
                        <input
                            type="text"
                            className="w-full border p-2 rounded"
                            placeholder="Raison (optionnel)"
                            value={data.reason}
                            onChange={e => setData('reason', e.target.value)}
                        />

                        {/* BUTTON */}
                        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                            Valider mouvement
                        </button>

                    </form>
                </div>

                {/* ================= HISTORY ================= */}
                <div className="bg-white p-4 rounded shadow">

                    <h2 className="text-lg font-bold mb-4">
                        📊 Historique des mouvements
                    </h2>

                    <table className="w-full text-sm">

                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-2">Produit</th>
                                <th className="text-left p-2">Type</th>
                                <th className="text-left p-2">Qty</th>
                                <th className="text-left p-2">Avant</th>
                                <th className="text-left p-2">Après</th>
                                <th className="text-left p-2">Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {movements.map(m => (
                                <tr key={m.id} className="border-b">

                                    <td className="p-2">
                                        {m.product?.name}
                                    </td>

                                    <td className="p-2">
                                        <span className={
                                            m.type === 'in'
                                                ? 'text-green-600'
                                                : m.type === 'out'
                                                    ? 'text-red-600'
                                                    : 'text-blue-600'
                                        }>
                                            {m.type}
                                        </span>
                                    </td>

                                    <td className="p-2">
                                        {m.quantity}
                                    </td>

                                    <td className="p-2">
                                        {m.stock_before}
                                    </td>

                                    <td className="p-2">
                                        {m.stock_after}
                                    </td>

                                    <td className="p-2">
                                        {new Date(m.created_at).toLocaleDateString()}
                                    </td>

                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>

            </div>

        </AuthenticatedLayout>
    );
}
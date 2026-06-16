import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Edit({ category }) {

    const { data, setData, put, errors, processing } = useForm({
        name: category.name || '',
        slug:  category.slug || '',
        description: category.description || '',
        status: category.status || '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('categories.update' , category.id ));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold">Modifier une catégorie</h2>}
        >
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">

                <form onSubmit={submit} className="space-y-4">

                    {/* NAME */}
                    <div>
                        <label className="block text-sm font-medium">Nom</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    {/* SLUG */}
                    <div>
                        <label className="block text-sm font-medium">Slug</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.slug}
                            onChange={e => setData('slug', e.target.value)}
                        />
                        {errors.slug && <p className="text-red-500 text-sm">{errors.slug}</p>}
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            className="w-full border rounded px-3 py-2"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                    </div>

                    {/* STATUS */}
                    <div>
                        <label className="block text-sm font-medium">Statut</label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={data.status}
                            onChange={e => setData('status', e.target.value)}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {processing ? 'Enregistrement...' : 'Mettre a jour'}
                    </button>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}
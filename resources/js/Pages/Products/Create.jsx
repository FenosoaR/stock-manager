import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Create({ categories }) {
    const { data, setData, post, errors, processing } = useForm({
        name: "",
        sku: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
        image: "",
        status: "active",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("products.store"));
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold">Créer un produit</h2>}
        >
             <Head title="Create Products - Stock Manager" />

            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
                <form onSubmit={submit} className="space-y-4">
                    {/* NOM */}
                    <div>
                        <label className="block text-sm font-medium">Nom</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* SKU */}
                    <div>
                        <label className="block text-sm font-medium">SKU</label>
                        <input
                            type="text"
                            className="w-full border rounded px-3 py-2"
                            value={data.sku}
                            onChange={(e) => setData("sku", e.target.value)}
                        />
                        {errors.sku && (
                            <p className="text-red-500 text-sm">{errors.sku}</p>
                        )}
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <label className="block text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            className="w-full border rounded px-3 py-2"
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">
                                {errors.description}
                            </p>
                        )}
                    </div>

                    {/* PRICE */}
                    <div>
                        <label className="block text-sm font-medium">
                            Prix
                        </label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm">
                                {errors.price}
                            </p>
                        )}
                    </div>

                    {/* STOCK */}
                    <div>
                        <label className="block text-sm font-medium">
                            Stock
                        </label>
                        <input
                            type="number"
                            className="w-full border rounded px-3 py-2"
                            value={data.stock}
                            onChange={(e) => setData("stock", e.target.value)}
                        />
                        {errors.stock && (
                            <p className="text-red-500 text-sm">
                                {errors.stock}
                            </p>
                        )}
                    </div>

                    {/* CATEGORY */}
                    <div>
                        <label className="block text-sm font-medium">
                            Catégorie
                        </label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={data.category_id}
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                        >
                            <option value="">
                                -- Choisir une catégorie --
                            </option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <p className="text-red-500 text-sm">
                                {errors.category_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">
                            Image
                        </label>

                        <input
                            type="file"
                            className="w-full border rounded px-3 py-2"
                            onChange={(e) =>
                                setData("image", e.target.files[0])
                            }
                        />

                        {errors.image && (
                            <p className="text-red-500 text-sm">
                                {errors.image}
                            </p>
                        )}
                    </div>

                    {/* STATUS */}
                    <div>
                        <label className="block text-sm font-medium">
                            Statut
                        </label>
                        <select
                            className="w-full border rounded px-3 py-2"
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
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
                        {processing ? "Enregistrement..." : "Créer"}
                    </button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}

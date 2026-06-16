import { Link, usePage } from '@inertiajs/react';

export default function Sidebar({ open, toggle }) {
    const { url } = usePage();

    const menu = [
        { label: 'Dashboard', icon: '📊', href: '/dashboard' },
        { label: 'Produits', icon: '📦', href: route('products.index') },
        { label: 'Clients', icon: '👥', href: '/clients' },
        { label: 'Catégories', icon: '📁',href: route('categories.index')},
    ];

    return (
        <div
            className={`bg-gray-900 text-white min-h-screen flex flex-col transition-all duration-300
            ${open ? 'w-64' : 'w-20'}`}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <span className="font-bold">
                    {open ? 'StockApp' : 'SA'}
                </span>

                <button
                    onClick={toggle}
                    className="text-white text-xl"
                >
                    ☰
                </button>
            </div>

            {/* Menu */}
            <div className="flex flex-col mt-4 space-y-2 px-2">
                {menu.map((item) => {
                    const active = url.startsWith(item.href);

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                                ${active ? 'bg-gray-700 text-yellow-300' : 'hover:bg-gray-800'}`}
                        >
                            <span>{item.icon}</span>
                            {open && <span>{item.label}</span>}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
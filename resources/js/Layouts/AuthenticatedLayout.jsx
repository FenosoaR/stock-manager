import { useState } from 'react';
import { usePage } from '@inertiajs/react';
import Sidebar from '@/Components/Sidebar';
import Dropdown from '@/Components/Dropdown';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;
    const [open, setOpen] = useState(true);

    return (
        <div className="flex min-h-screen bg-gray-100">

            {/* SIDEBAR */}
            <Sidebar open={open} toggle={() => setOpen(!open)} />

            {/* RIGHT SIDE */}
            <div className="flex flex-col flex-1 min-w-0">

                {/* TOPBAR */}
                <div className="h-16 bg-white shadow flex items-center justify-between px-6">

                    <div className="font-semibold text-gray-700">
                        {header}
                    </div>

                    <Dropdown>
                        <Dropdown.Trigger>
                            <button className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200">
                                👤 {user.name}
                            </button>
                        </Dropdown.Trigger>

                        <Dropdown.Content>
                            <Dropdown.Link href={route('profile.edit')}>
                                Profile
                            </Dropdown.Link>

                            <Dropdown.Link method="post" href={route('logout')} as="button">
                                Logout
                            </Dropdown.Link>
                        </Dropdown.Content>
                    </Dropdown>

                </div>

                {/* CONTENT */}
                <main className="p-6 flex-1 overflow-auto">
                    {children}
                </main>

            </div>
        </div>
    );
}
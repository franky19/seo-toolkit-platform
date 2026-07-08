import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white h-screen p-4">
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/dashboard" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link>
          </li>
          <li>
            <Link href="/dashboard/settings" className="block p-2 hover:bg-gray-700 rounded">Settings</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuItems } from '@/lib/menu-items';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<string[]>(['rrhh', 'procesos', 'calidad']);

  const toggleMenu = (menuId: string) => {
    setOpenMenus(prev =>
      prev.includes(menuId) ? prev.filter(id => id !== menuId) : [...prev, menuId]
    );
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">9001APP v7</h1>
        <p className="text-gray-400 text-sm">Sistema ISO 9001</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map(item => (
          <div key={item.id}>
            {item.href ? (
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg ${
                  isActive(item.href) ? 'bg-blue-600' : 'hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            ) : (
              <>
                <button
                  onClick={() => toggleMenu(item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800"
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{item.label}</span>
                  {openMenus.includes(item.id) ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>

                {openMenus.includes(item.id) && item.submenu && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.submenu.map(subItem => (
                      <Link
                        key={subItem.id}
                        href={subItem.href}
                        className={`block px-4 py-2 rounded-lg text-sm ${
                          isActive(subItem.href) ? 'bg-blue-600' : 'text-gray-300 hover:bg-gray-800'
                        }`}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
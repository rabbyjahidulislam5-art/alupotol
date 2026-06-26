'use client';
import { ReactNode } from 'react';

interface SidebarProps {
  items: { label: string; icon: string; href: string; badge?: number }[];
  activePath: string;
  collapsed: boolean;
  onToggle: () => void;
  role: string;
  userName: string;
  onLogout: () => void;
}

export default function Sidebar({ items, activePath, collapsed, onToggle, role, userName, onLogout }: SidebarProps) {
  return (
    <aside className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} hidden lg:block`}>
      <div className="flex items-center gap-3 p-4 border-b border-gray-100">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0 shadow-md shadow-indigo-100">SC</div>
        {!collapsed && <div className="overflow-hidden"><p className="text-sm font-bold text-gray-900 truncate">Smart Campus</p><p className="text-[10px] font-bold text-indigo-500 uppercase tracking-wider truncate">{role}</p></div>}
      </div>
      <nav className="flex-1 py-4 overflow-y-auto">
        {items.map(item => {
          const active = activePath === item.href || activePath.startsWith(item.href + '/');
          return (
            <a key={item.href} href={item.href} className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all relative ${active ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-gray-600 hover:bg-indigo-50/40 hover:text-indigo-600'}`}>
              <span className="text-lg flex-shrink-0">{item.icon}</span>
              {!collapsed && <span className="truncate">{item.label}</span>}
              {item.badge && item.badge > 0 && <span className="absolute right-2 top-1 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">{item.badge > 9 ? '9+' : item.badge}</span>}
            </a>
          );
        })}
      </nav>
      <div className="p-4 border-t border-gray-100">
        {!collapsed && <p className="text-xs text-gray-500 mb-2 truncate">{userName}</p>}
        <button onClick={onLogout} className={`flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-all ${collapsed ? 'justify-center' : ''}`}>
          <span>🚪</span>{!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export function MobileNav({ items, activePath }: { items: SidebarProps['items']; activePath: string }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 lg:hidden safe-area-bottom shadow-lg">
      <div className="flex justify-around items-center py-2">
        {items.slice(0, 5).map(item => {
          const active = activePath === item.href;
          return (
            <a key={item.href} href={item.href} className={`flex flex-col items-center gap-0.5 px-3 py-1 text-xs relative ${active ? 'text-indigo-600 font-bold' : 'text-gray-500'}`}>
              <span className="text-lg">{item.icon}</span>
              <span className="font-semibold">{item.label}</span>
              {item.badge && item.badge > 0 && <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">{item.badge}</span>}
            </a>
          );
        })}
      </div>
    </nav>
  );
}


"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sprout, LayoutDashboard, Bug, Droplets, Sun, AreaChart } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', tooltip: 'Dashboard' },
  { href: '/dashboard/disease-prediction', icon: Bug, label: 'Disease Prediction', tooltip: 'Disease Prediction' },
  { href: '/dashboard/irrigation-optimization', icon: Droplets, label: 'Irrigation', tooltip: 'Irrigation Optimization' },
  { href: '/dashboard/climate-advice', icon: Sun, label: 'Climate Advice', tooltip: 'Climate Advice' },
  { href: '/dashboard/market-insights', icon: AreaChart, label: 'Market', tooltip: 'Market Insights' },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="w-64" collapsible="icon">
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sprout className="h-5 w-5" />
            </div>
            <span className="font-semibold text-xl group-data-[collapsible=icon]:hidden">AgriGenius</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="p-2">
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  variant="default"
                  size="lg"
                  isActive={pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/dashboard')}
                  tooltip={item.tooltip}
                >
                  <Link href={item.href}>
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

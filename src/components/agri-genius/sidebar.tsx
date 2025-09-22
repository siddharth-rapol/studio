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
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

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
    <Sidebar className="w-72" collapsible="icon">
      <SidebarHeader>
        <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Sprout className="h-5 w-5" />
            </div>
            <span className="font-semibold text-lg group-data-[collapsible=icon]:hidden">AgriGenius</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} legacyBehavior passHref>
                <SidebarMenuButton
                  asChild
                  variant="default"
                  size="default"
                  isActive={pathname === item.href}
                  tooltip={item.tooltip}
                >
                  <a>
                    <item.icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}

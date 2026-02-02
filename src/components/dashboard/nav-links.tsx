'use client';

import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Home, UserCircle, Stethoscope, Hospital, Shield } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/dashboard", label: "Dashboard Hub", icon: Home },
  { href: "/dashboard/patient", label: "Patient", icon: UserCircle },
  { href: "/dashboard/responder", label: "First Responder", icon: Stethoscope },
  { href: "/dashboard/hospital", label: "Hospital Staff", icon: Hospital },
  { href: "/dashboard/admin", label: "Admin", icon: Shield },
];

export function NavLinks() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navLinks.map((link) => (
        <SidebarMenuItem key={link.href}>
          <SidebarMenuButton asChild isActive={pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href))}>
            <Link href={link.href}>
              <link.icon className="h-4 w-4" />
              <span>{link.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

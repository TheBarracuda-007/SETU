import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight, Hospital, Shield, Stethoscope, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const roleCards = [
  {
    title: "Patient",
    description: "Manage your profile and request assistance.",
    href: "/dashboard/patient",
    icon: UserCircle,
  },
  {
    title: "First Responder",
    description: "View and respond to emergency alerts.",
    href: "/dashboard/responder",
    icon: Stethoscope,
  },
  {
    title: "Hospital Staff",
    description: "Monitor incoming patients and manage resources.",
    href: "/dashboard/hospital",
    icon: Hospital,
  },
  {
    title: "Administrator",
    description: "Manage users, permissions, and system settings.",
    href: "/dashboard/admin",
    icon: Shield,
  },
];

export default function DashboardHub() {
  return (
    <div className="flex flex-col gap-8">
      <div className="relative h-64 w-full overflow-hidden rounded-lg">
        <Image
          src="https://picsum.photos/seed/dashboard-hero/1200/400"
          alt="Medical technology"
          fill
          className="object-cover"
          data-ai-hint="medical technology"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-start justify-end p-6 md:p-8">
          <h1 className="text-3xl font-bold text-white md:text-4xl">
            Welcome to SETU Connect
          </h1>
          <p className="mt-2 max-w-lg text-lg text-primary-foreground/90">
            Your central hub for emergency response coordination. Select a role
            below to view the corresponding dashboard.
          </p>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {roleCards.map((card) => (
          <Card key={card.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <card.icon className="h-6 w-6" />
                </div>
                <CardTitle>{card.title}</CardTitle>
              </div>
              <CardDescription className="pt-2">{card.description}</CardDescription>
            </CardHeader>
            <div className="flex-grow" />
            <div className="p-6 pt-0">
                <Button asChild variant="outline" className="w-full">
                   <Link href={card.href}>
                    View Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                   </Link>
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

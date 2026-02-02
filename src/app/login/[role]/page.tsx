'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SetuLogo } from '@/components/setu-logo';
import { ArrowLeft } from 'lucide-react';
import { notFound, useParams } from 'next/navigation';

const roleDisplayNames: { [key: string]: string } = {
    patient: 'Patient',
    responder: 'First Responder',
    hospital: 'Hospital Staff',
    admin: 'Administrator',
};

export default function LoginPage() {
  const params = useParams();
  const role = Array.isArray(params.role) ? params.role[0] : params.role;
  const roleName = role ? roleDisplayNames[role] : undefined;

  if (!roleName) {
    notFound();
  }

  const loginUrl = `/dashboard/${role}`;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-background">
        <div className="absolute top-4 left-4">
            <Button asChild variant="outline">
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to role selection
                </Link>
            </Button>
        </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <SetuLogo />
          <CardTitle className="text-2xl font-bold">SETU Connect</CardTitle>
          <CardDescription>
            Sign in as a <span className="font-semibold">{roleName}</span>
          </CardDescription>
        </Header>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href={loginUrl}>Login</Link>
          </Button>
        </CardFooter>
      </Card>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        This is a simulated login. No real authentication is performed.
      </p>
    </main>
  );
}

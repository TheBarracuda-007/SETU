'use client';

import { useState } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SetuLogo } from '@/components/setu-logo';

export default function LoginPage() {
  const [role, setRole] = useState('patient');

  const loginRoutes: { [key: string]: string } = {
    patient: '/dashboard/patient',
    responder: '/dashboard/responder',
    hospital_staff: '/dashboard/hospital',
    admin: '/dashboard/admin',
  };

  const loginUrl = loginRoutes[role] || '/dashboard';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="items-center text-center">
          <SetuLogo />
          <CardTitle className="text-2xl font-bold">SETU Connect</CardTitle>
          <CardDescription>
            Sign in to the emergency response system
          </CardDescription>
        </CardHeader>
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
          <div className="grid gap-2">
            <Label htmlFor="role">Login as</Label>
            <Select value={role} onValueChange={setRole}>
              <SelectTrigger id="role">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">Patient</SelectItem>
                <SelectItem value="responder">First Responder</SelectItem>
                <SelectItem value="hospital_staff">Hospital Staff</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
              </SelectContent>
            </Select>
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

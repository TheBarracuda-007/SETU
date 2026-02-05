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

export default function SignupPage() {
  const params = useParams();
  const role = Array.isArray(params.role) ? params.role[0] : params.role;
  const roleName = role ? roleDisplayNames[role] : undefined;

  if (!roleName) {
    notFound();
  }

  const loginUrl = `/login/${role}`;
  const dashboardUrl = `/dashboard/${role}`;

  const renderIdField = () => {
    switch (role) {
      case 'patient':
        return (
          <div className="grid gap-2">
            <Label htmlFor="aadhar">Aadhar Number</Label>
            <Input id="aadhar" placeholder="xxxx-xxxx-xxxx" required suppressHydrationWarning />
          </div>
        );
      case 'responder':
      case 'hospital':
        return (
          <div className="grid gap-2">
            <Label htmlFor="id-number">ID Number</Label>
            <Input id="id-number" placeholder="Your Official ID" required suppressHydrationWarning />
          </div>
        );
      case 'admin':
        return (
          <>
            <div className="grid gap-2">
              <Label htmlFor="contact">Contact Number</Label>
              <Input id="contact" type="tel" placeholder="+91-XXXX-XXXXXX" required suppressHydrationWarning />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="otp">OTP</Label>
              <Input id="otp" placeholder="Enter OTP" required suppressHydrationWarning />
            </div>
          </>
        );
      default:
        return null;
    }
  };


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
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>
            Sign up as a <span className="font-semibold">{roleName}</span> for SETU
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" placeholder="John" required suppressHydrationWarning />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" placeholder="Doe" required suppressHydrationWarning />
                </div>
            </div>
            {renderIdField()}
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" required suppressHydrationWarning />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required suppressHydrationWarning />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input id="confirm-password" type="password" required suppressHydrationWarning />
            </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
            <Button asChild className="w-full">
                <Link href={dashboardUrl}>Sign Up</Link>
            </Button>
            <div className="text-center text-sm text-muted-foreground">
                Already have an account?{' '}
                <Button asChild variant="link" className="p-0 h-auto">
                    <Link href={loginUrl}>Login</Link>
                </Button>
            </div>
        </CardFooter>
      </Card>
      <p className="mt-4 text-center text-sm text-muted-foreground">
        This is a simulated sign-up flow. No real account is created.
      </p>
    </main>
  );
}

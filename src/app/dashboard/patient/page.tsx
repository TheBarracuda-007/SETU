import { AlertCircle, CheckCircle, HelpCircle, Siren, Truck, Zap } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { alerts, users } from "@/lib/data";
import { formatDistanceToNow } from "date-fns";

export default function PatientDashboard() {
  const patient = users.find(u => u.role === 'patient');
  const activeAlert = alerts.find(a => a.patientName === patient?.name && a.status !== 'resolved');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <HelpCircle className="h-5 w-5 text-yellow-500" />;
      case 'dispatched':
        return <Siren className="h-5 w-5 text-blue-500" />;
      case 'on-site':
        return <Zap className="h-5 w-5 text-orange-500" />;
      case 'transporting':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="md:col-span-2">
        <h1 className="text-2xl font-semibold">Patient Dashboard</h1>
        <p className="text-muted-foreground">Welcome, {patient?.name}.</p>
      </div>
      <Card className="flex flex-col items-center justify-center bg-accent/10 border-accent/50 text-center">
        <CardHeader>
          <CardTitle className="text-xl">Emergency Assistance</CardTitle>
          <CardDescription>Press the button in case of an emergency</CardDescription>
        </CardHeader>
        <CardContent>
          <Button size="lg" className="h-24 w-24 rounded-full bg-accent text-accent-foreground shadow-lg hover:bg-accent/90 focus:ring-accent">
            <Siren className="h-12 w-12" />
            <span className="sr-only">Request Assistance</span>
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Your Information</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={patient?.avatarUrl} alt={patient?.name} data-ai-hint="person face" />
            <AvatarFallback>{patient?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{patient?.name}</p>
            <p className="text-sm text-muted-foreground">{patient?.email}</p>
            <Badge variant="secondary" className="mt-2 capitalize">{patient?.role}</Badge>
          </div>
        </CardContent>
      </Card>
      
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Active Alert Status</CardTitle>
          <CardDescription>
            {activeAlert ? "Live updates on your emergency request." : "You have no active emergency requests."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {activeAlert ? (
            <div className="flex items-start gap-4">
              <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                {getStatusIcon(activeAlert.status)}
              </div>
              <div>
                <p className="font-semibold capitalize">{activeAlert.status}</p>
                <p className="text-sm text-muted-foreground">
                  {`Alert raised ${formatDistanceToNow(new Date(activeAlert.timestamp), { addSuffix: true })}`}
                </p>
                <p className="mt-2 text-sm">{activeAlert.details}</p>
                {activeAlert.responderName && (
                  <p className="mt-2 text-sm">
                    <span className="font-semibold">Responder:</span> {activeAlert.responderName} is on the way.
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-8">
              <CheckCircle className="h-12 w-12 mb-4" />
              <p>All clear. No active alerts.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

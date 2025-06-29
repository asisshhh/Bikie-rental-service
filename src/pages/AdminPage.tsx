import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import AdminLogin from "@/components/admin/AdminLogin";
import DashboardOverview from "@/components/admin/DashboardOverview";
import VehicleManagement from "@/components/admin/VehicleManagement";
import BookingManagement from "@/components/admin/BookingManagement";
import CustomerManagement from "@/components/admin/CustomerManagement";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email, password) => {
    // Dummy credentials
    if (email === "admin@example.com" && password === "admin123") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials. Try admin@example.com / admin123");
    }
  };

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <Card className="border shadow-sm">
          <TabsContent value="overview" className="p-4">
            <DashboardOverview />
          </TabsContent>
          <TabsContent value="vehicles" className="p-4">
            <VehicleManagement />
          </TabsContent>
          <TabsContent value="bookings" className="p-4">
            <BookingManagement />
          </TabsContent>
          <TabsContent value="customers" className="p-4">
            <CustomerManagement />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default AdminPage;
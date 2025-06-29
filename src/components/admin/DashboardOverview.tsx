
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Vehicle, getAvailableVehicles } from "@/data/vehicles";
import { Car, Bike, Calendar, User } from "lucide-react";

// Mock data for the admin dashboard
const data = [
  {
    name: "Jan",
    bookings: 12,
    revenue: 1200,
  },
  {
    name: "Feb",
    bookings: 18,
    revenue: 1800,
  },
  {
    name: "Mar",
    bookings: 24,
    revenue: 2400,
  },
  {
    name: "Apr",
    bookings: 30,
    revenue: 3000,
  },
  {
    name: "May",
    bookings: 27,
    revenue: 2700,
  },
  {
    name: "Jun",
    bookings: 32,
    revenue: 3200,
  },
];

const recentBookings = [
  { id: "b1", vehicleName: "Tesla Model 3", customerName: "John Smith", date: "2023-05-10", status: "Completed" },
  { id: "b2", vehicleName: "Mountain Bike Pro", customerName: "Alex Johnson", date: "2023-05-11", status: "Active" },
  { id: "b3", vehicleName: "BMW X5", customerName: "Sarah Williams", date: "2023-05-12", status: "Upcoming" },
];

const DashboardOverview = () => {
  const vehicles = getAvailableVehicles();
  const carsCount = vehicles.filter(v => v.type === 'car').length;
  const bikesCount = vehicles.filter(v => v.type === 'bike').length;
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard Overview</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Vehicles</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{vehicles.length}</div>
            <p className="text-xs text-muted-foreground">
              {carsCount} cars, {bikesCount} bikes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              +2 from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              +5 new this month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$14,300</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Revenue & Bookings</CardTitle>
        </CardHeader>
        <CardContent className="pl-2">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Bar dataKey="bookings" fill="#adfa1d" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      
      <div>
        <h3 className="text-lg font-medium mb-4">Recent Bookings</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Vehicle</th>
                <th className="text-left p-2">Customer</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="border-b">
                  <td className="p-2">{booking.vehicleName}</td>
                  <td className="p-2">{booking.customerName}</td>
                  <td className="p-2">{booking.date}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      booking.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'Active' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;

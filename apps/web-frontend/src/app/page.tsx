"use client";

import { useEffect, useState } from "react";
import { WasteForm } from "@/components/WasteForm";
import { WasteMetric } from "@/types/waste";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf, BarChart3, Recycle, Target } from "lucide-react";

export default function HomePage() {
  const [metrics, setMetrics] = useState<WasteMetric[]>([]);
  const [goal, setGoal] = useState<{ target_co2: number; name: string } | null>(null);

  const fetchMetrics = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/metrics");
      const data = await res.json();
      setMetrics(data);
    } catch (err) { console.error("Error Java:", err); }
  };

  const fetchGoal = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/global-goal");
      const data = await res.json();
      setGoal(data);
    } catch (err) { console.error("Error Laravel:", err); }
  };

  useEffect(() => {
    fetchMetrics();
    fetchGoal();
  }, []);

  const totalWeight = metrics.reduce((acc, m) => acc + (m.weight || 0), 0);
  const totalCo2 = metrics.reduce((acc, m) => acc + (m.co2Saved || 0), 0);
  const percentage = goal ? Math.min((totalCo2 / goal.target_co2) * 100, 100) : 0;

  return (
    <div className="min-h-screen p-6 md:p-10 bg-gray-300">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <img 
              src="https://interzero.es/wp-content/uploads/sites/16/2022/06/logo.svg" 
              alt="Interzero Logo" 
              className="h-12 md:h-16"
            />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <Leaf className="w-4 h-4" />
            System is Active
          </div>
        </header>

        {/* METRIC CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Total Collected</CardTitle>
              <Recycle className="w-4 h-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalWeight.toFixed(1)} Kg</div>
              <p className="text-xs text-slate-400">Accumulated weight in plant</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">CO2 Saved</CardTitle>
              <BarChart3 className="w-4 h-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{totalCo2.toFixed(1)} Kg</div>
              <p className="text-xs text-slate-400">Positive environmental impact</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Monthly Goal</CardTitle>
              <Target className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-xs">
                <span>{percentage.toFixed(1)}% of the goal</span>
                <span className="font-bold">{goal?.target_co2} Kg</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-purple-600 h-full transition-all duration-1000 shadow-[0_0_8px_rgba(147,51,234,0.5)]" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* FORMULARIO (4 columnas) */}
          <div className="lg:col-span-4">
            <WasteForm onSuccess={fetchMetrics} />
          </div>

          {/* TABLA (8 columnas) */}
          <Card className="lg:col-span-8">
            <CardHeader>
              <CardTitle className="text-lg">Operation History</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead>Date</TableHead>
                    <TableHead>Waste</TableHead>
                    <TableHead className="text-right">Weight</TableHead>
                    <TableHead className="text-right text-green-600">CO2 Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {metrics.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="h-24 text-center text-slate-400">
                        Waiting for initial records...
                      </TableCell>
                    </TableRow>
                  ) : (
                    metrics.map((m) => (
                      <TableRow key={m.id}>
                        <TableCell className="text-xs text-slate-500">
                          {m.createdAt ? new Date(m.createdAt).toLocaleDateString() : 'Today'}
                        </TableCell>
                        <TableCell className="font-medium">{m.type}</TableCell>
                        <TableCell className="text-right">{m.weight}kg</TableCell>
                        <TableCell className="text-right font-bold text-green-600">-{m.co2Saved}kg</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
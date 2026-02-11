"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function WasteForm({ onSuccess }: { onSuccess: () => void }) {
  const [type, setType] = useState("");
  const [weight, setWeight] = useState("");
  const [loading, setLoading] = useState(false);
  const wasteTypes = ["Plastic", "Glass", "Paper", "Metal"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          weight: parseFloat(weight),
          co2Saved: parseFloat(weight) * 0.5, // Simple Logic 1kg = 0.5 C02
        }),
      });

      if (response.ok) {
        setType("");
        setWeight("");
        onSuccess(); // Refresh the list
      }
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = type !== "" && weight !== "" && !isNaN(parseFloat(weight)) && parseFloat(weight) > 0;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Register Waste</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select onValueChange={setType} value={type} required>
            <SelectTrigger>
              <SelectValue placeholder="Type of waste" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              {wasteTypes.map((type: string) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input 
            type="number" 
            placeholder="Weight in kg" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)}
            required 
            min="0"
            step="0.01"
          />
          
          <Button type="submit" className="w-full" disabled={loading || !isFormValid}>
            {loading ? "Saving..." : "Register Impact"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
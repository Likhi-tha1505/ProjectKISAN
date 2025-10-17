import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MarketPrice {
  id: string;
  crop_name: string;
  region: string;
  price_per_kg: number;
  market_name: string;
  updated_at: string;
}

export const MarketTab = () => {
  const [prices, setPrices] = useState<MarketPrice[]>([]);

  useEffect(() => {
    const fetchPrices = async () => {
      const { data } = await supabase
        .from("market_prices")
        .select("*")
        .order("updated_at", { ascending: false });
      if (data) setPrices(data);
    };
    fetchPrices();
  }, []);

  const chartData = prices.map((p) => ({
    name: p.crop_name,
    price: Number(p.price_per_kg),
  }));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-primary mb-2">Market Prices</h2>
        <p className="text-muted-foreground">
          Real-time mandi prices and market trends to help you sell at the best time
        </p>
      </div>

      {/* Price Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Price Trends</CardTitle>
          <CardDescription>Current market prices across different crops</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis label={{ value: "Price (₹/kg)", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="price" stroke="#2D5016" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Current Prices */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {prices.map((price) => (
          <Card key={price.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {price.crop_name}
                <TrendingUp className="h-5 w-5 text-green-600" />
              </CardTitle>
              <CardDescription>{price.market_name}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Price per kg</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{Number(price.price_per_kg).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Region</span>
                  <span className="font-medium">{price.region}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-accent/10 border-accent">
        <CardHeader>
          <CardTitle className="text-accent-foreground">💡 Best Selling Advice</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-accent-foreground/80">
            Based on current trends, <strong>Cotton</strong> is fetching the highest price at ₹65/kg in Gujarat.
            Consider selling tomatoes soon as prices are expected to rise in the next week.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
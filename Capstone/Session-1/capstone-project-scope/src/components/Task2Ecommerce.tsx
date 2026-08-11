import React, { useState } from 'react';
import { ecommerceFeatures } from '../data/assignmentData';
import { 
  TrendingUp, 
  PackageCheck, 
  Truck, 
  Tags, 
  MessageSquareText, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  ShoppingBag, 
  ArrowUpRight, 
  Sparkles, 
  Layers, 
  Search, 
  Filter
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

// Mock chart data for seller panel demo
const salesData = [
  { time: '08:00', sales: 12400, orders: 42 },
  { time: '10:00', sales: 24800, orders: 86 },
  { time: '12:00', sales: 45200, orders: 154 },
  { time: '14:00', sales: 38900, orders: 128 },
  { time: '16:00', sales: 58400, orders: 198 },
  { time: '18:00', sales: 82100, orders: 264 },
  { time: '20:00', sales: 94500, orders: 310 },
];

const sentimentData = [
  { name: 'Positive (4-5★)', value: 72, color: '#10b981' },
  { name: 'Neutral (3★)', value: 18, color: '#f59e0b' },
  { name: 'Negative (1-2★)', value: 10, color: '#ef4444' },
];

export const Task2Ecommerce: React.FC = () => {
  const [activeFeatureTab, setActiveFeatureTab] = useState<number>(1);
  const [selectedOrders, setSelectedOrders] = useState<number[]>([1, 2]);
  const [discountPercent, setDiscountPercent] = useState<number>(12);
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);

  // Mock orders list for batch dispatch simulation
  const [orders, setOrders] = useState([
    { id: 1, customer: 'Ananya Sharma', items: 'Wireless Earbuds v2', amount: '₹1,899', courier: 'Delhivery Express', status: 'Pending Packaging' },
    { id: 2, customer: 'Rahul Verma', items: 'Smart Fitness Band Pro', amount: '₹2,499', courier: 'BlueDart Express', status: 'Pending Packaging' },
    { id: 3, customer: 'Priya Patel', items: 'Mechanical Keyboard RGB', amount: '₹3,299', courier: 'Flipkart Logistics', status: 'Ready for Dispatch' },
  ]);

  const toggleOrderSelect = (id: number) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const handleBatchDispatch = () => {
    if (selectedOrders.length === 0) return;
    setOrders((prev) =>
      prev.map((ord) =>
        selectedOrders.includes(ord.id) ? { ...ord, status: 'Dispatched & Manifested' } : ord
      )
    );
    setDispatchStatus(`Successfully generated manifests & dispatched ${selectedOrders.length} orders!`);
    setTimeout(() => setDispatchStatus(null), 4000);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'TrendingUp': return <TrendingUp className="w-5 h-5 text-indigo-400" />;
      case 'PackageCheck': return <PackageCheck className="w-5 h-5 text-emerald-400" />;
      case 'Truck': return <Truck className="w-5 h-5 text-amber-400" />;
      case 'Tags': return <Tags className="w-5 h-5 text-purple-400" />;
      case 'MessageSquareText': return <MessageSquareText className="w-5 h-5 text-rose-400" />;
      default: return <Sparkles className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 border border-slate-800 text-slate-100 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Task 02 / 05
          </span>
          <span className="text-xs text-slate-400">Smart E-Commerce Seller Panel Architecture</span>
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
          2. Smart E-Commerce Dashboard (Flipkart Seller Panel)
        </h2>
        <p className="mt-2 text-sm text-slate-300 max-w-3xl leading-relaxed">
          <strong className="text-indigo-300">Assignment Prompt:</strong> List 5 core features you would include if you were building a Smart E-Commerce Dashboard (like Flipkart seller panel) in React, and explain in one line how each feature helps the user.
        </p>
      </div>

      {/* 5 Core Features Grid List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>5 Core Features & One-Line Value Explanations</span>
          </h3>
          <span className="text-xs text-slate-400">Click any card to highlight feature in live seller demo below</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ecommerceFeatures.map((feature) => {
            const isSelected = activeFeatureTab === feature.id;
            return (
              <div
                key={feature.id}
                onClick={() => setActiveFeatureTab(feature.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-slate-800/90 border-indigo-500/80 shadow-lg shadow-indigo-500/10 ring-1 ring-indigo-500/50'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      {getIcon(feature.iconName)}
                    </div>
                    <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                      Feature 0{feature.id}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-100 mb-1.5">{feature.title}</h4>
                  
                  {/* One-Liner (Key Assignment Answer) */}
                  <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-xs font-medium text-indigo-200 mb-2">
                    <strong className="text-emerald-400">How it helps:</strong> {feature.oneLiner}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed">
                    {feature.detailedExplanation}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">{feature.category}</span>
                  <span className={`font-mono ${isSelected ? 'text-indigo-400 font-bold' : 'text-slate-500'}`}>
                    {isSelected ? 'Active Demo Tab' : 'Click to inspect'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Flipkart Seller Panel Interactive Demo */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center font-bold text-sm shadow-md">
              FK
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg font-bold text-slate-100">Smart Seller Panel Prototype</h3>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Live React Demo
                </span>
              </div>
              <p className="text-xs text-slate-400">Simulating Flipkart Seller Operations with real-time state</p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center space-x-4 text-xs font-mono">
            <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">Today GMV: </span>
              <span className="text-emerald-400 font-bold">₹94,500</span>
            </div>
            <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400">Orders: </span>
              <span className="text-indigo-400 font-bold">310 Units</span>
            </div>
          </div>
        </div>

        {/* Feature 1: Real-Time Sales & Revenue Analytics Matrix */}
        <div className={`p-5 rounded-2xl border transition-all ${activeFeatureTab === 1 ? 'bg-slate-800/80 border-indigo-500/50 ring-1 ring-indigo-500/30' : 'bg-slate-950/60 border-slate-800'}`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-indigo-400" />
              <h4 className="text-sm font-bold text-slate-100">Feature 1: Real-Time Sales & Revenue Chart</h4>
            </div>
            <span className="text-xs text-slate-400 font-mono">Hourly Velocity (INR)</span>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#f8fafc' }}
                  formatter={(val: number) => [`₹${val.toLocaleString()}`, 'Revenue']}
                />
                <Area type="monotone" dataKey="sales" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#salesGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Feature 2 & Feature 4 Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Feature 2: AI Automated Inventory & Stock Forecaster */}
          <div className={`p-5 rounded-2xl border transition-all ${activeFeatureTab === 2 ? 'bg-slate-800/80 border-indigo-500/50 ring-1 ring-indigo-500/30' : 'bg-slate-950/60 border-slate-800'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <PackageCheck className="w-5 h-5 text-emerald-400" />
                <h4 className="text-sm font-bold text-slate-100">Feature 2: Inventory Forecaster</h4>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono">Stockout Alert</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs">
                  <div className="font-bold text-slate-100">Wireless Earbuds v2 (SKU #4829)</div>
                  <p className="text-slate-300 mt-0.5">Stock remaining: <strong>14 units</strong> (Est. runout in 1.2 days based on current order spikes).</p>
                  <button className="mt-2 px-3 py-1 rounded bg-rose-500 hover:bg-rose-400 text-slate-950 font-bold text-[11px] transition-all">
                    Generate Supplier PO (100 units)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 4: Dynamic Price Optimization */}
          <div className={`p-5 rounded-2xl border transition-all ${activeFeatureTab === 4 ? 'bg-slate-800/80 border-indigo-500/50 ring-1 ring-indigo-500/30' : 'bg-slate-950/60 border-slate-800'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Tags className="w-5 h-5 text-purple-400" />
                <h4 className="text-sm font-bold text-slate-100">Feature 4: Dynamic Price Adjuster</h4>
              </div>
              <span className="text-xs text-purple-300 font-mono">Margin Guard</span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Festive Discount Slider:</span>
                <span className="font-bold text-indigo-300">{discountPercent}% OFF</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                <div className="flex justify-between text-slate-400">
                  <span>List Price: ₹2,499</span>
                  <span>Effective Price: <strong className="text-emerald-400">₹{(2499 * (1 - discountPercent / 100)).toFixed(0)}</strong></span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Target Profit Margin:</span>
                  <span className={discountPercent > 20 ? 'text-amber-400 font-bold' : 'text-emerald-400 font-bold'}>
                    {(32 - discountPercent * 0.8).toFixed(1)}% {discountPercent > 20 && '(Low Margin)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature 3: Smart Order Fulfillment & Batch Dispatch Tracker */}
        <div className={`p-5 rounded-2xl border transition-all ${activeFeatureTab === 3 ? 'bg-slate-800/80 border-indigo-500/50 ring-1 ring-indigo-500/30' : 'bg-slate-950/60 border-slate-800'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Truck className="w-5 h-5 text-amber-400" />
              <h4 className="text-sm font-bold text-slate-100">Feature 3: Batch Order Dispatch Workflow</h4>
            </div>
            
            <button
              onClick={handleBatchDispatch}
              className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center space-x-1.5 shadow-md shadow-amber-500/10"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Batch Dispatch ({selectedOrders.length})</span>
            </button>
          </div>

          {dispatchStatus && (
            <div className="mb-3 p-2.5 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-medium animate-fadeIn">
              ✓ {dispatchStatus}
            </div>
          )}

          <div className="space-y-2 overflow-x-auto">
            {orders.map((ord) => (
              <div key={ord.id} className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(ord.id)}
                    onChange={() => toggleOrderSelect(ord.id)}
                    className="rounded bg-slate-950 border-slate-700 text-indigo-500 focus:ring-0 w-4 h-4"
                  />
                  <div>
                    <div className="font-bold text-slate-200">{ord.customer} <span className="text-slate-500 font-normal">({ord.items})</span></div>
                    <div className="text-slate-400 text-[11px]">{ord.courier} • <strong className="text-slate-300">{ord.amount}</strong></div>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold ${
                  ord.status.includes('Dispatched') ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {ord.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Feature 5: Buyer Review Sentiment Analysis */}
        <div className={`p-5 rounded-2xl border transition-all ${activeFeatureTab === 5 ? 'bg-slate-800/80 border-indigo-500/50 ring-1 ring-indigo-500/30' : 'bg-slate-950/60 border-slate-800'}`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <MessageSquareText className="w-5 h-5 text-rose-400" />
              <h4 className="text-sm font-bold text-slate-100">Feature 5: AI Review & Return Reason Sentiment Engine</h4>
            </div>
            <span className="text-xs text-emerald-400 font-mono">72% Positive CSAT</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="col-span-1 h-32 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sentimentData} innerRadius={25} outerRadius={45} paddingAngle={4} dataKey="value">
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="col-span-2 space-y-2 text-xs">
              <div className="font-semibold text-slate-300">Top Detected Customer Return Reasons (AI Cluster):</div>
              <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>1. "Sizing slightly snug on wrist"</span>
                  <span className="text-amber-400 font-mono">48% of returns</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>2. "Packaging box crushed during transit"</span>
                  <span className="text-rose-400 font-mono">32% of returns</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                *AI Action Suggestion: Upgrade to double-walled corrugated box for courier dispatch to reduce crushed packaging returns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MOVIE_JOURNEY_STEPS, MOVIE_DATA } from '../data/mockData';
import { UserJourneyStep, Seat } from '../types';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Film, 
  CheckCircle2, 
  QrCode, 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  ShoppingBag, 
  CreditCard, 
  Share2, 
  ArrowRight, 
  ArrowLeft,
  Info,
  ChevronRight
} from 'lucide-react';

export const MovieUserJourney: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [selectedCity, setSelectedCity] = useState<string>('Bengaluru');
  const [selectedShowtime, setSelectedShowtime] = useState<string>('07:30 PM (Today)');
  
  // Interactive Seat selection state
  const initialSeats: Seat[] = [
    // Recliner (Row A)
    { id: 'A1', row: 'A', num: 1, category: 'Recliner', price: 450, isBooked: false },
    { id: 'A2', row: 'A', num: 2, category: 'Recliner', price: 450, isBooked: false },
    { id: 'A3', row: 'A', num: 3, category: 'Recliner', price: 450, isBooked: true },
    { id: 'A4', row: 'A', num: 4, category: 'Recliner', price: 450, isBooked: true },
    { id: 'A5', row: 'A', num: 5, category: 'Recliner', price: 450, isBooked: false },
    { id: 'A6', row: 'A', num: 6, category: 'Recliner', price: 450, isBooked: false },
    // Prime (Row B)
    { id: 'B1', row: 'B', num: 1, category: 'Prime', price: 280, isBooked: false },
    { id: 'B2', row: 'B', num: 2, category: 'Prime', price: 280, isBooked: false },
    { id: 'B3', row: 'B', num: 3, category: 'Prime', price: 280, isBooked: false },
    { id: 'B4', row: 'B', num: 4, category: 'Prime', price: 280, isBooked: false },
    { id: 'B5', row: 'B', num: 5, category: 'Prime', price: 280, isBooked: true },
    { id: 'B6', row: 'B', num: 6, category: 'Prime', price: 280, isBooked: false },
    // Classic (Row C)
    { id: 'C1', row: 'C', num: 1, category: 'Classic', price: 180, isBooked: false },
    { id: 'C2', row: 'C', num: 2, category: 'Classic', price: 180, isBooked: false },
    { id: 'C3', row: 'C', num: 3, category: 'Classic', price: 180, isBooked: false },
    { id: 'C4', row: 'C', num: 4, category: 'Classic', price: 180, isBooked: false },
    { id: 'C5', row: 'C', num: 5, category: 'Classic', price: 180, isBooked: false },
    { id: 'C6', row: 'C', num: 6, category: 'Classic', price: 180, isBooked: false }
  ];

  const [seats, setSeats] = useState<Seat[]>(initialSeats);
  const [popcornQty, setPopcornQty] = useState<number>(1);
  const [cokeQty, setCokeQty] = useState<number>(1);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card'>('upi');
  const [promoApplied, setPromoApplied] = useState<boolean>(false);

  const selectedSeats = seats.filter(s => s.isSelected);
  const seatsTotal = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const snacksTotal = (popcornQty * 350) + (cokeQty * 150);
  const discountAmount = promoApplied ? 100 : 0;
  const bookingFee = selectedSeats.length > 0 ? 35 : 0;
  const grandTotal = Math.max(0, seatsTotal + snacksTotal + bookingFee - discountAmount);

  const toggleSeat = (seatId: string) => {
    setSeats(prev => prev.map(s => {
      if (s.id === seatId && !s.isBooked) {
        return { ...s, isSelected: !s.isSelected };
      }
      return s;
    }));
  };

  const activeStep: UserJourneyStep = MOVIE_JOURNEY_STEPS[currentStepIndex];

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen p-4 md:p-6 font-sans">
      
      {/* Exercise Title Header */}
      <div className="max-w-6xl mx-auto mb-6 bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-bold uppercase rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Exercise 3: User Journey Mapping
            </span>
            <h1 className="text-xl font-black text-white">Movie Ticket Booking (BookMyShow Flow)</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Step-by-step user journey mapping, touchpoint analysis, friction resolution, and interactive prototype simulation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            disabled={currentStepIndex === 0}
            onClick={() => setCurrentStepIndex(prev => prev - 1)}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Previous Stage
          </button>
          
          <button
            disabled={currentStepIndex === MOVIE_JOURNEY_STEPS.length - 1}
            onClick={() => setCurrentStepIndex(prev => prev + 1)}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-rose-600 hover:bg-rose-500 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center gap-1 shadow-md shadow-rose-600/30"
          >
            Next Stage <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Horizontal Step Stepper Flowchart Bar */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 overflow-x-auto shadow-md scrollbar-none">
          <div className="flex items-center min-w-[700px] justify-between">
            {MOVIE_JOURNEY_STEPS.map((step, idx) => {
              const isActive = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;
              return (
                <div 
                  key={step.id} 
                  onClick={() => setCurrentStepIndex(idx)}
                  className="flex items-center cursor-pointer group flex-1"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-xs transition-all ${
                      isActive 
                        ? 'bg-rose-500 text-white ring-4 ring-rose-500/30 scale-110' 
                        : isPast 
                          ? 'bg-emerald-500 text-black' 
                          : 'bg-slate-700 text-slate-400 group-hover:bg-slate-600'
                    }`}>
                      {isPast ? '✓' : step.id}
                    </div>
                    <span className={`text-[11px] font-bold mt-1.5 max-w-[100px] truncate ${
                      isActive ? 'text-rose-400 font-extrabold' : 'text-slate-400'
                    }`}>
                      {step.screenTitle}
                    </span>
                  </div>

                  {idx < MOVIE_JOURNEY_STEPS.length - 1 && (
                    <div className={`h-0.5 flex-1 mx-2 transition-colors ${
                      isPast ? 'bg-emerald-500' : 'bg-slate-700'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Emotion Curve & Stage Rationale Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Stage Metadata & UX Friction Notes (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  {activeStep.stageName}
                </span>
                <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-slate-700 text-slate-300 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Emotion Score: {activeStep.emotionScore}/5
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-white">{activeStep.screenTitle}</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  <strong className="text-slate-100">User Goal:</strong> {activeStep.userGoal}
                </p>
              </div>

              {/* Touchpoints */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase text-slate-400 block">Key Touchpoints</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeStep.keyTouchpoints.map((tp, i) => (
                    <span key={i} className="px-2 py-1 text-[11px] rounded bg-slate-700/60 text-slate-200 border border-slate-600">
                      • {tp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Friction Points */}
              <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-xl space-y-1">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> UX Friction Point
                </span>
                <ul className="text-xs text-rose-200 list-disc list-inside space-y-0.5">
                  {activeStep.frictionPoints.map((fp, i) => (
                    <li key={i}>{fp}</li>
                  ))}
                </ul>
              </div>

              {/* Design Solution */}
              <div className="p-3 bg-emerald-950/40 border border-emerald-500/30 rounded-xl space-y-1">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Applied Design Solution
                </span>
                <p className="text-xs text-emerald-200 leading-relaxed">
                  {activeStep.designSolution}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Live Interactive Screen Simulator (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950 border-2 border-slate-700 rounded-3xl p-4 md:p-6 shadow-2xl relative">
            <div className="absolute top-3 right-4 text-[10px] uppercase tracking-wider text-slate-500 font-mono">
              Live BMS Screen Prototype • Step {currentStepIndex + 1}/6
            </div>

            {/* SCREEN 1: Discovery & Location */}
            {currentStepIndex === 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-rose-500" />
                    <div>
                      <span className="text-[10px] text-slate-500 uppercase block font-bold">Select City</span>
                      <select 
                        value={selectedCity} 
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="bg-transparent text-sm font-bold text-white outline-none cursor-pointer"
                      >
                        <option value="Bengaluru" className="bg-slate-900">Bengaluru</option>
                        <option value="Mumbai" className="bg-slate-900">Mumbai</option>
                        <option value="Delhi NCR" className="bg-slate-900">Delhi NCR</option>
                      </select>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-xs rounded-full bg-rose-500/20 text-rose-400 font-bold border border-rose-500/30">
                    Now Showing
                  </span>
                </div>

                {/* Movie Featured Hero Banner */}
                <div className={`p-5 rounded-2xl bg-gradient-to-tr ${MOVIE_DATA.posterColor} shadow-xl text-white space-y-3`}>
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 text-[10px] font-extrabold bg-black/50 backdrop-blur-md rounded border border-white/20">
                      ⭐ {MOVIE_DATA.rating}
                    </span>
                    <span className="text-xs font-bold text-amber-300">IMAX 3D</span>
                  </div>

                  <h2 className="text-2xl font-black">{MOVIE_DATA.title}</h2>
                  <p className="text-xs text-amber-100">{MOVIE_DATA.genre} • {MOVIE_DATA.duration}</p>

                  <button 
                    onClick={() => setCurrentStepIndex(1)}
                    className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg"
                  >
                    Book Tickets Now <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 2: Movie & Showtimes */}
            {currentStepIndex === 1 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">{MOVIE_DATA.title}</h3>
                  <p className="text-xs text-slate-400 flex items-center gap-2">
                    <span>{MOVIE_DATA.language}</span> • <span>{selectedCity}</span>
                  </p>
                </div>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-200">
                    <span>{MOVIE_DATA.theater}</span>
                    <span className="text-emerald-400">4.2 km away</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {['04:15 PM', '07:30 PM (Today)', '10:15 PM'].map(slot => (
                      <button
                        key={slot}
                        onClick={() => { setSelectedShowtime(slot); setCurrentStepIndex(2); }}
                        className={`py-2.5 px-3 rounded-lg text-xs font-bold border transition-all ${
                          selectedShowtime === slot 
                            ? 'bg-rose-600 text-white border-rose-500 shadow-md' 
                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                        }`}
                      >
                        {slot}
                        <span className="block text-[9px] text-emerald-400 font-normal mt-0.5">Available</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* SCREEN 3: Interactive Seat Selection Matrix */}
            {currentStepIndex === 2 && (
              <div className="space-y-4">
                <div className="text-center space-y-1">
                  <div className="w-full h-2 bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500 rounded-full opacity-80 shadow-lg shadow-rose-500/20" />
                  <span className="text-[10px] text-slate-400 uppercase font-mono tracking-widest block">ALL EYES THIS WAY (SCREEN)</span>
                </div>

                {/* Seat Matrix Grid */}
                <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  {['Recliner', 'Prime', 'Classic'].map(cat => (
                    <div key={cat} className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold text-slate-400 border-b border-slate-800 pb-1">
                        <span>{cat} Class</span>
                        <span className="text-amber-400">₹{cat === 'Recliner' ? 450 : cat === 'Prime' ? 280 : 180}</span>
                      </div>

                      <div className="flex justify-center gap-2">
                        {seats.filter(s => s.category === cat).map(seat => (
                          <button
                            key={seat.id}
                            disabled={seat.isBooked}
                            onClick={() => toggleSeat(seat.id)}
                            className={`w-8 h-8 rounded text-xs font-bold transition-all flex items-center justify-center border ${
                              seat.isBooked 
                                ? 'bg-slate-800 text-slate-600 border-slate-800 cursor-not-allowed' 
                                : seat.isSelected 
                                  ? 'bg-emerald-500 text-black border-emerald-400 scale-105 shadow-md shadow-emerald-500/20' 
                                  : 'bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600'
                            }`}
                          >
                            {seat.id}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Summary & Proceed CTA */}
                <div className="flex items-center justify-between p-3 bg-slate-900 border border-slate-800 rounded-xl">
                  <div>
                    <span className="text-xs text-slate-400 block">Selected: {selectedSeats.map(s => s.id).join(', ') || 'None'}</span>
                    <span className="text-sm font-black text-emerald-400">Total: ₹{seatsTotal}</span>
                  </div>
                  <button
                    disabled={selectedSeats.length === 0}
                    onClick={() => setCurrentStepIndex(3)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-bold rounded-xl text-xs"
                  >
                    Proceed to Snacks →
                  </button>
                </div>
              </div>
            )}

            {/* SCREEN 4: Snacks & Add-ons */}
            {currentStepIndex === 3 && (
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <ShoppingBag className="w-4 h-4 text-amber-400" /> Grab Popcorn & Drinks
                  </h3>
                  <button 
                    onClick={() => setCurrentStepIndex(4)}
                    className="text-xs font-bold text-slate-400 hover:text-white"
                  >
                    Skip to Payment →
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">Large Salted Popcorn (450g)</h4>
                      <span className="text-xs text-amber-400 font-bold">₹350</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setPopcornQty(Math.max(0, popcornQty - 1))} className="w-6 h-6 rounded bg-slate-800 text-white font-bold text-xs">-</button>
                      <span className="text-xs font-bold text-white w-4 text-center">{popcornQty}</span>
                      <button onClick={() => setPopcornQty(popcornQty + 1)} className="w-6 h-6 rounded bg-slate-800 text-white font-bold text-xs">+</button>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-white">Chilled Fountain Pepsi (600ml)</h4>
                      <span className="text-xs text-amber-400 font-bold">₹150</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => setCokeQty(Math.max(0, cokeQty - 1))} className="w-6 h-6 rounded bg-slate-800 text-white font-bold text-xs">-</button>
                      <span className="text-xs font-bold text-white w-4 text-center">{cokeQty}</span>
                      <button onClick={() => setCokeQty(cokeQty + 1)} className="w-6 h-6 rounded bg-slate-800 text-white font-bold text-xs">+</button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStepIndex(4)}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl text-xs flex justify-between px-4"
                >
                  <span>Proceed to Pay</span>
                  <span>₹{grandTotal}</span>
                </button>
              </div>
            )}

            {/* SCREEN 5: Payment */}
            {currentStepIndex === 4 && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-emerald-400" /> Payment Summary
                </h3>

                <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Seats ({selectedSeats.map(s => s.id).join(', ')})</span>
                    <span>₹{seatsTotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Snacks & Beverages</span>
                    <span>₹{snacksTotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Convenience Fee</span>
                    <span>₹{bookingFee}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-emerald-400 font-bold">
                      <span>Promo Discount [BOOKNOW50]</span>
                      <span>-₹100</span>
                    </div>
                  )}

                  <hr className="border-slate-800 my-2" />

                  <div className="flex justify-between text-base font-black text-white">
                    <span>Amount Payable</span>
                    <span className="text-emerald-400">₹{grandTotal}</span>
                  </div>
                </div>

                {/* Promo Code Applicator */}
                {!promoApplied && (
                  <button
                    onClick={() => setPromoApplied(true)}
                    className="w-full py-2 text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-xl hover:bg-amber-500/20"
                  >
                    🎉 Apply Coupon [BOOKNOW50] for ₹100 Instant Discount
                  </button>
                )}

                <button
                  onClick={() => setCurrentStepIndex(5)}
                  className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-black rounded-xl text-sm shadow-lg shadow-emerald-500/20"
                >
                  Pay ₹{grandTotal} via 1-Tap UPI
                </button>
              </div>
            )}

            {/* SCREEN 6: Ticket Confirmation */}
            {currentStepIndex === 5 && (
              <div className="p-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 rounded-2xl text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block">BOOKING CONFIRMED</span>
                  <h3 className="text-xl font-black text-white">{MOVIE_DATA.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{MOVIE_DATA.theater}</p>
                </div>

                {/* M-Ticket QR Box */}
                <div className="bg-white p-4 rounded-xl text-slate-900 inline-block shadow-xl space-y-2 max-w-xs mx-auto">
                  <div className="w-32 h-32 bg-slate-900 mx-auto rounded flex items-center justify-center text-white">
                    <QrCode className="w-24 h-24 text-white" />
                  </div>
                  <span className="text-[11px] font-mono font-bold block text-slate-700">TICKET ID: #BMS-2026-90412</span>
                  <div className="text-xs font-bold text-rose-600 pt-1 border-t border-slate-200">
                    Seats: {selectedSeats.map(s => s.id).join(', ')} • Audi 4
                  </div>
                </div>

                <div className="flex justify-center gap-3 text-xs pt-2">
                  <button className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 font-bold flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5" /> Share Ticket
                  </button>
                  <button 
                    onClick={() => setCurrentStepIndex(0)}
                    className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold"
                  >
                    Book Another Movie
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};

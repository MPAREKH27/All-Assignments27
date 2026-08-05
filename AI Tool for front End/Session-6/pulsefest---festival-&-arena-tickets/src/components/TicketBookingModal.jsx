import React, { useState } from 'react';
import { Festival, TicketTier } from '../types';
import { TICKET_TIERS, ADDONS } from '../data/festivals';
import { StadiumSeatMap } from './StadiumSeatMap';
import { X, CheckCircle2, Ticket, QrCode, ShieldCheck, Zap, Sparkles, MapPin, Calendar, Clock } from 'lucide-react';

interface TicketBookingModalProps {
  festival: Festival;
  onClose: () => void;
}

export const TicketBookingModal: React.FC<TicketBookingModalProps> = ({ festival, onClose }) => {
  const [selectedTier, setSelectedTier] = useState<TicketTier>(TICKET_TIERS[1]); // Default to Gold Enclosure
  const [quantity, setQuantity] = useState<number>(2);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['addon-1']);
  const [step, setStep] = useState<'SELECT' | 'CONFIRMED'>('SELECT');
  const [bookingRef, setBookingRef] = useState<string>('');

  const toggleAddon = (id: string) => {
    setSelectedAddons(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const addonsTotal = selectedAddons.reduce((sum, id) => {
    const addon = ADDONS.find(a => a.id === id);
    return sum + (addon ? addon.price : 0);
  }, 0);

  const ticketsSubtotal = selectedTier.price * quantity;
  const bookingFee = Math.round(ticketsSubtotal * 0.08); // 8% IPL booking fee
  const grandTotal = ticketsSubtotal + addonsTotal + bookingFee;

  const handleConfirmBooking = () => {
    const randomRef = 'PULSE-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(randomRef);
    setStep('CONFIRMED');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl my-8 overflow-hidden text-zinc-100">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-zinc-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-amber-500 to-red-600 rounded-xl shadow-lg">
              <Ticket className="w-6 h-6 text-black" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                BookMyShow & IPL Ticket Arena
              </span>
              <h2 className="text-xl font-black text-white">{festival.title}</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {step === 'SELECT' ? (
          <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Interactive Seat Map & Tier Picker */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Event Quick Info */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-300 bg-zinc-900/40 p-3 rounded-xl border border-zinc-800">
                <span className="flex items-center gap-1.5 font-semibold text-white">
                  <MapPin className="w-3.5 h-3.5 text-red-500" /> {festival.venue}
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-white">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> {festival.date}
                </span>
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> {festival.time}
                </span>
              </div>

              {/* Stadium Seat Map Selector */}
              <StadiumSeatMap
                tiers={TICKET_TIERS}
                selectedTier={selectedTier}
                onSelectTier={setSelectedTier}
              />

              {/* Ticket Quantity Selector */}
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-white text-sm">Select Quantity</h4>
                  <p className="text-xs text-zinc-400">Max 8 tickets per IPL Fan Pass account</p>
                </div>
                <div className="flex items-center gap-3 bg-zinc-950 p-1.5 rounded-lg border border-zinc-800">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-md bg-zinc-800 hover:bg-zinc-700 font-bold text-white text-base flex items-center justify-center transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-bold text-lg text-amber-400">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(8, quantity + 1))}
                    className="w-8 h-8 rounded-md bg-zinc-800 hover:bg-zinc-700 font-bold text-white text-base flex items-center justify-center transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Exclusive Addons & IPL Fan Kit */}
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-5 space-y-3">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" /> Matchday Merch & Gate Add-ons
                </h4>
                <div className="space-y-2">
                  {ADDONS.map(addon => {
                    const isSelected = selectedAddons.includes(addon.id);
                    return (
                      <label
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500/50 text-white'
                            : 'bg-zinc-950/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {}}
                            className="rounded border-zinc-700 text-amber-500 focus:ring-amber-500 bg-zinc-900"
                          />
                          <span className="text-xs font-semibold">{addon.name}</span>
                        </div>
                        <span className="text-xs font-bold text-amber-400">+₹{addon.price}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Column: Checkout Summary & Booking Action */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 bg-zinc-900/60 border border-zinc-800 p-6 rounded-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
                  <h3 className="font-bold text-lg text-white">Order Summary</h3>
                  <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    ⚡ Instant E-Ticket Pass
                  </span>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-zinc-300">
                    <span>{selectedTier.name} (x{quantity})</span>
                    <span className="font-bold">₹{ticketsSubtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {selectedAddons.length > 0 && (
                    <div className="flex justify-between text-zinc-400 text-xs">
                      <span>Add-ons Total ({selectedAddons.length})</span>
                      <span className="font-semibold text-zinc-300">+₹{addonsTotal.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-zinc-400 text-xs">
                    <span>Convenience & Booking Fee (8%)</span>
                    <span className="font-semibold text-zinc-300">+₹{bookingFee.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Total Price Display */}
                <div className="pt-4 border-t border-zinc-800 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Total Payable</span>
                    <p className="text-2xl font-black text-amber-400">₹{grandTotal.toLocaleString('en-IN')}</p>
                  </div>
                  <span className="text-[10px] text-zinc-500 font-medium">Taxes Included</span>
                </div>

                {/* Guarantee Badges */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800/80">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>BookMyShow Official Partner Guarantee</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800/80">
                    <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Instant Entry QR via WhatsApp & Wallet</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleConfirmBooking}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-black font-black text-base tracking-wide shadow-xl shadow-amber-500/20 transition-all duration-300 transform active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>PROCEED TO PAY ₹{grandTotal.toLocaleString('en-IN')}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Booking Confirmation View */
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30 uppercase tracking-widest">
                BOOKING CONFIRMED & ISSUED
              </span>
              <h2 className="text-3xl font-black text-white mt-2">Get Ready for the Stadium Surge!</h2>
              <p className="text-zinc-400 text-sm mt-1 max-w-md mx-auto">
                Your BookMyShow + IPL official digital festival passes have been generated and sent to your phone.
              </p>
            </div>

            {/* Digital Pass Ticket Box */}
            <div className="max-w-md mx-auto bg-gradient-to-b from-zinc-900 to-zinc-950 border border-amber-500/40 rounded-2xl p-6 shadow-2xl relative overflow-hidden text-left">
              {/* Decorative side notches */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-zinc-950 rounded-full border border-zinc-800" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-zinc-950 rounded-full border border-zinc-800" />

              <div className="flex items-center justify-between pb-4 border-b border-dashed border-zinc-700">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">BOOKING REF</span>
                  <p className="text-lg font-black text-white">{bookingRef}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold">STADIUM GATE</span>
                  <p className="text-sm font-bold text-amber-400">GATE 4B (VIP ACCESS)</p>
                </div>
              </div>

              <div className="py-4 space-y-2">
                <h4 className="font-bold text-white text-base">{festival.title}</h4>
                <p className="text-xs text-zinc-300 font-medium">{festival.venue}</p>
                <div className="flex justify-between text-xs text-zinc-400 pt-1">
                  <span>{festival.date} • {festival.time}</span>
                  <span className="font-bold text-amber-400">{selectedTier.name} ({quantity} Tickets)</span>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="pt-4 border-t border-dashed border-zinc-700 flex items-center justify-between bg-zinc-950 p-4 rounded-xl border border-zinc-800">
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 uppercase">SCAN AT ENTRY TURNSTILE</p>
                  <p className="text-xs text-zinc-300 font-mono mt-0.5">AUTH: {bookingRef}-STADIUM-OK</p>
                </div>
                <div className="bg-white p-2 rounded-lg">
                  <QrCode className="w-12 h-12 text-black" />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
              >
                Back to Festival Arena
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

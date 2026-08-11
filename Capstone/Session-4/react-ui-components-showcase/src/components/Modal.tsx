import React, { useEffect, useRef, useState } from 'react';
import { X, Ticket, Calendar, Clock, MapPin, CheckCircle2, Film, Sparkles } from 'lucide-react';
import { TicketBookingDetails } from '../types';

interface ModalProps {
  /** Visibility state controlled by parent */
  isOpen: boolean;
  /** Close callback prop */
  onClose: () => void;
  /** Modal Title */
  title?: string;
  /** Optional custom content if not using default ticket form */
  children?: React.ReactNode;
}

const MOVIES = [
  { id: '1', title: 'IPL 2026 Final: CSK vs RCB', venue: 'M. Chinnaswamy Stadium, Bengaluru', poster: '🏏' },
  { id: '2', title: 'Avatar: Fire and Ash (IMAX 3D)', venue: 'PVR IMAX, Phoenix Mall', poster: '🌌' },
  { id: '3', title: 'Spider-Man: Beyond Spider-Verse', venue: 'INOX Megaplex, Connaught Place', poster: '🕷️' },
];

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title = 'Book Movie & Event Tickets',
  children,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Ticket Form Local State
  const [selectedMovie, setSelectedMovie] = useState(MOVIES[0]);
  const [date, setDate] = useState('2026-05-28');
  const [timeSlot, setTimeSlot] = useState('07:30 PM');
  const [category, setCategory] = useState<'Classic' | 'Executive' | 'VIP'>('Executive');
  const [ticketsCount, setTicketsCount] = useState(2);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  // Close on Escape Key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle Backdrop Click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  // Category Pricing Map
  const priceMap = {
    Classic: 250,
    Executive: 450,
    VIP: 850,
  };

  const basePrice = priceMap[category] * ticketsCount;
  const convenienceFee = Math.round(basePrice * 0.12);
  const totalPrice = basePrice + convenienceFee;

  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) {
      alert('Please fill in your name and email address.');
      return;
    }
    const refCode = 'BMS-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(refCode);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      id="modal-backdrop-overlay"
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md transition-all animate-in fade-in duration-200"
    >
      <div
        ref={modalRef}
        id="book-ticket-modal-container"
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 text-white p-6 relative">
          <button
            id="close-modal-btn"
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
                BookMyShow Style
              </span>
              <h2 className="text-xl font-black text-white tracking-tight mt-0.5">
                {title}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {children ? (
            children
          ) : isSubmitted ? (
            /* Success Ticket Confirmation Screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">Booking Confirmed!</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Ticket reference: <span className="font-mono font-bold text-rose-600">{bookingRef}</span>
                </p>
              </div>

              {/* Digital Ticket Stencil */}
              <div className="bg-slate-50 border-2 border-dashed border-rose-200 rounded-2xl p-4 text-left space-y-3 relative overflow-hidden">
                <div className="flex justify-between items-start border-b border-rose-100 pb-3">
                  <div>
                    <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Show Ticket</span>
                    <h4 className="font-bold text-slate-900 text-base">{selectedMovie.title}</h4>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" /> {selectedMovie.venue}
                    </p>
                  </div>
                  <span className="text-2xl">{selectedMovie.poster}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Date & Time</span>
                    <span className="font-semibold text-slate-800">{date} at {timeSlot}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Seats & Class</span>
                    <span className="font-semibold text-slate-800">{ticketsCount} Seats ({category})</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Holder Name</span>
                    <span className="font-semibold text-slate-800">{userName}</span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 font-bold uppercase">Total Paid</span>
                    <span className="font-bold text-rose-600 text-sm">₹{totalPrice}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-500">
                A confirmation email with QR code has been sent to <span className="font-semibold text-slate-800">{userEmail}</span>.
              </p>

              <button
                id="done-booking-btn"
                onClick={handleResetAndClose}
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-md transition-colors"
              >
                Done
              </button>
            </div>
          ) : (
            /* Ticket Booking Form */
            <form onSubmit={handleSubmitBooking} className="space-y-5">
              {/* Event / Movie Dropdown */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Film className="w-4 h-4 text-rose-500" /> Select Show / Event
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {MOVIES.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMovie(m)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedMovie.id === m.id
                          ? 'border-rose-500 bg-rose-50/80 ring-2 ring-rose-200'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{m.poster}</span>
                        <div>
                          <p className="text-sm font-bold text-slate-900">{m.title}</p>
                          <p className="text-xs text-slate-500">{m.venue}</p>
                        </div>
                      </div>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${selectedMovie.id === m.id ? 'border-rose-600 bg-rose-600' : 'border-slate-300'}`}>
                        {selectedMovie.id === m.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-rose-500" /> Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-rose-500" /> Show Time
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                  >
                    <option value="11:00 AM">11:00 AM (Morning)</option>
                    <option value="03:15 PM">03:15 PM (Matinee)</option>
                    <option value="07:30 PM">07:30 PM (Evening)</option>
                    <option value="10:45 PM">10:45 PM (Night)</option>
                  </select>
                </div>
              </div>

              {/* Seat Category & Quantity */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400 font-semibold text-slate-800"
                  >
                    <option value="Classic">Classic (₹250)</option>
                    <option value="Executive">Executive (₹450)</option>
                    <option value="VIP">VIP Recliner (₹850)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Quantity
                  </label>
                  <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden h-[34px]">
                    <button
                      type="button"
                      onClick={() => setTicketsCount(Math.max(1, ticketsCount - 1))}
                      className="w-10 h-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-bold text-sm text-slate-800">
                      {ticketsCount}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTicketsCount(Math.min(10, ticketsCount + 1))}
                      className="w-10 h-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* User Information */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="e.g. rahul@example.com"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                    required
                  />
                </div>
              </div>

              {/* Order Summary Box */}
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <p className="text-slate-500 font-medium">Tickets Subtotal: ₹{basePrice}</p>
                  <p className="text-slate-400 text-[10px]">Incl. ₹{convenienceFee} convenience fee</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Payable</span>
                  <span className="text-lg font-black text-rose-600">₹{totalPrice}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="confirm-booking-btn"
                  className="flex-2 py-3 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 rounded-xl shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Proceed to Pay ₹{totalPrice}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/store';
import { fetchOffers } from '../redux/actions/offerActions';
import { applyCoupon } from '../redux/actions/cartActions';
import { Zap, RefreshCw, Tag, Check, Clock } from 'lucide-react';

export const OffersBanner: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: offers, loading, error, lastFetched } = useSelector(
    (state: RootState) => state.offers
  );
  const appliedCoupon = useSelector(
    (state: RootState) => state.cart.appliedCoupon
  );

  const handleFetchOffers = () => {
    dispatch(fetchOffers());
  };

  const handleApplyCoupon = (code: string, discount: number) => {
    dispatch(applyCoupon(code, discount));
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white shadow-xl border border-indigo-900/50">
      {/* Decorative Glow Elements */}
      <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-purple-500/20 blur-3xl" />

      <div className="relative z-10 space-y-6">
        {/* Banner Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-semibold text-indigo-300 border border-indigo-500/30">
              <Zap className="h-3.5 w-3.5 text-amber-400" />
              <span>Redux-Thunk Async Middleware API</span>
            </div>
            <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">
              Special Discount Offers & Promo Coupons
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Requirement 4: Dispatches <code className="rounded bg-indigo-900/80 px-1.5 py-0.5 font-mono text-indigo-200">fetchOffers()</code> thunk which uses <code className="rounded bg-indigo-900/80 px-1.5 py-0.5 font-mono text-indigo-200">setTimeout</code> to mock a 1.5s asynchronous API request and update Redux state.
            </p>
          </div>

          {/* Trigger Async Thunk Button */}
          <button
            onClick={handleFetchOffers}
            disabled={loading}
            className={`flex shrink-0 items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-xs font-bold text-white shadow-lg transition-all hover:bg-indigo-500 hover:shadow-indigo-500/25 active:scale-95 ${
              loading ? 'cursor-wait opacity-80' : ''
            }`}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Fetching from API...' : 'Fetch Offers via Thunk'}</span>
          </button>
        </div>

        {/* Loading Progress Bar */}
        {loading && (
          <div className="space-y-2 rounded-2xl bg-slate-900/60 p-4 border border-indigo-500/30 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs font-medium text-indigo-200">
              <span className="flex items-center gap-2">
                <RefreshCw className="h-3.5 w-3.5 animate-spin text-amber-400" />
                Simulating API Network Latency (1500ms setTimeout)...
              </span>
              <span className="font-mono text-amber-400">dispatch(FETCH_OFFERS_START)</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
              <div className="h-full w-full bg-linear-to-r from-amber-400 via-indigo-400 to-purple-400 animate-pulse" />
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="rounded-xl bg-rose-950/60 p-3 text-xs font-medium text-rose-300 border border-rose-800/50">
            Error fetching offers: {error}
          </div>
        )}

        {/* Fetched Offers Grid */}
        {!loading && offers.length > 0 && (
          <div>
            <div className="mb-3 flex items-center justify-between text-xs text-indigo-300">
              <span className="font-semibold text-white">Active Discounts Available:</span>
              {lastFetched && (
                <span className="flex items-center gap-1 text-[11px] text-slate-400">
                  <Clock className="h-3 w-3" />
                  Last synced: {lastFetched}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {offers.map((offer) => {
                const isApplied = appliedCoupon === offer.code;

                return (
                  <div
                    key={offer.id}
                    className={`relative flex flex-col justify-between rounded-2xl bg-linear-to-br ${offer.bgGradient} p-4 text-white shadow-md transition-all hover:scale-[1.02] border border-white/10`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="rounded-full bg-black/30 px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase backdrop-blur-md">
                          {offer.tag}
                        </span>
                        <span className="font-mono text-xs font-bold text-amber-200">
                          {offer.code}
                        </span>
                      </div>

                      <h4 className="mt-2 text-sm font-bold">{offer.title}</h4>
                      <p className="mt-1 text-xs text-white/80 line-clamp-2">
                        {offer.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                      <div className="text-xs">
                        <span className="text-white/70">Min. order: </span>
                        <span className="font-bold">${offer.minAmount}</span>
                      </div>

                      <button
                        onClick={() => handleApplyCoupon(offer.code, offer.discountPercent)}
                        disabled={isApplied}
                        className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                          isApplied
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'bg-white text-slate-900 hover:bg-slate-100 active:scale-95'
                        }`}
                      >
                        {isApplied ? (
                          <>
                            <Check className="h-3 w-3" />
                            <span>Applied</span>
                          </>
                        ) : (
                          <>
                            <Tag className="h-3 w-3" />
                            <span>Apply</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty state prompt before fetching */}
        {!loading && offers.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-slate-900/40 p-6 text-center border border-indigo-900/40">
            <p className="text-xs text-slate-300">
              No offers loaded in state yet. Click <strong className="text-indigo-300">"Fetch Offers via Thunk"</strong> above to dispatch the async Thunk action!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

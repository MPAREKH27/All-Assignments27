import React, { useState, useEffect } from 'react';
import { Utensils, Star, Edit3, Trash2, Plus, CheckCircle2, MessageSquare, Building2, Save, X } from 'lucide-react';
import { RestaurantReview } from '../types';
import { fetchReviewsFromFirestore, addReviewToFirestore, updateReviewInFirestore, deleteReviewFromFirestore } from '../lib/firebase';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<RestaurantReview[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New Review Form State (Requirement 2: addDoc)
  const [restaurantName, setRestaurantName] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [cuisine, setCuisine] = useState<string>('General');

  // Edit Review Modal State (Requirement 4: updateDoc)
  const [editingReview, setEditingReview] = useState<RestaurantReview | null>(null);
  const [editRating, setEditRating] = useState<number>(5);
  const [editComment, setEditComment] = useState<string>('');
  const [updating, setUpdating] = useState<boolean>(false);

  const loadReviews = async () => {
    setLoading(true);
    const res = await fetchReviewsFromFirestore();
    setReviews(res.data);
    setLoading(false);
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Requirement 2: Submit Handler using addDoc()
  const handleAddReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurantName.trim() || !comment.trim()) return;

    setSubmitting(true);
    const newReview = {
      restaurantName,
      rating: Number(rating),
      comment,
      cuisine: cuisine || 'General'
    };

    const res = await addReviewToFirestore(newReview);
    setSubmitting(false);

    if (!res.error) {
      setRestaurantName('');
      setComment('');
      setRating(5);
      showToast('✅ Review saved to Firestore using addDoc()!');
      await loadReviews();
    }
  };

  // Requirement 4: Open Edit Modal
  const openEditModal = (review: RestaurantReview) => {
    setEditingReview(review);
    setEditRating(review.rating);
    setEditComment(review.comment);
  };

  // Requirement 4: Submit Handler using updateDoc()
  const handleUpdateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview || !editComment.trim()) return;

    setUpdating(true);
    const res = await updateReviewInFirestore(editingReview.id, {
      rating: editRating,
      comment: editComment
    });
    setUpdating(false);

    if (res.success) {
      setEditingReview(null);
      showToast('✏️ Review updated in Firestore using updateDoc()!');
      // UI updates after saving
      await loadReviews();
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (confirm('Are you sure you want to delete this review from Firestore?')) {
      await deleteReviewFromFirestore(id);
      showToast('🗑️ Review removed from Firestore.');
      await loadReviews();
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-amber-500 text-slate-950 px-4 py-3 rounded-xl font-semibold shadow-xl border border-amber-400 flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5" />
          {toastMessage}
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30">
            <Utensils className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold tracking-tight">Restaurant Reviews</h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                Firestore 'restaurant_reviews'
              </span>
            </div>
            <p className="text-slate-400 text-sm mt-0.5">
              Req 2 & 4: Add new reviews with <code className="text-amber-400 bg-amber-950/60 px-1 py-0.5 rounded font-mono text-xs">addDoc()</code> and edit existing comments/ratings with <code className="text-amber-400 bg-amber-950/60 px-1 py-0.5 rounded font-mono text-xs">updateDoc()</code>.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Requirement 2: Add New Review Form */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl text-white space-y-5 h-fit">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-lg font-bold flex items-center gap-2 text-amber-400">
              <Plus className="w-5 h-5" />
              Add Restaurant Review (addDoc)
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Submit a new review to save directly to Firestore collection.
            </p>
          </div>

          <form onSubmit={handleAddReview} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Restaurant Name *
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Olive Garden or Taj Mahal"
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Rating (1-5 Stars) *
                </label>
                <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 cursor-pointer focus:outline-none"
                    >
                      <Star
                        className={`w-5 h-5 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Cuisine Type
                </label>
                <input
                  type="text"
                  placeholder="Italian, Indian, etc."
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Comment & Detailed Review *
              </label>
              <textarea
                rows={3}
                required
                placeholder="Write your honest opinion about the food, ambiance, and service..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-amber-500/20 cursor-pointer flex items-center justify-center gap-2"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <span className="animate-spin w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full" />
                  Saving to Firestore...
                </span>
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  Save Review (addDoc)
                </>
              )}
            </button>
          </form>
        </div>

        {/* Review List & Edit Actions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              All Reviews ({reviews.length})
            </h3>
            <span className="text-xs text-amber-400 font-mono">
              firestore.collection('restaurant_reviews')
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400">
              <div className="animate-spin w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full mx-auto mb-2" />
              Loading reviews...
            </div>
          ) : reviews.length === 0 ? (
            <div className="p-12 text-center bg-slate-900/50 rounded-2xl border border-slate-800 text-slate-400">
              No reviews added yet. Submit your first review using the form!
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 text-white transition-all shadow-md group relative"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-lg font-bold text-slate-100">{rev.restaurantName}</h4>
                        {rev.cuisine && (
                          <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-800 text-amber-300 border border-slate-700">
                            {rev.cuisine}
                          </span>
                        )}
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={`w-4 h-4 ${
                              s <= rev.rating
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-slate-700'
                            }`}
                          />
                        ))}
                        <span className="text-xs font-bold text-amber-400 ml-1">
                          {rev.rating}.0 / 5.0
                        </span>
                      </div>
                    </div>

                    {/* Action buttons (Requirement 4: Edit Button) */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEditModal(rev)}
                        className="p-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 rounded-xl border border-amber-500/30 transition-colors cursor-pointer flex items-center gap-1.5 text-xs font-semibold"
                        title="Edit Review in Firestore (updateDoc)"
                      >
                        <Edit3 className="w-4 h-4" />
                        Edit
                      </button>

                      <button
                        onClick={() => handleDeleteReview(rev.id)}
                        className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30 transition-colors cursor-pointer"
                        title="Delete Review"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <p className="text-slate-300 text-sm mt-3 bg-slate-800/40 p-3 rounded-xl border border-slate-800/80 italic">
                    "{rev.comment}"
                  </p>

                  <div className="flex items-center justify-between text-xs text-slate-500 mt-3 pt-2 border-t border-slate-800/60 font-mono">
                    <span>Doc ID: {rev.id}</span>
                    <span className="text-amber-400/80">updateDoc() ready</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Requirement 4: Edit Review Modal */}
      {editingReview && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-lg rounded-2xl p-6 shadow-2xl text-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold">
                  Edit Review for "{editingReview.restaurantName}"
                </h3>
              </div>
              <button
                onClick={() => setEditingReview(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Constraint: Update comment and rating using Firestore's <code className="text-amber-400 bg-amber-950 px-1 py-0.5 rounded">updateDoc()</code> method.
            </p>

            <form onSubmit={handleUpdateReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Updated Rating (1-5 Stars)
                </label>
                <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setEditRating(star)}
                      className="p-1 cursor-pointer focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= editRating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Updated Comment *
                </label>
                <textarea
                  rows={4}
                  required
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm rounded-xl cursor-pointer shadow-lg shadow-amber-500/20 flex items-center gap-2"
                >
                  {updating ? (
                    <span>Updating...</span>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes (updateDoc)
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

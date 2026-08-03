import PropTypes from "prop-types";

// ══════════════════════════════════════════════════════════════
// Q2 & Q3 (Session-3) — UserProfile Component
// Props: username (string), followers (number), profilePic (string)
// Default Props handle missing followers and profilePic.
// ══════════════════════════════════════════════════════════════
function UserProfile({ username, followers, profilePic }) {
  return (
    <div className="up-card">
      {/* Gradient ring around avatar */}
      <div className="up-avatar-ring">
        <img
          src={profilePic}
          alt={`${username} profile`}
          className="up-avatar"
          onError={(e) => {
            e.target.src =
              "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(username) +
              "&background=7c3aed&color=fff&size=128";
          }}
        />
      </div>

      {/* Username */}
      <h3 className="up-username">@{username}</h3>
      <p className="up-handle">Instagram Profile</p>

      {/* Stats row */}
      <div className="up-stats">
        <div className="up-stat">
          <span className="up-stat-val">{followers.toLocaleString("en-IN")}</span>
          <span className="up-stat-label">Followers</span>
        </div>
        <div className="up-stat-divider" />
        <div className="up-stat">
          <span className="up-stat-val">✓</span>
          <span className="up-stat-label">Verified</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className="up-actions">
        <button className="up-follow-btn" id={`follow-${username}`}>Follow</button>
        <button className="up-msg-btn"    id={`msg-${username}`}>Message</button>
      </div>

      {/* Default-props note */}
      <p className="up-default-note">
        <code>defaultProps</code>: followers → <em>0</em> · profilePic → <em>placeholder URL</em>
      </p>
    </div>
  );
}

// ── Default Props (fallbacks when props are not provided) ─────
UserProfile.defaultProps = {
  followers:  0,
  profilePic: "https://ui-avatars.com/api/?name=User&background=7c3aed&color=fff&size=128",
};

// ── Prop-Type Validation ──────────────────────────────────────
UserProfile.propTypes = {
  username:   PropTypes.string.isRequired,
  followers:  PropTypes.number,
  profilePic: PropTypes.string,
};

export default UserProfile;

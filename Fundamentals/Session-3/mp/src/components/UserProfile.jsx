// Task 2: UserProfile component — Instagram-style mini profile card
// Task 3: defaultProps for followers (0) and profilePic (default image URL)
//
// NOTE: React 19 removed defaultProps support for function components.
// The recommended modern alternative is JavaScript default parameter values,
// which is functionally identical to defaultProps. We declare the old-style
// defaultProps object below as well for educational reference — it still works
// in React 17/18 but is now superseded.

import PropTypes from "prop-types";

const DEFAULT_PIC =
  "https://ui-avatars.com/api/?name=User&background=7c3aed&color=fff&size=128";

// Task 3: Default parameter values (modern equivalent of defaultProps)
function UserProfile({
  username,
  followers = 0,          // default: 0
  profilePic = DEFAULT_PIC, // default: placeholder avatar
}) {
  return (
    <div className="profile-card">
      {/* Gradient banner */}
      <div className="profile-banner" />

      {/* Avatar */}
      <div className="profile-avatar-wrap">
        <img
          className="profile-avatar"
          src={profilePic}
          alt={`${username}'s profile`}
          onError={(e) => {
            e.target.src =
              "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(username) +
              "&background=7c3aed&color=fff&size=128";
          }}
        />
      </div>

      {/* Info */}
      <div className="profile-info">
        <h2 className="profile-username">@{username}</h2>
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-value">{followers.toLocaleString()}</span>
            <span className="stat-label">Followers</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">—</span>
            <span className="stat-label">Following</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">—</span>
            <span className="stat-label">Posts</span>
          </div>
        </div>
        <button className="follow-btn">Follow</button>
      </div>
    </div>
  );
}

// Task 3 (legacy pattern, shown for study): defaultProps object
// Works in React 17/18; deprecated/removed in React 19+
UserProfile.defaultProps = {
  followers: 0,
  profilePic: DEFAULT_PIC,
};

// PropTypes
UserProfile.propTypes = {
  username: PropTypes.string.isRequired,
  followers: PropTypes.number,
  profilePic: PropTypes.string,
};

export default UserProfile;

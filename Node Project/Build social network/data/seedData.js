// Seed data generated for insta-clone application
// Contains 5 realistic user profiles and 10 sample posts

const seedProfiles = [
  {
    username: "alex_wanderer",
    name: "Alex Rivera",
    followers: 14200,
    following: 340,
    bio: "Capturing moments around the world 📸✈️ | Outdoor enthusiast & landscape photographer 🏔️",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
  },
  {
    username: "sophia_creates",
    name: "Sophia Chen",
    followers: 8950,
    following: 512,
    bio: "Digital designer & UI artist 🎨 | Turning complex ideas into delightful visuals ✨",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
  },
  {
    username: "tech_sam",
    name: "Sam Miller",
    followers: 23400,
    following: 189,
    bio: "Full-Stack Dev & Open Source enthusiast 💻 | Building the future one commit at a time 🚀",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  },
  {
    username: "foodie_elena",
    name: "Elena Rostova",
    followers: 5600,
    following: 430,
    bio: "Culinary explorer & home chef 🍝🍷 | Life is too short for boring meals!",
    avatarUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80"
  },
  {
    username: "marcus_fit",
    name: "Marcus Vance",
    followers: 11200,
    following: 275,
    bio: "Personal trainer & wellness coach 🏋️‍♂️ | Discipline over motivation 💪 Let's crush goals together",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
  }
];

const seedPosts = [
  {
    postId: 1,
    username: "alex_wanderer",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    caption: "Golden hour in the Canadian Rockies. The reflection on the lake was completely still. 🌄✨",
    likes: 342,
    createdAt: "2026-10-25T08:30:00.000Z"
  },
  {
    postId: 2,
    username: "sophia_creates",
    imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=800&q=80",
    caption: "Late night studio session experimenting with neon abstract palettes 🎨🖌️ What do you think?",
    likes: 189,
    createdAt: "2026-10-26T14:15:00.000Z"
  },
  {
    postId: 3,
    username: "tech_sam",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    caption: "Clean desk, mechanical keyboard, and a freshly brewed espresso. Ready to deploy! ☕💻",
    likes: 521,
    createdAt: "2026-10-27T09:00:00.000Z"
  },
  {
    postId: 4,
    username: "foodie_elena",
    imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80",
    caption: "Fresh homemade sourdough pizza with creamy burrata and basil straight from the garden 🍕🌿",
    likes: 278,
    createdAt: "2026-10-28T18:45:00.000Z"
  },
  {
    postId: 5,
    username: "marcus_fit",
    imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80",
    caption: "Early morning grind. No shortcuts, just consistent daily effort. Let's get it! 💥🏋️‍♂️",
    likes: 415,
    createdAt: "2026-10-29T06:10:00.000Z"
  },
  {
    postId: 6,
    username: "alex_wanderer",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    caption: "Morning fog drifting through the pine forest. Peaceful silence you can feel. 🌲🌫️",
    likes: 295,
    createdAt: "2026-10-30T07:20:00.000Z"
  },
  {
    postId: 7,
    username: "sophia_creates",
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    caption: "Sneak peek of the responsive dashboard prototype I have been building this week! 📱💡",
    likes: 164,
    createdAt: "2026-10-31T11:05:00.000Z"
  },
  {
    postId: 8,
    username: "foodie_elena",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    caption: "Sunday brunch spread: avocado toast with poached eggs and microgreens 🥑🍳",
    likes: 382,
    createdAt: "2026-11-01T10:30:00.000Z"
  },
  {
    postId: 9,
    username: "tech_sam",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    caption: "Deep dive into cybersecurity and encrypted networks today. Fascinating architecture 🔒⚡",
    likes: 604,
    createdAt: "2026-11-02T16:50:00.000Z"
  },
  {
    postId: 10,
    username: "marcus_fit",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=800&q=80",
    caption: "Completed a 10km trail run at sunrise. Remember: your only competition is who you were yesterday 🏃‍♂️🔥",
    likes: 489,
    createdAt: "2026-11-03T07:00:00.000Z"
  }
];

module.exports = { seedProfiles, seedPosts };


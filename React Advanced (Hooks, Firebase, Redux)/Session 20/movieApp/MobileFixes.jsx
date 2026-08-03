function MobileFixes() {
  const issues = [
    {
      issue: "1. Movie cards stack vertically on mobile, taking too much vertical space",
      description: "On screens below 640px, the grid falls back to 1 column. Each card with its poster (h-48) + padding makes the list very long.",
      fix: "Reduce poster height on mobile using Tailwind responsive classes: change h-48 to h-32 sm:h-48 on the img tag. This saves vertical space on small screens.",
      code: `<img className="w-full h-32 sm:h-48 object-cover" />`,
    },
    {
      issue: "2. Search input and wishlist count button overflow on narrow screens",
      description: "The flex row with the search input and wishlist badge can overflow on screens < 380px, causing horizontal scroll.",
      fix: "Wrap the search row in a flex-col on very small screens, or hide the badge text and only show the heart icon on mobile.",
      code: `<div className="flex flex-col sm:flex-row gap-2">
  <input className="w-full ..." />
  <span className="hidden sm:inline ...">❤ {count}</span>
</div>`,
    },
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-2xl">
      <h2 className="text-2xl font-bold text-white mb-4">
        Task 4: Mobile Usability Issues
      </h2>

      <div className="space-y-4">
        {issues.map((item, i) => (
          <div key={i} className="bg-gray-700 rounded-xl p-4">
            <h3 className="text-yellow-400 font-bold text-sm mb-2">
              {item.issue}
            </h3>
            <p className="text-gray-300 text-xs mb-2">{item.description}</p>
            <div className="bg-gray-800 rounded-lg p-3">
              <p className="text-green-400 text-xs font-semibold mb-1">Fix:</p>
              <p className="text-gray-300 text-xs">{item.fix}</p>
              <pre className="text-gray-400 text-xs font-mono mt-2 whitespace-pre-wrap">
                {item.code}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MobileFixes;
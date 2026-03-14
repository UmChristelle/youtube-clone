const categories = [
  'All', 'New', 'Coding', 'ReactJS', 'NextJS', 'Music',
  'Education', 'Podcast', 'Movie', 'Gaming', 'Live',
  'Football', 'Crypto', 'Fashion', 'Beauty', 'Art',
  'Travel', 'Food', 'History', 'Science', 'Technology',
];

const CategoryPills = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide px-4 py-3">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setSelectedCategory(cat)}
          className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
            ${selectedCategory === cat
              ? 'bg-white text-black'
              : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
};

export default CategoryPills;
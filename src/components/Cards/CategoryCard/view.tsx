interface CategoryCardType {
  item: {
    name: string;
    logo: string;
  };
  onClick: () => void;
}

const CategoryCard = ({ item, onClick }: CategoryCardType) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center justify-center bg-white rounded-[36px] p-[20px] shadow-md transition hover:shadow-lg cursor-pointer"
    >
      <p className="text-center text-[20px] font-semibold  h-[60px] flex items-center justify-center">
        {item.name}
      </p>
      <img
        src={item.logo}
        alt={item.name}
        className="w-[130px] h-[130px] object-contain"
      />
    </div>
  );
};

export default CategoryCard;

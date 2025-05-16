interface CheckingCardType {
  title: string;
  label: string;
  className: string;
}

const CheckingCard = ({ title, label, className }: CheckingCardType) => {
  return (
    <div className={className}>
      <p className="text-[22px] font-[500] text-contentText">{label}</p>
      <p className="text-[24px] font-[700] mt-[10px]">{title}</p>
    </div>
  );
};

export default CheckingCard;

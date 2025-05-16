interface PayQueType {
  img: string;
  title: string;
  subTitle: string;
  desc?: string;
  isHas: boolean;
}
const PayQue = ({ img, title, subTitle, desc, isHas }: PayQueType) => {
  return (
    <div className="flex justify-center flex-col items-center">
      <img className="w-[150px] h-[150px] object-contain" src={img} alt="" />
      <p className="text-[45px] font-[700] my-[25px]">{title}</p>
      <p className="leading-[35px] font-[500] text-[28px] text-[#333333] w-[65%] text-center">
        {subTitle}
      </p>
      {isHas && (
        <p className="font-[500] leading-[31px] w-[70%] text-center mt-[25px] text-[25px] text-[#333333]">
          {desc}
        </p>
      )}
    </div>
  );
};

export default PayQue;

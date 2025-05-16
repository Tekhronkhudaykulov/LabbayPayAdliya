interface LanguageBtnType {
  title: string;
  img: string;
  isHas: boolean;
}

const LanguageBtn = ({ title, img, isHas }: LanguageBtnType) => {
  return (
    <div>
      <div
        className={`bg-[#F7F7F7] h-[78px] flex items-center  ${
          isHas ? "border-b-[5px]" : "border-b-0"
        }  justify-center gap-x-[20px] w-[130px] border-[#5960FE]  rounded-[15px]`}
      >
        <p className="text-[24px] font-[700]">{title}</p>
        <img src={img} alt="" />
      </div>
    </div>
  );
};

export default LanguageBtn;

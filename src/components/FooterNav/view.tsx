import { Button } from "antd";

interface Props {
  prevTitle?: string;
  prevClick?: () => void;
  nextTitle?: string;
  nextClick?: () => void;
  nextLoading?: boolean;
  nextDisabled?: boolean;
  showNextButton?: boolean;
  prevDisabled?: boolean;
  showPrevButton?: boolean;
}

const FooterNav = ({
  prevTitle,
  prevClick,
  nextTitle,
  nextClick,
  nextLoading = false,
  nextDisabled = false,
  showNextButton = true,
  prevDisabled = false,
  showPrevButton = false,
}: Props) => {
  return (
    <div className="flex items-center justify-center gap-3 py-4 mt-auto">
      {showPrevButton ? null : (
        <Button
          disabled={prevDisabled}
          className="uppercase w-[505px]"
          onClick={prevClick}
          type="default"
        >
          {prevTitle ? prevTitle : "Назад"}
        </Button>
      )}

      {showNextButton ? (
        <Button
          disabled={nextDisabled}
          onClick={nextClick}
          loading={nextLoading}
          type="primary"
          className={`!bg-btnGreen uppercase w-[505px] ${
            nextDisabled && "opacity-50"
          }`}
        >
          {nextTitle ? nextTitle : "Продолжить"}
        </Button>
      ) : null}
    </div>
  );
};

export default FooterNav;

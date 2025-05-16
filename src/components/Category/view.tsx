import { EllipsisOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { vendorStore } from "../../store";
// import { useNavigate } from "react-router-dom";
// import { APP_ROUTES } from "../../router";
import { useState } from "react";

const Category = () => {
  // const navigate = useNavigate();
  const { main } = vendorStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 9;
  const totalCategories = main?.categories?.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex: number = Math.min(
    startIndex + pageSize,
    totalCategories || 0
  );
  const paginatedCategories: any[] | undefined = main?.categories?.slice(
    startIndex,
    endIndex
  );

  const nextPage = () => {
    if (currentPage === Math.ceil(totalCategories! / pageSize)) {
      setCurrentPage(1);
    } else {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <div className="flex flex-col gap-[10px] min-w-[22%] w-[22%]">
      {paginatedCategories?.map((item, idx) => (
        <Button
          key={idx}
          type="primary"
          className="flex items-center gap-[7px] rounded-main h-[70px] whitespace-normal"
          icon={
            <img
              src={item?.logo?.link?.toString()}
              alt=""
              className="min-w-[26px] w-[26px] h-[26px] object-contain"
              loading="lazy"
            />
          }
          // onClick={() => navigate(`${APP_ROUTES?.CATEGORY}/${item.id}`)}
        >
          <span className="text-left leading-[18px] line-clamp-2">
            {item.name}
          </span>
        </Button>
      ))}
      <Button
        type="primary"
        className="flex items-center justify-center gap-[7px] rounded-main h-[70px]"
        icon={
          <EllipsisOutlined
            size={60}
            className="[&>svg]:text-[60px] [&>svg]:min-w-[60px] [&>svg]:h-[60px]"
          />
        }
        onClick={nextPage}
      >
        Другое
      </Button>
    </div>
  );
};

export default Category;

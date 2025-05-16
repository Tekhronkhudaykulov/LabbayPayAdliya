import { useNavigate, useParams } from "react-router-dom";
import { FooterNav } from "../../components";
import CategoryCard from "../../components/Cards/CategoryCard/view";

import "./style.scss";
import { APP_ROUTES } from "../../router";
import { useCustomGet } from "../../hook/useCustomGet";
import endpoints from "../../services/endpoints";
import LoadingPage from "../../components/Loading/view";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05, // ketma-ketlik
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const footerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeInOut", delay: 0.2 },
  },
};


const ChooseService = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useCustomGet({
    key: "category",
    endpoint: endpoints.vendor,
    params: {
      categoryId: id,
      size: 500
    },
  });

  return (
    <>
      {isLoading ? (
        <LoadingPage />
      ) : (

         <div className="flex flex-col h-full">
          <div className="rounded-[36px] py-3 overflow-auto grow">
            <motion.div
              className="grid grid-cols-4 h-full items-start py-6 gap-[15px]"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {
                // @ts-ignore
                data?.data?.map((item: any, ind: number) => (
                  <motion.div key={ind} variants={cardVariants}>
                    <CategoryCard
                      item={item}
                      onClick={() =>
                        navigate(`${APP_ROUTES.REPLENISHMENT_FINE}/${item.id}`)
                      }
                    />
                  </motion.div>
                ))
              }
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={footerVariants}
          >
            <FooterNav
              showNextButton={false}
              prevTitle="НАЗАД"
              prevClick={() => navigate(-1)}
            />
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ChooseService;

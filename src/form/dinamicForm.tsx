import { useEffect, useMemo } from "react";
import Select from "react-select";
import InputMask from "react-input-mask";
import { useFormContext } from "../context/inputTypeContext";
import { motion } from "framer-motion";

const formatPrice = (value) => {
  if (!value) return "";
  const num = parseInt(value.toString().replace(/\D/g, ""));
  return isNaN(num) ? "" : num.toLocaleString("ru-RU");
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
};

const fieldFadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const DynamicForm = ({ fields, formData, setFormData }) => {
  // @ts-ignore
  const { setActiveInputKey, setActiveInputType, setValue, form } = useFormContext();

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleFocus = (field) => {
    setActiveInputKey(field.key);
    setActiveInputType(field.type || "text");
  };

  useEffect(() => {
    fields?.forEach((field) => {
      if (field.show === 0 && field.is_required && field.value) {
        setValue(field.key, field.value);
      }
    });
  }, [fields]);

  // 🔵 Region ID ni olish (formdan)
  const selectedRegionId = String(form["region_id"] || "");

  // 🔵 Custom Select styling
  const customSelectStyles = {
    control: (base) => ({
      ...base,
      minHeight: "65px",
      fontSize: "22px",
      fontWeight: 500,
      borderRadius: "12px",
      borderColor: "#D1D5DB",
      paddingLeft: "6px",
    }),
    placeholder: (base) => ({ ...base, color: "#9CA3AF" }),
    option: (base, { isSelected, isFocused }) => ({
      ...base,
      fontSize: "22px",
      backgroundColor: isSelected ? "#3B82F6" : isFocused ? "#EFF6FF" : "white",
      color: isSelected ? "white" : "#111827",
      padding: "12px 16px",
    }),
    singleValue: (base) => ({
      ...base,
      fontSize: "22px",
      fontWeight: 500,
      color: "#111827",
    }),
  };

  return (
    <motion.div
      className="flex flex-col gap-y-[10px]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {fields
        .sort((a, b) => a.order - b.order)
        .map((field) => {
          const value = formData[field.key] ?? field.value ?? "";
          const label = field.label || field.key;
          const inputType = field.type === "int" ? "number" : "text";
          const hasPrefix = !!field.prefix;
          const isPhone = field.key === "clientid";
          const isAmount = field.key === "amount";
          const isSelect = field.element === "select";

          if (field.show === 0) {
            return (
              <input
                key={field.id}
                type="hidden"
                name={field.key}
                value={value}
              />
            );
          }

          // 🔵 Districtni region_id bo‘yicha filter qilish
          let options = field.options || [];
          if (field.key === "district_id") {
            options = options.filter(
              (opt) => String(opt.group_id) === selectedRegionId
            );
          }

          return (
            <motion.div
              key={field.id}
              className="flex flex-col"
              variants={fieldFadeUp}
            >
              <label
                className="text-[22px] font-semibold text-gray-700 mb-2 truncate"
                title={label}
              >
                {label}
              </label>

              {isSelect ? (
                <Select
                  value={options
                    .map((opt) => ({
                      value: String(opt.value),
                      label: opt.text || opt.label_uz || opt.label || opt.value,
                    }))
                    .find((opt) => opt.value === String(form[field.key])) || null
                  }
                  onChange={(selected) =>
                    setValue(field.key, selected?.value || "")
                  }
                  onFocus={() => handleFocus(field)}
                  options={options.map((opt) => ({
                    value: String(opt.value),
                    label: opt.text || opt.label_uz || opt.label || opt.value,
                  }))}
                  placeholder="Tanlang..."
                  isClearable
                  styles={customSelectStyles}
                />
              ) : (
                <div className="relative flex items-center">
                  {hasPrefix && (
                    <span className="absolute pr-[8px] left-0 px-4 py-[17px] text-[22px] font-[500] text-[black] border-r border-gray-300 bg-gray-100 rounded-l-xl">
                      {field.prefix}
                    </span>
                  )}

                  {isPhone ? (
                    <InputMask
                      mask="99 999 99 99"
                      maskChar={null}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      onFocus={() => handleFocus(field)}
                      value={form[field.key] || ""}
                    >
                      {(inputProps) => (
                        <input
                          {...inputProps}
                          type="text"
                          className={`w-full h-[65px] text-[22px] font-medium px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition rounded-xl ${
                            hasPrefix ? "pl-[85px]" : ""
                          }`}
                          placeholder="94 918 71 77"
                          required={!!field.is_required}
                        />
                      )}
                    </InputMask>
                  ) : isAmount ? (
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="1 500 000"
                      value={formatPrice(form[field.key] || "")}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/\D/g, "");
                        handleChange(field.key, raw);
                      }}
                      onFocus={() => handleFocus(field)}
                      required={!!field.is_required}
                      className={`w-full h-[65px] text-[22px] font-medium px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition rounded-xl ${
                        hasPrefix ? "pl-[85px]" : ""
                      }`}
                    />
                  ) : (
                    <input
                      type={inputType}
                      inputMode={inputType === "number" ? "numeric" : "text"}
                      placeholder={field.placeholder || ""}
                      value={form[field.key] || ""}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      onFocus={() => handleFocus(field)}
                      required={!!field.is_required}
                      pattern={field.regex || undefined}
                      min={field.min_amount ?? undefined}
                      max={field.max_amount ?? undefined}
                      className={`w-full h-[65px] text-[22px] font-medium px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition rounded-xl ${
                        hasPrefix ? "pl-[85px]" : ""
                      }`}
                    />
                  )}
                </div>
              )}

              {(field.min_amount || field.max_amount) && (
                <p className="text-[18px] text-gray-500 mt-1">
                  {field.min_amount && `Minimal: ${field.min_amount}`}{" "}
                  {field.max_amount && `| Maksimal: ${field.max_amount}`}
                </p>
              )}
            </motion.div>
          );
        })}
    </motion.div>
  );
};

export default DynamicForm;

export const formData = (
  obj: any,
  form?: FormData,
  namespace?: string
): FormData => {
  const fd = form || new FormData();
  let formKey: string;

  for (const property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      if (namespace) {
        formKey = namespace + "[" + property + "]";
      } else {
        formKey = property;
      }

      if (
        typeof obj[property] === "object" &&
        !(obj[property] instanceof File) &&
        !(obj[property] instanceof Blob)
      ) {
        formData(obj[property], fd, property);
      } else {
        fd.append(formKey, obj[property]);
      }
    }
  }
  return fd;
};

export const formatCreditCardNumber = (
  value: number | string | null
): number | string | null => {
  if (typeof value === "string") {
    const digitsOnly = value.replace(/\D/g, "");
    return digitsOnly.replace(/(\d{4})/g, "$1 ").trim();
  }
  return value as number | string | null;
};

export const formatCVC = (
  value: number | string | null
): string | null | undefined => {
  if (typeof value === "string") {
    const digitsOnly = value.replace(/\D/g, "");
    const formattedNumber = digitsOnly.replace(/(\d{2})(\d{2})/, "$1/$2 ");
    return formattedNumber.trim();
  }
  return value as string | null | undefined;
};

export const luhnCheck = (num: string) => {
  const arr = `${num}`
    .split("")
    .reverse()
    .map((x) => Number.parseInt(x));
  const lastDigit: any = arr.shift();
  let sum = arr.reduce(
    (acc, val, i) =>
      i % 2 !== 0 ? acc + val : acc + ((val *= 2) > 9 ? val - 9 : val),
    0
  );
  sum += lastDigit;
  return sum % 10 === 0;
};

export const optionsToSelectOption = (
  options:
    | {
        id?: string | number;
        text?: string;
        value?: string;
      }[]
    | undefined
) => {
  if (!options) return undefined;
  return options.map((item) => ({
    label: item.text || "",
    value: item.id || "",
  }));
};

export const showItemInPages = (items: string[], pathname: string) => {
  return items?.find((item) => item === pathname) ? true : false;
};

export const unShowItemInPages = (items: string[], pathname: string) => {
  return items?.find((item) => item === pathname) ? false : true;
};
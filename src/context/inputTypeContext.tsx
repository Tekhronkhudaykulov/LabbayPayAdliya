import { createContext, useContext, useState } from 'react';


// @ts-ignore
const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [form, setFormData] = useState({});
  const [activeInputKey, setActiveInputKey] = useState('');
  const [activeInputType, setActiveInputType] = useState('text');
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState();
  const [check, setCheck] = useState();


  const setValue = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const clearForm = () => {
    setFormData({});
    setActiveInputKey('');
    setActiveInputType('text');
  };

  return (
    <FormContext.Provider
      value={{
        form,
        setFormData,
        setValue,
        activeInputKey,
        setActiveInputKey,
        activeInputType,
        setActiveInputType,
        clearForm,
        responseData,
        setResponseData,
        setError,
        error,
        check, 
        setCheck
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);

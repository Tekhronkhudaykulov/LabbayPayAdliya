const formatPrice = (value) => {
    console.log(value, 'asfas');
    
  if (!value) return '';
  const num = parseInt(value.toString().replace(/\D/g, ''));
  return isNaN(num) ? '' : num.toLocaleString('ru-RU'); 
};


export default formatPrice;
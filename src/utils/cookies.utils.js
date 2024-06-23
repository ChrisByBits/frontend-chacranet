const getCookie = (name) => {
  const value = `; ${document.cookie}`;

  const parts = value.split(`; ${name}=`);
  if(parts.length === 2) {
    const token = parts.pop().split(';').shift();
    return token;
  }
  return '';
};

export default getCookie;
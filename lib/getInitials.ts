const getInitials = (str: string): string[] => {
  const strArr = str.split(" ");

  const initials = strArr.map((el) => el[0].toUpperCase());

  return initials;
};

export default getInitials;

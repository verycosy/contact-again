export default name =>
  name.includes(",") && !isNaN(name[name.length - 1]) ? true : false;

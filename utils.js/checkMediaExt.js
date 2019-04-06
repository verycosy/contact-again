const exts = [".jpg", ".png", ".gif", ".jpeg"];

export default content => {
  for (const ext of exts) {
    if (content.includes(ext)) return true;
  }

  return false;
};

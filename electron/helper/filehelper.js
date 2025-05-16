const path = require("path");
const fs = require("fs");

// FOR BUILD
const dataDir = path.join(process.cwd(), "../records");
// FOR LOCAL
// const dataDir = path.join(process.cwd(), "records");
const filePath = path.join(dataDir, "records.json");

export const createData = () => {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
};

export const createFile = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify({}));
    console.log("records.json fayli yaratildi");
  } else {
    console.log("records.json fayli allaqachon mavjud");
  }
};

export const loginToFile = async (data) => {
  const jsonString = JSON.stringify(data, null, 2);

  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, jsonString, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(console.log("Data saved successfully"));
      }
    });
  });
};

export const getLoginJson = () => {
  createData();
  createFile();
  return fs.readFileSync(path.join(dataDir, "records.json"), "utf-8");
};

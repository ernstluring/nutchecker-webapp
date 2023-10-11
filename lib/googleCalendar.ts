import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: process.cwd() + "/credentials.json",
  scopes: [""],
});

export const getData = async () => {};

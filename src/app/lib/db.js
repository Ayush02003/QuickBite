const user = encodeURIComponent(process.env.mongo_username);
const pass = encodeURIComponent(process.env.password);
export const connectionStr =
  `mongodb+srv://${user}:${pass}@cluster0.kdc6b3n.mongodb.net/QuickBite_DB?retryWrites=true&w=majority`;

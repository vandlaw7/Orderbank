const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");

const serviceAccount = require("./serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const getViewerContractAddress = async () => {
  const orderBankAddressRef = db.collection("orderbank").doc("address");
  const doc = await orderBankAddressRef.get();
  return doc.data()["viewer"];
};

module.exports = { getViewerContractAddress };

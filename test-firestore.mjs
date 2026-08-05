import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore';
import { readFileSync } from 'fs';

const config = JSON.parse(readFileSync('./firebase-applet-config.json', 'utf8'));
const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

async function test() {
  try {
    console.log("Testing connection to", config.firestoreDatabaseId);
    await getDocFromServer(doc(db, 'test/connection'));
    console.log("Success!");
  } catch (e) {
    console.error("Error:", e);
  }
}
test();

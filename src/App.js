
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  setDoc,
  deleteDoc
} from "firebase/firestore";
import "./index.css";

const firebaseConfig = {
  apiKey: "AIzaSyCw6U2rwpPEKwkEy-BpVz1_KI6DsrEj9eQ",
  authDomain: "straphshots.firebaseapp.com",
  projectId: "straphshots",
  storageBucket: "straphshots.firebasestorage.app",
  messagingSenderId: "1051546431574",
  appId: "1:1051546431574:web:2d27f0e41eddf859778bf7",
  measurementId: "G-5YND4W0XKS"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    getDocs(collection(db, "people")).then(snapshot => {
      const list = [];
      snapshot.forEach(doc => list.push(doc.id));
      setPeople(list);
    });
  }, []);

  const addPerson = async () => {
    if (!name) return;
    await setDoc(doc(db, "people", name), { reasons: [], shots: 0 });
    setPeople([...people, name]);
    setName("");
  };

  return (
    <div className="min-h-screen bg-green-950 text-white p-6 space-y-4">
      <h1 className="text-3xl text-green-300 font-bold text-center">Straphshots ING-Phøs25</h1>
      <div className="flex gap-2 justify-center">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name"
          className="text-black px-2 py-1 rounded" />
        <button onClick={addPerson} className="bg-green-500 px-3 py-1 rounded">Add</button>
      </div>
      <ul className="text-center space-y-1">
        {people.map(p => <li key={p}>{p}</li>)}
      </ul>
    </div>
  );
}

export default App;

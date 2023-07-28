import { addDoc, collection, getDocs } from "firebase/firestore";
import { createContext } from "react";
import { db } from "./firebase";

// eslint-disable-next-line react-refresh/only-export-components
export async function getCatalog() {
  const catalogRef = collection(db, "catalog");
  try {
    let catalog = [];
    const querySnapshot = await getDocs(catalogRef);
    querySnapshot.forEach((order) =>
      catalog.push({ id: order.id, data: order.data() })
    );
    return catalog;
  } catch (err) {
    throw new Error(err);
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const getBooksByCategory = (category) => {
  getCatalog().then((books) =>
    books.filter((book) => book.categories.includes(category))
  );
};

// export async function addToCatalog(data) {
//   try {
//     const adding = await addDoc(collection(db, "catalog"), data);
//     console.log("Document written with ID: ", adding.id);
//     return adding.id;
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
// }

export async function addNewOrder(order) {
  try {
    const adding = await addDoc(collection(db, "orders"), order);
    return adding.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const FirestoreContext = createContext({
  addNewOrder,
  getCatalog,
  getBooksByCategory,
});

export default function FirestoreProvider({ children }) {
  return (
    <FirestoreContext.Provider
      value={{ getBooksByCategory, getCatalog, addNewOrder }}
    >
      {children}
    </FirestoreContext.Provider>
  );
}

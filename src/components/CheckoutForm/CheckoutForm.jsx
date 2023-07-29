import { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { ShoppingCartContext } from "../../hooks/CartContext";
import { FirestoreContext } from "../../firebase/Firestore";
import { db } from "../../firebase/firebase";
import { doc, increment, updateDoc } from "firebase/firestore";

export default function CheckoutForm({ handleOrder }) {
  const [ordering, setOrdering] = useState(false);
  const [inputData, setInputData] = useState({
    name: "",
    lastName: "",
    email: "",
    confirmationEmail: "",
    phone: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    lastName: false,
    email: false,
    confirmationEmail: false,
    phone: false,
    general: false,
    diferentEmail: false,
  });

  const { state, subtotalAmount, clearCart } = useContext(ShoppingCartContext);
  const { addNewOrder } = useContext(FirestoreContext);
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setInputData((prev) => ({ ...prev, [name]: value }));
  };

  const checkInputs = () => {
    const { name, lastName, email, confirmationEmail, phone } = inputData;
    let generalCheck = false;
    let nameCheck = false;
    let lastNameCheck = false;
    let emailCheck = false;
    let confirmationEmailCheck = false;
    let phoneCheck = false;
    let diferentEmail = false;
    if (!name || !lastName || !email || !confirmationEmail || !phone) {
      generalCheck = true;
    }
    if (!/^[a-zA-ZäöüÄÖÜß'\-\s]+$/.test(name)) {
      nameCheck = true;
    }

    if (!/^[a-zA-ZäöüÄÖÜß'\-\s]+$/.test(lastName)) {
      lastNameCheck = true;
    }
    if (!/^\+?[0-9]{1,}$/.test(phone)) {
      phoneCheck = true;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      emailCheck = true;
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(confirmationEmail)) {
      confirmationEmailCheck = true;
    }

    if (inputData.email !== inputData.confirmationEmail) {
      diferentEmail = true;
    }

    setErrors((prev) => ({
      ...prev,
      generalCheck,
      nameCheck,
      lastNameCheck,
      emailCheck,
      confirmationEmailCheck,
      phoneCheck,
      diferentEmail,
    }));
    return (
      !generalCheck,
      !nameCheck,
      !lastNameCheck,
      !emailCheck,
      !confirmationEmailCheck,
      !phoneCheck,
      !diferentEmail
    );
  };

  const onSubmit = async () => {
    const correctData = checkInputs();
    if (correctData) {
      setOrdering(true);
      const order = {
        buyer: inputData,
        order: state.map((item) => ({
          id: item.id,
          title: item.data.name,
          price: item.data.saleprice,
          quantity: item.quantity,
        })),
        total: (subtotalAmount + 3.99).toFixed(2),
        date: new Date(),
        state: "ordered",
      };
      addNewOrder(order)
        .then((newOrderID) => {
          handleOrder(order, newOrderID);
        })
        .then(() => {
          order.order.forEach((item) => {
            const itemRef = doc(db, "catalog", item.id);
            updateDoc(itemRef, {
              stock: increment(-item.quantity),
            }).catch((error) => {
              console.error("Error updating document: ", error);
            });
          });
        })
        .then(() => {
          setTimeout(() => {
            clearCart();
          }, 2000);
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  };
  return (
    <div id="checkout-form-container">
      <h1>Checkout</h1>
      <form
        id="order-form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        <div id="contact-box">
          <div className="doubleColumnBox" id="email-phone-box">
            <div className="inputColumnBox">
              <label htmlFor="name">First name:</label>
              <input
                name="name"
                type="text"
                required
                value={inputData.name}
                onChange={handleChangeInput}
              />

              {errors.name && (
                <p className="errorInput">Alphabetical characters only</p>
              )}
            </div>
            <div className="inputColumnBox">
              <label htmlFor="lastName">Last name:</label>
              <input
                name="lastName"
                type="text"
                required
                value={inputData.lastName}
                onChange={handleChangeInput}
              />

              {errors.lastName && (
                <p className="errorInput">Alphabetical characters only</p>
              )}
            </div>
          </div>
          <div id="phone-box" className="inputColumnBox">
            <label htmlFor="phone">Phone:</label>
            <input
              name="phone"
              type="tel"
              required
              value={inputData.phone}
              onChange={handleChangeInput}
            />
            {errors.phone && <p>Numbers only</p>}
          </div>

          <div className="doubleColumnBox" id="email-phone-box">
            <div id="email-box" className="inputColumnBox">
              <label htmlFor="email">Email:</label>
              <input
                name="email"
                required
                type="email"
                value={inputData.email}
                onChange={handleChangeInput}
              />

              {errors.email && <p>Enter a valid email</p>}
            </div>
            <div id="confirmation-email-box" className="inputColumnBox">
              <label htmlFor="confirmation-email">Confirmation email:</label>
              <input
                name="confirmationEmail"
                required
                type="email"
                value={inputData.confirmationEmail}
                onChange={handleChangeInput}
              />
              {errors.confirmationEmail && <p>Enter a valid email</p>}

              {errors?.diferentEmail && (
                <p>Confirmation email does not match</p>
              )}
            </div>
          </div>
        </div>
        <Button
          disabled={ordering}
          id="submit-btn"
          className="button-plain"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

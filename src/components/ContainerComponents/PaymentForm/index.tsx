import "./style.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ROUTE, ERRORS } from "../../../helper/constants";
import {
  getCardTypes,
  saveDataToLocalStorage,
  getDataFromLocalStorage,
} from "../../../helper/util";

const PaymentForm: React.FC = () => {
  const [cardTypes, setCardTypes] = useState(
    getDataFromLocalStorage(`cardTypes`)
  );

  const initialState = {
    cardType: "",
    cardNumber: "",
    expiry: "",
    name: "",
    email: "",
  };

  interface IErrorsState {
    cardType: string;
    cardNumber: string;
    expiry: string;
    name: string;
    email: string;
  }

  const [state, setState] = useState(initialState);
  const [errors, setErrors] = useState<IErrorsState | any>({});
  const [allValidInputs, setAllValidInputs] = useState(false);
  const submitBtnRef = React.createRef<HTMLButtonElement>();

  useEffect(() => {
    if (!cardTypes) return;
    saveDataToLocalStorage(`cardTypes`, cardTypes);
  }, [cardTypes]);

  useEffect(() => {
    async function getCardTypesData() {
      const data = await getCardTypes();
      setCardTypes(data);
    }
    if (cardTypes) return;
    getCardTypesData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (allValidInputs)
      if (submitBtnRef.current) submitBtnRef.current.disabled = false;
  }, [allValidInputs, submitBtnRef]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const checkCardNumber = (cardType: string, cardNumber: string) => {
    if (cardType === "Amex") return /^[0-9]{15}$/g.test(cardNumber);
    return /^[0-9]{16}$/g.test(cardNumber);
  };

  const checkExpiryDate = (date: string) => {
    return /^(0[1-9]|1[0-2])\/([0-9]{2})$/g.test(date);
  };

  const checkUserName = (name: string) => {
    return /^[a-zA-Z ]{1,50}$/g.test(name);
  };

  const checkUserEmail = (email: string) => {
    return /^\w+@[a-zA-Z0-9_]+?\.[a-zA-Z]{2,3}$/g.test(email);
  };

  const validate = (eventName: string) => {
    setErrors({});
    const { cardType, cardNumber, expiry, name, email } = state;

    switch (eventName) {
      case "cardType":
        errors.cardType = cardType === "" ? ERRORS.CARD_TYPE_EMPTY : "";
        return errors;
      case "cardNumber":
        errors.cardNumber =
          cardNumber.length > 0
            ? checkCardNumber(cardType, cardNumber)
              ? ""
              : ERRORS.CARD_NUMBER_INVALID
            : ERRORS.CARD_NUMBER_EMPTY;
        return errors;
      case "expiry":
        errors.expiry =
          expiry.length > 0
            ? checkExpiryDate(expiry)
              ? ""
              : ERRORS.EXPIRY_INVALID
            : ERRORS.EXPIRY_EMPTY;
        return errors;
      case "name":
        errors.name =
          name.length > 0
            ? checkUserName(name)
              ? ""
              : ERRORS.NAME_INVALID
            : ERRORS.NAME_EMPTY;
        return errors;
      case "email":
        errors.email =
          email.length > 0
            ? checkUserEmail(email)
              ? ""
              : ERRORS.EMAIL_INVALID
            : "";
        return errors;
      default:
        return errors;
    }
  };

  const handleOnBlur = (event: any) => {
    const { name } = event.target;
    setErrors(validate(name));
    console.log(errors);
    if (
      errors &&
      !errors.cardType &&
      !errors.cardNumber &&
      !errors.expiry &&
      !errors.name &&
      !errors.email &&
      !!state.cardType &&
      !!state.cardNumber &&
      !!state.expiry &&
      !!state.name
    )
      setAllValidInputs(true);
  };

  const handleOnSubmitClick = (event: any) => {
    if( !(
      errors &&
      !errors.cardType &&
      !errors.cardNumber &&
      !errors.expiry &&
      !errors.name &&
      !errors.email &&
      !!state.cardType &&
      !!state.cardNumber &&
      !!state.expiry &&
      !!state.name
    ))
    {
        event.preventDefault();
    }
  };

  return (
    <div className="payment-form__main">
      <form className="payment-form__content">
        <div className="payment-form__element">
          <label htmlFor="cardTypes">Card Types:</label>
          <select
            className="card-type__select"
            name="cardType"
            defaultValue={"DEFAULT"}
            onChange={(event) => handleChange(event)}
            onBlur={(event) => handleOnBlur(event)}
            required
          >
            <option className="drop-down__option" value="DEFAULT" disabled>
              - Select Card Type -
            </option>
            {cardTypes
              ? cardTypes.map((element: { value: string }, key: number) => (
                  <option
                    {...{
                      className: "drop-down__option",
                      value: element.value,
                      key,
                    }}
                  >
                    {element.value}
                  </option>
                ))
              : ""}
          </select>
        </div>
        <div className="payment-form__element">
          <label></label>
          {errors.cardType && <p className="error__p">{errors.cardType}</p>}
        </div>
        <div className="payment-form__element">
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="tel"
            name="cardNumber"
            onChange={(event) => handleChange(event)}
            onBlur={(event) => handleOnBlur(event)}
            placeholder="Valid Card Number"
            required
          />
        </div>
        <div className="payment-form__element">
          <label></label>
          {errors.cardNumber && <p className="error__p">{errors.cardNumber}</p>}
        </div>
        <div className="payment-form__element">
          <label htmlFor="expiry">Expiry</label>
          <input
            type="text"
            name="expiry"
            onChange={(event) => handleChange(event)}
            onBlur={(event) => handleOnBlur(event)}
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="payment-form__element">
          <label></label>
          {errors.expiry && <p className="error__p">{errors.expiry}</p>}
        </div>
        <div className="payment-form__element">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            onChange={(event) => handleChange(event)}
            onBlur={(event) => handleOnBlur(event)}
            maxLength={50}
            placeholder="Your Name"
            required
          />
        </div>
        <div className="payment-form__element">
          <label></label>
          {errors.name && <p className="error__p">{errors.name}</p>}
        </div>
        <div className="payment-form__element">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            onChange={(event) => handleChange(event)}
            onBlur={(event) => handleOnBlur(event)}
            placeholder="Your Email"
          />
        </div>
        <div className="payment-form__element">
          <label></label>
          {errors.email && <p className="error__p">{errors.email}</p>}
        </div>
        <div className="payment-form__element">
          <label></label>
          <Link
            to={ROUTE.PAYMENT_PROCESS}
            className="submit"
            onClick={(event) => handleOnSubmitClick(event)}
          >
            <button
              type="button"
              className="blackBg-whiteFg-btn"
              ref={submitBtnRef}
              disabled
            >
              Confirm Payment
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;

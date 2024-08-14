import PropTypes from "prop-types";
import {
  deleteTransaction,
  selectTransaction,
} from "../store/transactionSlice";
import { useDispatch } from "react-redux";

// Money formatter function
function moneyFormatter(num) {
  let p = num.toFixed(2).split(".");
  return (
    "$ " +
    p[0]
      .split("")
      .reverse()
      .reduce(function (acc, num, i) {
        return num === "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
      }, "") +
    "." +
    p[1]
  );
}

export const Transaction = ({ transaction }) => {
  const dispatch = useDispatch();

  if (!transaction) {
    console.error("Transaction prop is undefined");
    return null;
  }

  const sign = transaction.amount < 0 ? "-" : "+";

  return (
    <li
      className={transaction.amount < 0 ? "minus" : "plus"}
      onClick={() => dispatch(selectTransaction(transaction))}
    >
      {transaction.text}{" "}
      <span>
        {sign}
        {moneyFormatter(transaction.amount)}
      </span>
      <button
        onClick={() => dispatch(deleteTransaction(transaction.id))}
        className="delete-btn"
      >
        x
      </button>
    </li>
  );
};

Transaction.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};
// import { useContext } from "react";
// import { GlobalContext } from "../context/GlobalState";

// import { useDrag } from "@use-gesture/react";

// import { animated, useSpring } from "@react-spring/web";
// //Money formatter function
// function moneyFormatter(num) {
//   let p = num.toFixed(2).split(".");
//   return (
//     "$ " +
//     p[0]
//       .split("")
//       .reverse()
//       .reduce(function (acc, num, i) {
//         return num === "-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
//       }, "") +
//     "." +
//     p[1]
//   );
// }

// export const Transaction = ({ transaction }) => {
//   const { deleteTransaction, selectTransaction } = useContext(GlobalContext);

//   const sign = transaction.amount < 0 ? "-" : "+";

//   const posTransaction = useSpring({ x: 0, y: 0 });

//   const bindTransaction = useDrag((params) => {
//     posTransaction.x.set(params.offset[0]);
//     posTransaction.y.set(params.offset[1]);
//   });

//   return (
//     <animated.div
//       // key={transaction.id}
//       {...bindTransaction()}
//       style={{
//         x: posTransaction.x,
//         y: posTransaction.y,
//         touchAction: "none",
//       }}
//     >
//       <li
//         className={transaction.amount < 0 ? "minus" : "plus"}
//         onClick={() => selectTransaction(transaction)}
//       >
//         {transaction.text}{" "}
//         <span>
//           {sign}
//           {moneyFormatter(transaction.amount)}
//         </span>
//         <button
//           onClick={() => deleteTransaction(transaction.id)}
//           className="delete-btn"
//         >
//           x
//         </button>
//       </li>
//     </animated.div>
//   );
// };

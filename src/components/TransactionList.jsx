import { useRef } from "react";
import { Transaction } from "./Transaction";
import { useSelector, useDispatch } from "react-redux";

import { reorderTransactions } from "../store/transactionSlice";

export const TransactionList = () => {
  // const { transactions, reorderTransactions } = useContext(GlobalContext);
  const transactions = useSelector((state) => state.transaction.transactions);
  const dragItem = useRef();
  const dragOverItem = useRef();
  const dispatch = useDispatch();

  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  const drop = (e) => {
    const copyListItems = [...transactions];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    dispatch(reorderTransactions(copyListItems));
  };

  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction, index) => (
          <div
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            key={index}
            draggable
          >
            <Transaction key={transaction.id} transaction={transaction} />
          </div>
        ))}
      </ul>
    </>
  );
};


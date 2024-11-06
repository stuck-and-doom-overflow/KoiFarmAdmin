import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, TextInput, Label } from "flowbite-react";
import { selectOrderList } from "../../redux/reducers/OrderSlice";
import { fetchOrderThunk } from "../../redux/thunks/OrderThunk";

export default function OrderTableComponent() {
  const dispatch = useDispatch();
  const allOrder = useSelector(selectOrderList);

  useEffect(() => {
    dispatch(fetchOrderThunk());
  }, [dispatch]);

  return (
    <div className="overflow-x-auto" style={{ width: "100%" }}>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Total Quantity</Table.HeadCell>
          <Table.HeadCell>Total Amount</Table.HeadCell>
          <Table.HeadCell>Actual Amount</Table.HeadCell>
          <Table.HeadCell>Sale Percent</Table.HeadCell>
          <Table.HeadCell>Shipping Address</Table.HeadCell>
          <Table.HeadCell>Payment method</Table.HeadCell>
          
        </Table.Head>
        <Table.Body className="divide-y">
          {allOrder.map((order) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell>{order.totalQuantity}item(s)</Table.Cell>
              <Table.Cell>{order.totalAmount}</Table.Cell>
              <Table.Cell>{order.actualAmount}</Table.Cell>
              <Table.Cell>{order.salePercent}</Table.Cell>
              <Table.Cell>{order.shippingAddress}</Table.Cell>
              <Table.Cell>{order.paymentMethod}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

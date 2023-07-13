import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export default function Listing() {
  const [transactionList, setTransactionList] = useState([]);
  const getTransactionList = async () => {
    const { data } = await axios.get(
                        "http://127.0.0.1:8000/api/transactions",
                        { headers: { 'Content-Type': 'application/json' },
                    });

    if (data?.data) {
      setTransactionList(data.data);
    }
  };

  useEffect(() => {
    getTransactionList();
  }, []);

  return (
    <Container>
      <Row className="pt-5 mb-2">
        <Col className="text-center">
            <h1>Office Transactions</h1>
        </Col>
      </Row>
      <Row className="py-2">
        <Col className="text-end">
            <Link to="/add-transaction">
                <Button variant="dark">+ Add Transaction</Button>
            </Link>
        </Col>
      </Row>
      <Row>
        <Col>
        <Table bordered hover>
            <thead className="table-dark">
                <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Credit</th>
                    <th>Debit</th>
                    <th>Running Balance</th>
                </tr>
            </thead>
            <tbody className="table-secondary">
              {
                transactionList.map((transaction, index) => {
                  return (
                    <tr key={index}>
                      <td>{ new Date(transaction.created_at).toJSON().slice(0, 10) }</td>
                      <td>{ transaction.description }</td>
                      <td>{ transaction?.type === 'credit' ? transaction.amount : '' }</td>
                      <td>{ transaction?.type === 'debit' ? transaction.amount : '' }</td>
                      <td>{ transaction.running_balance }</td>
                    </tr>
                  )
                })
              }
            </tbody>
            </Table>
        </Col>
      </Row>
    </Container>
  );
}

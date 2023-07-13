import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function AddTransaction() {
    const [transaction, setTransaction] = useState({
        type: "credit",
        amount: 0,
        description: ""
    });

    const handleKeyPress = (event) => {
        const pattern  = /[0-9.]/;
        const keyCode  = event.keyCode || event.which;
        const keyValue = String.fromCharCode(keyCode);

        if (!pattern.test(keyValue)) {
          event.preventDefault();
        }
    }

    const handlePaste = (event) => {
        const value    = event.clipboardData.getData('text/plain');
        const filtered = value.trim().replace(/[^0-9.]/g, '');

        if (filtered !== value) {
            event.preventDefault();
        } else {
            const changeEvent = new Event('input', { bubbles: true });
            event.target.dispatchEvent(changeEvent);
        }
    }

    const addNewTransaction = async (event) => {
        event.preventDefault();
        event.stopPropagation();

        try {
            const { data } = await axios.post(
                                "http://127.0.0.1:8000/api/transactions",
                                transaction,
                                { headers: { 'Content-Type': 'application/json' },
                            });

            window.alert(data.message);
            event.target.reset();
        } catch (error) {
            if (error.response && error.response.data.message) {
                window.alert(error.response.data.message);
            } else {
                window.alert(error.message);
            }
        }

    };

    return (
        <Container className="mb-4">
            <Row className="pt-5 mb-4">
                <Col>
                    <h3 className="d-inline">New Transaction</h3>
                </Col>
                <Col className="text-end">
                    <Link to="/">
                        <Button variant="primary">Back</Button>
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col className="border border-1 pb-2 pt-5 px-5 rounded-3">
                    <Form onSubmit={(e) => {addNewTransaction(e)}}>
                        <Form.Group as={Row} className="mb-3" controlId="type">
                            <Form.Label column sm="2">
                                Transaction Type
                            </Form.Label>
                            <Col sm="10">
                                <Form.Select
                                    aria-label="Select Transaction Type"
                                    defaultValue="credit"
                                    onChange={(e) => { setTransaction({ ...transaction, type: e.target.value }) }}
                                >
                                    <option value="credit">Credit</option>
                                    <option value="debit">Debit</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="amount">
                            <Form.Label column sm="2">
                                Amount
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    type="text"
                                    placeholder="Amount"
                                    onKeyPress={handleKeyPress}
                                    onPaste={handlePaste}
                                    onChange={(e) => { setTransaction({ ...transaction, amount: parseFloat(e.target.value) }) }}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="description">
                            <Form.Label column sm="2">
                                Description
                            </Form.Label>
                            <Col sm="10">
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    onChange={(e) => { setTransaction({ ...transaction, description: e.target.value }) }}
                                />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3" controlId="button">
                            <Col className="text-end">
                                <Button type="submit" variant="primary">Save</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

import { Promotion } from '@prisma/client';
import React, { useState } from 'react';
import { Badge, Col, Image, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaRegEye } from 'react-icons/fa';
import { bankMap } from "@/test";

interface PromotionViewPromotionModalProps {
    data: Promotion;
}
const PromotionViewPromotionModal: React.FC<PromotionViewPromotionModalProps> = ({ data }) => {
    const [show, setShow] = useState<boolean>(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Button className="mx-1 btn success" bsPrefix="icon" onClick={handleShow}>
                <FaRegEye />
                <span className="h-tooltiptext">ดูข้อมูล</span>
            </Button>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>ข้อมูล </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col lg="4">
                            ชื่อ : {data?.title}
                        </Col>
                        <Col lg="4">
                            tel : {data?.subtitle}
                        </Col>
                        <Col lg="4">
                            line : {data?.detail}
                        </Col>
                        <Col lg="4">
                            email : {data?.img}
                        </Col>
                       
                    </Row>
                    <div className='mt-3'>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <Badge className="mx-1" bg="success">
                            Success
                        </Badge>
                        <br />
                        <Badge className="mx-1" bg="info">
                            Info
                        </Badge>
                        <Badge className="mx-1" bg="info">
                            Info
                        </Badge>
                        <Badge className="mx-1" bg="info">
                            Info
                        </Badge>
                        <Badge className="mx-1" bg="info">
                            Info
                        </Badge>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        ปิด
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default PromotionViewPromotionModal;

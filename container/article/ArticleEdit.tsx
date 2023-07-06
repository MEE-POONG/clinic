import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, InputGroup, Form } from 'react-bootstrap';
import { FaPen , FaLine, FaMailBulk, FaPhoneAlt, FaPowerOff, FaSearch, FaTag, FaTags, FaUnlockAlt, FaUserAlt } from 'react-icons/fa';
import { RiBankCard2Line, RiBankLine } from 'react-icons/ri';
import { Article } from '@prisma/client';
import useAxios from "axios-hooks";


const ArticleEdit: React.FC = () => {

    const [showModal, setShowModal] = useState<boolean>(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);





    const [id, setId] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [img, setImg] = useState<string>("");
    const [detail, setDetail] = useState<string>("");
    const [{ error: errorMessage, loading: memberLoading }, postArticle] = useAxios(
        { url: '/api/article', method: 'POST' }, 
        { manual: true }
        );



        const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            event.stopPropagation();
    
    
            const data = {
                title,
                detail,
                img,
             
              };
      
    
            

            const response = await postArticle({ data });
        if (response && response.status === 201) {
            console.log(response);
            console.log("POST done");
            handleCloseModal();
            window.location.reload();
        } else {
          throw new Error('Failed to send data');
        }
        
        };

    return (
        <>
            <Button className="ms-2 btn primary" bsPrefix="icon" onClick={handleShowModal}>
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
            </Button>
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                <Modal.Header >
                    เพิ่มข้อมูลแอดมินใหม่
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col lg="6">
                            <InputGroup className="w-auto mb-3" bsPrefix="input-icon">
                                <InputGroup.Text id="basic-addon1">
                                    <FaUserAlt />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="title"
                                    aria-label="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Col>
                        <Col lg="6">
                            <InputGroup className="w-auto mb-3" bsPrefix="input-icon">
                                <InputGroup.Text id="basic-addon1">
                                    <FaUnlockAlt />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="img"
                                    aria-label="img"
                                    value={img}
                                    onChange={(e) => setImg(e.target.value)}
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Col>
                        <Col lg="6">
                            <InputGroup className="w-auto mb-3" bsPrefix="input-icon">
                                <InputGroup.Text id="basic-addon1">
                                    <FaTag />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="detail"
                                    aria-label="detail"
                                    value={detail}
                                    onChange={(e) => setDetail(e.target.value)}
                                    aria-describedby="basic-addon1"
                                />
                            </InputGroup>
                        </Col>

                       
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-success py-2 px-2" onClick={handleSubmit}>
                        ยืนยัน
                    </Button>
                    <Button className="btn-danger py-2 px-2" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ArticleEdit;

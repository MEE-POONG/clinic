import React, { useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import AddModal from "@/components/modal/AddModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import { bankMap } from '@/test';
import { Review } from '@prisma/client';

const ReviewAdd: React.FC = () => {
  const [{ error: errorMessage, loading: ReviewLoading }, executeReview] = useAxios({ url: '/api/review', method: 'POST' }, { manual: true });
  const [title, settitle] = useState<string>("");
  const [title2, settitle2] = useState<string>("");
  const [category, setcategory] = useState<string>("");
 /*const [lastname, setLastname] = useState<string>("");
  const [bank, setBank] = useState<string>("เลือกธนาคาร");
  const [bankAccount, setBankAccount] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [line, setLine] = useState<string>("");
  const [email, setEmail] = useState<string>("");*/
  const [alertForm, setAlertForm] = useState<string>("not");
  const [inputForm, setInputForm] = useState<boolean>(false);
  const [checkBody, setCheckBody] = useState<string>("");

  const handleInputChange = (setter: any) => (event: any) => {
    const newValue = event.target.value;
    if (!isNaN(newValue) && !newValue.includes('.')) {
      setter(newValue);
    }
  };
  const reloadPage = () => {
    clear();
  };

  const clear = () => {
    settitle("");
    settitle2("");
    setcategory("");
    
    setAlertForm("not");
    setInputForm(false);
    setCheckBody("");
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    if (!title) missingFields.push("title");
    if (!title2) missingFields.push("title2");
    if (!category) missingFields.push("category");
    /*if (!img) missingFields.push("img");*/
    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
    } else {
      try {
        setAlertForm("primary"); // set to loading

        // Prepare the data to send
        const data = {
         title,
         title2,
         category,
         
        };

        const response = await executeReview({ data });
        if (response && response.status === 201) {
          setAlertForm("success");
          setTimeout(() => {
            clear();
          }, 5000);
        } else {
          setAlertForm("danger");
          throw new Error('Failed to send data');
        }
      } catch (error) {
        setAlertForm("danger");
      }
    }
  };
  
  return (
    <LayOut>
      <Head>
        <title>Wellcome | MePrompt-BackOffice</title>
        <meta
          name="description"
          content="T ACTIVE"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='Review-page'>
        <Card>
          <AddModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              Review - เพิ่มรีวิว
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <FloatingLabel controlId="title" label="title / ชื่อโปรโมชั่น" className="mb-3">
                  <Form.Control
                    isValid={inputForm && title !== ""}
                    isInvalid={inputForm && title === ""}
                    type="text"
                    value={title}
                    onChange={e => settitle(e.target.value)}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="title2" label="title2 / หัวข้อย่อย" className="mb-3">
                  <Form.Control
                    isValid={inputForm && title2 !== ""}
                    isInvalid={inputForm && title2 === ""}
                    type="title2"
                    value={title2}
                    onChange={e => settitle2(e.target.value)}
                    placeholder="title2"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="category" label="category / รายละเอียด" className="mb-3">
                  <Form.Control
                    isValid={inputForm && category !== ""}
                    isInvalid={inputForm && category === ""}
                    type="text"
                    value={category}
                    onChange={e => setcategory(e.target.value)}
                    placeholder="category"
                  />
                </FloatingLabel>
              </Col>
              
             
            </Row>
          </Card.Body>
          <Card.Footer className="text-end">
            <Button variant="success mx-2" onClick={handleSubmit}>
              ยืนยัน
            </Button>
            <Button variant="primary mx-2" onClick={reloadPage}>
              ล้าง
            </Button>
            <Link href="/review" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default ReviewAdd;
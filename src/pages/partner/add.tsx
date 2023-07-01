import React, { useState, useEffect } from "react";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import AddModal from "@/components/modal/AddModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import InputWithSelect from "@/components/InputWithSelect";



const UserAGAdd: React.FC = () => {
  const [{ data, loading, error }, executePartner] = useAxios({ url: '/api/partner', method: 'POST' }, { manual: true });
  const [searchTerm, setSearchTerm] = useState("");
  const [{ data: membersData }, getMember,] = useAxios({
    url: `/api/member?page=1&pageSize=9&searchTerm=${searchTerm}`,
    method: "GET",
  });


  const [userAG, setUserAG] = useState<string>("");
  const [originAG, setOriginAG] = useState<string>("");
  const [percent, setPercent] = useState<number>(0);
  const [commission, setCommission] = useState<boolean>(false);
  const [adjustPercentage, setAdjustPercentage] = useState<boolean>(false);
  const [pay, setPay] = useState<boolean>(false);
  const [overdue, setOverdue] = useState<boolean>(false);
  const [customerCommission, setCustomerCommission] = useState<boolean>(false);
  const [recommender, setRecommender] = useState<string>("");
  const [memberId, setMemberId] = useState<string>("");

  const [alertForm, setAlertForm] = useState<string>("not");
  const [inputForm, setInputForm] = useState<boolean>(false);
  const [checkBody, setCheckBody] = useState<string>("");


  useEffect(() => {
    console.log("partnersData : ", membersData)
  }, [membersData]);

  const reloadPage = () => {
    clear();
  };

  const clear = () => {
    setUserAG("");
    setOriginAG("");
    setPercent(0);
    setOverdue(false);
    setCommission(false);
    setAdjustPercentage(false);
    setPay(false);
    setCustomerCommission(false);
    setRecommender("");
    setMemberId("");
    setAlertForm("not");
    setInputForm(false);
    setCheckBody("");
  }

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    if (!userAG) missingFields.push("userAG");
    if (!originAG) missingFields.push("password");

    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
    } else {
      try {
        setAlertForm("primary");
        const data = {
          userAG,
          originAG,
          percent,
          overdue,
          commission,
          adjustPercentage,
          pay,
          customerCommission,
          recommender,
          memberId,
        };
        const response = await executePartner({ data });
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
      <div className='member-page'>
        <Card>
          <AddModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              UserAG - เพิ่มข้อมูล
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={3}>
                <FloatingLabel controlId="userAG" label="UserAG / ยูสเซอร์AG" className="mb-3">
                  <Form.Control
                    isValid={inputForm && userAG !== ""}
                    isInvalid={inputForm && userAG === ""}
                    type="text"
                    value={userAG}
                    onChange={e => setUserAG(e.target.value)}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md={3}>
                <FloatingLabel controlId="OriginAG" label="OriginAG / ยูสต้นสาย" className="mb-3">
                  <Form.Control
                    isValid={inputForm && originAG !== ""}
                    isInvalid={inputForm && originAG === ""}
                    type="text"
                    value={originAG}
                    onChange={e => setOriginAG(e.target.value)}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md={3}>
                <FloatingLabel
                  controlId="floatingSelectGrid"
                  label="เลือกเปอร์เซ็น"
                >
                  <Form.Control
                    isValid={inputForm}
                    min={0}
                    max={60}
                    type="number"
                    value={percent}
                    onChange={e => setPercent(Number(e.target.value))}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md={3}>
                <FloatingLabel controlId="recommender" label="recommender / ผู้แนะนำ" className="mb-3">
                  <Form.Control
                    isValid={inputForm && recommender !== ""}
                    type="text"
                    value={recommender}
                    onChange={e => setRecommender(e.target.value)}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <div className="text-center mb-3">
              <div>สิทธิประโยชน์</div>
              <Button
                bsPrefix="icon"
                className={`ms-2 btn icon ${commission ? 'active' : ''}`}
                onClick={() => setCommission(!commission)}
              >
                ค่าคอม
              </Button>
              <Button
                bsPrefix="icon" className={`ms-2 btn icon ${overdue ? 'active' : ''}`}
                onClick={() => setOverdue(!overdue)}
              >
                ค้างบวก
              </Button>
              <Button
                bsPrefix="icon" className={`ms-2 btn icon ${adjustPercentage ? 'active' : ''}`}
                onClick={() => setAdjustPercentage(!adjustPercentage)}
              >
                ปรับสู้ฟรี
              </Button>
              <Button
                bsPrefix="icon" className={`ms-2 btn icon ${pay ? 'active' : ''}`}
                onClick={() => setPay(!pay)}
              >
                จ่าย
              </Button>
              <Button
                bsPrefix="icon" className={`ms-2 btn icon ${customerCommission ? 'active' : ''}`}
                onClick={() => setCustomerCommission(!customerCommission)}
              >
                คืนลูกค้า
              </Button>
            </div>
            <Row>
              <Col>
                <InputWithSelect textShow={searchTerm} textSearch={setSearchTerm} setID={setMemberId} arrayData={membersData?.data} />
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
            <Link href="/partner/member" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default UserAGAdd;
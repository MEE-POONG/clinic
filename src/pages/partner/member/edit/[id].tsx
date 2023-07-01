import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
// import BankSelect from "@/components/Input/Bankselect";
import EditModal from "@/components/modal/EditModal";
import useAxios from "axios-hooks";
import BankAccount from "@/components/Input/BankAccount";
import Link from "next/link";
import { bankMap } from '@/test';
import { Member } from "@prisma/client";



const MemberAdd: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [
    { loading: updateMemberLoading, error: updateMemberError },
    executeMemberPut,
  ] = useAxios({}, { manual: true });
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [bank, setBank] = useState<string>("เลือกธนาคาร");
  const [bankAccount, setBankAccount] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [line, setLine] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [alertForm, setAlertForm] = useState<string>("not");
  const [inputForm, setInputForm] = useState<boolean>(false);
  const [checkBody, setCheckBody] = useState<string>("");

  const handleInputChange = (setter: any) => (event: any) => {
    const newValue = event.target.value;
    if (!isNaN(newValue) && !newValue.includes('.')) {
      setter(newValue);
    }
  };

  const [
    { data: memberID, loading: memberIDLoading, error: memberIDError },
    executeMemberID,
  ] = useAxios<{ data: Member; success: boolean }, any>({
    url: `/api/member/${id}`,
    method: "GET",
  }, { autoCancel: false, manual: true });

  useEffect(() => {
    if (id) {
      executeMemberID().then(({ data }) => {
        if (data?.data) {
          setUsername(data?.data?.username || "");
          setPassword(data?.data?.password || "")
          setFirstname(data?.data?.firstname || "")
          setLastname(data?.data?.lastname || "")
          setBank(data?.data?.bank || "")
          setBankAccount(data?.data?.bankAccount || "")
          setPhone(data?.data?.phone || "")
          setLine(data?.data?.line || "")
          setEmail(data?.data?.email || "")
        }
      });
    }
  }, [id]);

  const reloadPage = () => {
    executeMemberID().then(({ data }) => {
      if (data?.data) {
        setUsername(data?.data?.username || "");
        setPassword(data?.data?.password || "")
        setFirstname(data?.data?.firstname || "")
        setLastname(data?.data?.lastname || "")
        setBank(data?.data?.bank || "")
        setBankAccount(data?.data?.bankAccount || "")
        setPhone(data?.data?.phone || "")
        setLine(data?.data?.line || "")
        setEmail(data?.data?.email || "")
      }
    });
  };


  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    if (!username) missingFields.push("username");
    if (!password) missingFields.push("password");
    if (!firstname) missingFields.push("firstname");
    if (!lastname) missingFields.push("lastname");
    if (!phone) missingFields.push("phone");
    if (!bank) missingFields.push("bank");
    if (!bankAccount) missingFields.push("bankAccount");
    if (!line) missingFields.push("line");

    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
    } else {
      try {
        setAlertForm("primary");

        const data = {
          username,
          password,
          firstname,
          lastname,
          bankAccount,
          bank,
          phone,
          line,
          email,
        };


        // Execute the update
        const response = await executeMemberPut({
          url: "/api/member/" + id,
          method: "PUT",
          data
        });
        if (response && response.status === 200) {
          setAlertForm("success");
          setTimeout(() => {
            reloadPage();
          }, 5000);
        } else {
          setAlertForm("danger");
          throw new Error('Failed to update data');
        }
      } catch (error) {
        setAlertForm("danger");
      }
    }
  };
  const bankObj = bankMap.find(b => b.value === bank);
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
          <EditModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              Member - แก้ไขข้อมูล
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <FloatingLabel controlId="Username" label="Username / ยูสเซอร์" className="mb-3">
                  <Form.Control
                    isValid={inputForm && username !== ""}
                    isInvalid={inputForm && username === ""}
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="Password" label="Password / รหัสผ่าน" className="mb-3">
                  <Form.Control
                    isValid={inputForm && password !== ""}
                    isInvalid={inputForm && password === ""}
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="password"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="firstname" label="Firstname / ชื่อจริง" className="mb-3">
                  <Form.Control
                    isValid={inputForm && firstname !== ""}
                    isInvalid={inputForm && firstname === ""}
                    type="text"
                    value={firstname}
                    onChange={e => setFirstname(e.target.value)}
                    placeholder="First name"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="lastname" label="Lastname / นามสกุล" className="mb-3">
                  <Form.Control
                    isValid={inputForm && lastname !== ""}
                    isInvalid={inputForm && lastname === ""}
                    type="text"
                    value={lastname}
                    onChange={e => setLastname(e.target.value)}
                    placeholder="Last name"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="bankBankAccount" label="Bank Account / เลขบัญชีธนาคาร" className="mb-3">
                  <Dropdown bsPrefix='form-control'>
                    <Dropdown.Toggle id="dropdown-dark-example1" className='w-100' variant='select-form'>
                      {bankObj &&
                        <Image src={bankObj.image} alt={bankObj.value} style={{ width: '20px', marginRight: '10px' }} />
                      }
                      {bank}

                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {bankMap.map((option) => (
                        <Dropdown.Item key={option.id} onClick={() => setBank(option.value)}>
                          <Image src={option.image} alt={option.value} style={{ width: '20px', marginRight: '10px' }} />
                          {option.value}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <BankAccount bankAccount={bankAccount} setBankAccount={setBankAccount} inputForm={inputForm} />
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="phone" label="Phone / เบอร์ติดต่อ" className="mb-3">
                  <Form.Control
                    minLength={10}
                    maxLength={10}
                    isValid={inputForm && phone !== ""}
                    isInvalid={inputForm && phone === ""}
                    type="text"
                    value={phone}
                    onChange={handleInputChange(setPhone)}
                    placeholder="Phone number"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="line" label="Line / ไลน์" className="mb-3">
                  <Form.Control type="text"
                    isValid={inputForm && line !== ""}
                    isInvalid={inputForm && line === ""}
                    value={line}
                    onChange={e => setLine(e.target.value)}
                    placeholder="Line ID" />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="email" label={<>Email / อีเมล <span className="text-danger">*ไม่บังคับ</span></>} className="mb-3">
                  <Form.Control type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email (optional)" />
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
            <Link href="/partner/member" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default MemberAdd;
import React, { useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import AddModal from "@/components/modal/AddModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import { bankMap } from '@/test';
import { User } from '@prisma/client';


const UserAdd: React.FC = () => {
  const [{ error: errorMessage, loading: UserLoading }, executeUser] = useAxios({ url: '/api/user', method: 'POST' }, { manual: true });
  const [fname, setfname] = useState<string>("");
  const [lname, setlname] = useState<string>("");
  const [nickname, setnickname] = useState<string>("");
  const [sex, setsex] = useState<string>("");
  const [username, setusername] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [line, setline] = useState<string>("");
  const [tel, settel] = useState<string>("");

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
    setfname("");
    setlname("");
    setnickname("");
    setsex("");
    setusername("");
    setpassword("");
    setemail("");
    setline("");
    settel("");
  
    setAlertForm("not");
    setInputForm(false);
    setCheckBody("");
  }

  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files && event.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onloadend = () => {
  //       const base64String = reader.result as string;
  //       const splittedString = base64String.split(",")[1]; // ตัดส่วน "data:image/png;base64," ออก
  //       setimg(splittedString);
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    if (!fname) missingFields.push("fname");
    if (!lname) missingFields.push("lname");
    if (!nickname) missingFields.push("nickname");
    if (!sex) missingFields.push("sex");
    if (!username) missingFields.push("username");
    if (!password) missingFields.push("password");
    if (!email) missingFields.push("email");
    if (!line) missingFields.push("line");
    if (!tel) missingFields.push("tel");
    // if (!img) missingFields.push("img");
    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
    } else {
      try {
        setAlertForm("primary"); // set to loading

        // Prepare the data to send
        const data = {
          fname,
          lname,
          nickname,
          sex,
          username,
          password,
          email,
          line,
          tel,
      
         
        };

        const response = await executeUser({ data });
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
      <div className='User-page'>
        <Card>
          <AddModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
            User - เพิ่มผู้ใช้
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <FloatingLabel controlId="fname" label="fname / ชื่อ" className="mb-3">
                  <Form.Control
                    isValid={inputForm && fname !== ""}
                    isInvalid={inputForm && fname === ""}
                    type="text"
                    value={fname}
                    onChange={e => setfname(e.target.value)}
                    placeholder="fname"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="lname" label="lname / นามสกุล" className="mb-3">
                  <Form.Control
                    isValid={inputForm && lname !== ""}
                    isInvalid={inputForm && lname === ""}
                    type="text"
                    value={lname}
                    onChange={e => setlname(e.target.value)}
                    placeholder="lname"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="nickname" label="nickname / ชื่อเล่น" className="mb-3">
                  <Form.Control
                    isValid={inputForm && nickname !== ""}
                    isInvalid={inputForm && nickname === ""}
                    type="text"
                    value={nickname}
                    onChange={e => setnickname(e.target.value)}
                    placeholder="nickname"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="sex" label="sex / เพศ" className="mb-3">
                  <Form.Control
                    isValid={inputForm && sex !== ""}
                    isInvalid={inputForm && sex === ""}
                    type="text"
                    value={sex}
                    onChange={e => setsex(e.target.value)}
                    placeholder="sex"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="username" label="username / ยูเซอร์เนม" className="mb-3">
                  <Form.Control
                    isValid={inputForm && username !== ""}
                    isInvalid={inputForm && username === ""}
                    type="text"
                    value={username}
                    onChange={e => setusername(e.target.value)}
                    placeholder="username"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="password" label="password / รหัสผ่าน" className="mb-3">
                  <Form.Control
                    isValid={inputForm && password !== ""}
                    isInvalid={inputForm && password === ""}
                    type="text"
                    value={password}
                    onChange={e => setpassword(e.target.value)}
                    placeholder="password"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="email" label="email / อีเมลล์" className="mb-3">
                  <Form.Control
                    isValid={inputForm && email !== ""}
                    isInvalid={inputForm && email === ""}
                    type="text"
                    defaultValue={email}
                    onChange={e => setemail(e.target.value)}
                    placeholder="email"/> 
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="line" label="line / ไอดีไลน์" className="mb-3">
                  <Form.Control
                    isValid={inputForm && line !== ""}
                    isInvalid={inputForm && line === ""}
                    type="text"
                    defaultValue={line}
                    onChange={e => setline(e.target.value)}
                    placeholder="line"/> 
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="tel" label="tel / เบอร์โทร" className="mb-3">
                  <Form.Control
                    isValid={inputForm && tel !== ""}
                    isInvalid={inputForm && tel === ""}
                    type="text"
                    defaultValue={tel}
                    onChange={e => settel(e.target.value)}
                    placeholder="tel"/> 
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
            <Link href="/admin/user" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default UserAdd;
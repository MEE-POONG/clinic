import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Button, Card, Col, Dropdown, FloatingLabel, Form, Image, Row } from "react-bootstrap";
// import BankSelect from "@/components/Input/Bankselect";
import EditModal from "@/components/modal/EditModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import { bankMap } from '@/test';
import { User } from "@prisma/client";



const UserAdd: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [
    { loading: updateuserLoading, error: updateuserError },
    executeuserPut,
  ] = useAxios({}, { manual: true });
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

  const [
    { data: userID, loading: userIDLoading, error: userIDError },
    executeuserID,
  ] = useAxios<{ data: User; success: boolean }, any>({
    url: `/api/user/${id}`,
    method: "GET",
  }, { autoCancel: false, manual: true });

  useEffect(() => {
    if (id) {
      executeuserID().then(({ data }) => {
        if (data?.data) {
          setfname(data?.data?.fname || "");
          setlname(data?.data?.lname || "")
          setnickname(data?.data?.nickname || "")
          setsex(data?.data?.sex || "")
          setusername(data?.data?.username || "")
          setpassword(data?.data?.password || "")
          setemail(data?.data?.email || "")
          setline(data?.data?.line || "")
          settel(data?.data?.tel || "")
        }
      });
    }
  }, [id]);

  const reloadPage = () => {
    executeuserID().then(({ data }) => {
      if (data?.data) {
        setfname(data?.data?.fname || "");
        setlname(data?.data?.lname || "")
        setnickname(data?.data?.nickname || "")
        setsex(data?.data?.sex || "")
        setusername(data?.data?.username || "")
        setpassword(data?.data?.password || "")
        setemail(data?.data?.email || "")
        setline(data?.data?.line || "")
        settel(data?.data?.tel || "")
       /*setUsername(data?.data?.username || "");
        setPassword(data?.data?.password || "")
        setFirstname(data?.data?.firstname || "")
        setLastname(data?.data?.lastname || "")
        setBank(data?.data?.bank || "")
        setBankAccount(data?.data?.bankAccount || "")
        setPhone(data?.data?.phone || "")
        setLine(data?.data?.line || "")
        setEmail(data?.data?.email || "")*/
      }
    });
  };
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
  

    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
    } else {
      try {
        setAlertForm("primary");

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


        // Execute the update
        const response = await executeuserPut({
          url: "/api/user/" + id,
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
      <div className='user-page'>
        <Card>
          <EditModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              user - แก้ไขข้อมูล
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
                    value={email}
                    onChange={e => setemail(e.target.value)}
                    placeholder="email"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="line" label="line / ไอดีไลน์" className="mb-3">
                  <Form.Control
                    isValid={inputForm && line !== ""}
                    isInvalid={inputForm && line === ""}
                    type="text"
                    value={line}
                    onChange={e => setline(e.target.value)}
                    placeholder="line"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="tel" label="tel / เบอร์โทร" className="mb-3">
                  <Form.Control
                    isValid={inputForm && tel !== ""}
                    isInvalid={inputForm && tel === ""}
                    type="text"
                    value={tel}
                    onChange={e => settel(e.target.value)}
                    placeholder="tel"
                  />
                </FloatingLabel>
              </Col>




               {/* <Col md={4}>
                <FloatingLabel controlId="img" label="img / รูปภาพ" className="mb-3">
                  <Form.Control
                    isValid={inputForm && img !== ""}
                    isInvalid={inputForm && img === ""}
                    type="file"
                    defaultValue={img}
                    onChange={handleFileUpload}
                    placeholder="img"/> 
                </FloatingLabel>
              </Col> */}
            
          
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

function setAlertForm(arg0: string) {
  throw new Error("Function not implemented.");
}
function setInputForm(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setCheckBody(arg0: string) {
  throw new Error("Function not implemented.");
}


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
import { Adminmaster } from "@prisma/client";



const AdminmasterAdd: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [
    { loading: updateAdminmasterLoading, error: updateAdminmasterError },
    executeAdminmasterPut,
  ] = useAxios({}, { manual: true });
  const [adminUsername, setadminUsername] = useState<string>("");
  const [adminPassword, setadminPassword] = useState<string>("");
  const [sex, setsex] = useState<string>("");
  const [tel, settel] = useState<string>("");
  const [email, setemail] = useState<string>("");

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
    { data: AdminmasterID, loading: AdminmasterIDLoading, error: AdminmasterIDError },
    executeAdminmasterID,
  ] = useAxios<{ data: Adminmaster; success: boolean }, any>({
    url: `/api/adminmaster/${id}`,
    method: "GET",
  }, { autoCancel: false, manual: true });

  useEffect(() => {
    if (id) {
      executeAdminmasterID().then(({ data }) => {
        if (data?.data) {
          setadminUsername(data?.data?.adminUsername || "");
          setadminPassword(data?.data?.adminPassword || "")
          setsex(data?.data?.sex || "")
          settel(data?.data?.tel || "")
          setemail(data?.data?.email || "")
        }
      });
    }
  }, [id]);

  const reloadPage = () => {
    executeAdminmasterID().then(({ data }) => {
      if (data?.data) {
        setadminUsername(data?.data?.adminUsername || "");
        setadminPassword(data?.data?.adminPassword || "")
        setsex(data?.data?.sex || "")
        settel(data?.data?.tel || "")
        setemail(data?.data?.email || "")
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
    if (!adminUsername) missingFields.push("adminUsername");
    if (!adminPassword) missingFields.push("adminPassword");
    if (!sex) missingFields.push("sex");
    if (!tel) missingFields.push("tel");
    if (!email) missingFields.push("email");
  

    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
    } else {
      try {
        setAlertForm("primary");

        const data = {
          adminUsername,
          adminPassword,
          sex,
          tel,
          email,
        };


        // Execute the update
        const response = await executeAdminmasterPut({
          url: "/api/Adminmaster/" + id,
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
      <div className='Adminmaster-page'>
        <Card>
          <EditModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              Adminmaster - แก้ไขข้อมูล
            </h4>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={4}>
                <FloatingLabel controlId="adminUsername" label="adminUsername / ชื่อยูเซอร์เนม แอดมิน" className="mb-3">
                  <Form.Control
                    isValid={inputForm && adminUsername !== ""}
                    isInvalid={inputForm && adminUsername === ""}
                    type="text"
                    value={adminUsername}
                    onChange={e => setadminUsername(e.target.value)}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="adminPassword" label="adminPassword / รหัสผ่าน แอดมิน" className="mb-3">
                  <Form.Control
                    isValid={inputForm && adminPassword !== ""}
                    isInvalid={inputForm && adminPassword === ""}
                    type="text"
                    value={adminPassword}
                    onChange={e => setadminPassword(e.target.value)}
                    placeholder="adminPassword"
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
            <Link href="/Adminmaster" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default AdminmasterAdd;

function setAlertForm(arg0: string) {
  throw new Error("Function not implemented.");
}
function setInputForm(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setCheckBody(arg0: string) {
  throw new Error("Function not implemented.");
}


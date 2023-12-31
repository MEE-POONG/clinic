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
import { Article } from "@prisma/client";



const articleAdd: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [
    { loading: updatearticleLoading, error: updatearticleError },
    executearticlePut,
  ] = useAxios({}, { manual: true });
  const [title, settitle] = useState<string>("");
  const [img, setimg] = useState<string>("");
  const [detail, setdetail] = useState<string>("");
 /* const [img, setimg] = useState<string>("");*/
  const [alertForm, setAlertForm] = useState<string>("not");
  const [inputForm, setInputForm] = useState<boolean>(false);
  const [checkBody, setCheckBody] = useState<string>("");
 /* const [bankAccount, setBankAccount] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [line, setLine] = useState<string>("");
  const [email, setEmail] = useState<string>("");*/


  const handleInputChange = (setter: any) => (event: any) => {
    const newValue = event.target.value;
    if (!isNaN(newValue) && !newValue.includes('.')) {
      setter(newValue);
    }
  };

  const [
    { data: articleID, loading: articleIDLoading, error: articleIDError },
    executearticleID,
  ] = useAxios<{ data: Article; success: boolean }, any>({
    url: `/api/article/${id}`,
    method: "GET",
  }, { autoCancel: false, manual: true });

  useEffect(() => {
    if (id) {
      executearticleID().then(({ data }) => {
        if (data?.data) {
          settitle(data?.data?.title || "");
          setimg(data?.data?.img || "")
          setdetail(data?.data?.detail || "")
        /*  setimg(data?.data?.img || "")
          setBank(data?.data?.bank || "")
          setBankAccount(data?.data?.bankAccount || "")
          setPhone(data?.data?.phone || "")
          setLine(data?.data?.line || "")
          setEmail(data?.data?.email || "")*/
        }
      });
    }
  }, [id]);

  const reloadPage = () => {
    executearticleID().then(({ data }) => {
      if (data?.data) {
        settitle(data?.data?.title || "");
        setimg(data?.data?.img || "")
        setdetail(data?.data?.detail || "")
       /* setimg(data?.data?.img || "")
       setUsername(data?.data?.username || "");
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
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const splittedString = base64String.split(",")[1]; // ตัดส่วน "data:image/png;base64," ออก
        setimg(splittedString);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    if (!title) missingFields.push("title");
    if (!img) missingFields.push("img");
    if (!detail) missingFields.push("detail");
  /*  if (!img) missingFields.push("img");
    if (!phone) missingFields.push("phone");
    if (!bank) missingFields.push("bank");
    if (!bankAccount) missingFields.push("bankAccount");
    if (!line) missingFields.push("line");*/

    if (missingFields.length > 0) {
      setAlertForm("warning");
      setInputForm(true);
      setCheckBody(`กรอกข้อมูลไม่ครบ: ${missingFields.join(', ')}`);
    } else {
      try {
        setAlertForm("primary");

        const data = {
          title,
          img,
          detail,
          /*img,*/
        };


        // Execute the update
        const response = await executearticlePut({
          url: "/api/article/" + id,
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
      <div className='article-page'>
        <Card>
          <EditModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              article - แก้ไขข้อมูล
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
                    defaultValue={title}
                    onChange={e => settitle(e.target.value)}
                    placeholder="name@example.com"
                  />
                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="img" label="img / คำอธิบายย่อย" className="mb-3">
                  <Form.Control
                    isValid={inputForm && img !== ""}
                    isInvalid={inputForm && img === ""}
                    type="file"
                    defaultValue={img}
                    onChange={handleFileUpload}
                    placeholder="img"
                  /> 


                </FloatingLabel>
              </Col>
              <Col md={4}>
                <FloatingLabel controlId="detail" label="detail / รายละเอียด" className="mb-3">
                  <Form.Control
                    isValid={inputForm && detail !== ""}
                    isInvalid={inputForm && detail === ""}
                    type="text"
                    defaultValue={detail}
                    onChange={e => setdetail(e.target.value)}
                    placeholder="detail"
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
            <Link href="/article" className="btn btn-danger mx-2">
              ย้อนกลับ
            </Link>
          </Card.Footer>
        </Card>
      </div>
    </LayOut >
  );
}
export default articleAdd;

function setAlertForm(arg0: string) {
  throw new Error("Function not implemented.");
}
function setInputForm(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setCheckBody(arg0: string) {
  throw new Error("Function not implemented.");
}


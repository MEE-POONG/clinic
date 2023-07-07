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
import { Review } from "@prisma/client";



const ReviewAdd: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [
    { loading: updateReviewLoading, error: updateReviewError },
    executeReviewPut,
  ] = useAxios({}, { manual: true });
  const [title, settitle] = useState<string>("");
  const [title2, settitle2] = useState<string>("");
  const [category, setcategory] = useState<string>("");
  const [subTitle, setsubTitle] = useState<string>("");
  const [reviewDetail, setreviewDetail] = useState<string>("");
  const [reviewerName, setreviewerName] = useState<string>("");
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
    { data: ReviewID, loading: ReviewIDLoading, error: ReviewIDError },
    executeReviewID,
  ] = useAxios<{ data: Review; success: boolean }, any>({
    url: `/api/review/${id}`,
    method: "GET",
  }, { autoCancel: false, manual: true });

  useEffect(() => {
    if (id) {
      executeReviewID().then(({ data }) => {
        if (data?.data) {
          settitle(data?.data?.title || "");
          settitle2(data?.data?.title2 || "")
          setcategory(data?.data?.category || "")
          setsubTitle(data?.data?.subTitle || "")
          setreviewDetail(data?.data?.reviewDetail || "")
          setreviewerName(data?.data?.reviewerName || "")
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
    executeReviewID().then(({ data }) => {
      if (data?.data) {
        settitle(data?.data?.title || "");
        settitle2(data?.data?.title2 || "")
        setcategory(data?.data?.category || "")
        setsubTitle(data?.data?.subTitle || "")
        setreviewDetail(data?.data?.reviewDetail || "")
        setreviewerName(data?.data?.reviewerName || "")
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


  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    if (!title) missingFields.push("title");
    if (!title2) missingFields.push("title2");
    if (!category) missingFields.push("category"); 
    if (!subTitle) missingFields.push("subTitle");
    if (!reviewDetail) missingFields.push("reviewDetail"); 
    if (!reviewerName) missingFields.push("reviewerName");  
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
          title2,
          category,
          subTitle,
          reviewDetail,
          reviewerName,
          /*img,*/
        };


        // Execute the update
        const response = await executeReviewPut({
          url: "/api/review/" + id,
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
      <div className='Review-page'>
        <Card>
          <EditModal checkAlertShow={alertForm} setCheckAlertShow={setAlertForm} checkBody={checkBody} />
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
              Review - แก้ไขข้อมูล
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
                <FloatingLabel controlId="title2" label="title2 / คำอธิบายย่อย" className="mb-3">
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

function setAlertForm(arg0: string) {
  throw new Error("Function not implemented.");
}
function setInputForm(arg0: boolean) {
  throw new Error("Function not implemented.");
}

function setCheckBody(arg0: string) {
  throw new Error("Function not implemented.");
}


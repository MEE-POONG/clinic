import React, { useEffect } from "react";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import useAxios from "axios-hooks";
import { useState } from 'react';


const subServiceclinic: React.FC = () => {
  const [id, setid] = useState<string>("");
  const [title, settitle] = useState<string>("");
  const [subTitle, setsubTitle] = useState<string>("");
  const [category, setcategory] = useState<string>("");
  const [reviewdetail, setreviewdetail] = useState<string>("");
  const [price, setprice] = useState<string>("");
  const [img, setimg] = useState<string>("");


  const [{ data: subServiceclinicData }, getsubServiceclinic,] = useAxios({
    url: `/api/subServiceclinic`,
    method: "GET",
  });
  useEffect(() => {
    setid(subServiceclinicData?.subServices?.id);
    settitle(subServiceclinicData?.subServices?.title);
    setsubTitle(subServiceclinicData?.subServices?.subTitle);
    setcategory(subServiceclinicData?.subServices?.category);
    setreviewdetail(subServiceclinicData?.subServices?.reviewdetail);
    setprice(subServiceclinicData?.subServices?.price);
    setimg(subServiceclinicData?.subServices?.img);
  }, [subServiceclinicData]);

  const [{ loading: updateMemberLoading, error: updateMemberError }, putsubServiceclinic,] = useAxios({
  }, { manual: true });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const splittedString = base64String.split(",")[1]; // ตัดส่วน "data:image/png;base64," ออก
        if (event.target.id === "customFile1") {
            setimg(splittedString);
          } else 
          event.target.value = ''; // รีเซ็ตค่าอินพุตไฟล์ที่อัปโหลด
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    //let missingFields = [];
    //if (!title) missingFields.push("title");
    //if (!subTitle) missingFields.push("subTitle");

    //console.log(missingFields);


      // อัพโหลดรูปภาพ img1
const response1 = await putsubServiceclinic({
  url: "/api/subServiceclinic/" + id,
    method: "PUT",
    data: {
      title,
        subTitle,
        category,
        reviewdetail,
        price,
        img,
    },
  });
  if (response1 && response1.status === 200) {
    console.log("Image 1 uploaded successfully");
  } else {
    throw new Error("Failed to update image 1");
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
      <div className='setting-page h-100'>
        <Card className="h-100">
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
            subServiceclinic
            </h4>
            <span>
              <Button className="ms-2 btn" bsPrefix="icon">
                ยกเลิก
              </Button>
              <Button className="ms-2 btn" bsPrefix="icon">
                รีเฟรช
              </Button>
              <Button className="ms-2 btn" bsPrefix="icon">
                ยืนยัน
              </Button>
            </span>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col lg="3" className="text-center">
              <Image src={`data:image/png;base64, ${img}`} width="300px" height="200px" alt="Article Image" thumbnail  />
                <div className="d-flex justify-content-center">
                  <div className="btn btn-primary btn-rounded">
                    <label className="form-label text-white m-1" htmlFor="customFile1">picture1</label>
                    <input type="file" className="form-control d-none" id="customFile1" onChange={handleFileUpload} />
                  </div>
                </div>

              </Col>
              <Col lg="9" >
                <Row>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>title</Form.Label>
                      <Form.Control type="text" placeholder="title" defaultValue={title} onChange={e => { settitle(e.target.value) }} />
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>subtitle</Form.Label>
                      <Form.Control type="text" placeholder="subtitle" defaultValue={subTitle} onChange={e => { setsubTitle(e.target.value) }} />
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>category</Form.Label>
                      <Form.Control type="text" placeholder="category" defaultValue={category} onChange={e => { setcategory(e.target.value) }} />
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>reviewdetail</Form.Label>
                      <Form.Control type="text" placeholder="reviewdetail"defaultValue={reviewdetail} onChange={e => { setreviewdetail(e.target.value) }} />
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>price</Form.Label>
                      <Form.Control type="text" placeholder="price" defaultValue={price} onChange={e => { setprice(e.target.value) }} />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="d-flex space-between">
            <span className="ms-auto">
              <Button className="ms-2 btn" bsPrefix="icon">
                ยกเลิก
              </Button>
              <Button className="ms-2 btn" bsPrefix="icon">
                รีเฟรช
              </Button>
              <Button className="ms-2 btn" bsPrefix="icon" onClick={handleSubmit}>
                ยืนยัน
              </Button>
            </span>
          </Card.Footer>
        </Card>
      </div>
    </LayOut>
  );
}
export default subServiceclinic;
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
  }, [subServiceclinicData]);

  const [{ loading: updateMemberLoading, error: updateMemberError }, putsubServiceclinic,] = useAxios({
  }, { manual: true });

  const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    let missingFields = [];
    const data = {
        title,
        subTitle,
        category,
        reviewdetail,
        price,
      };


    // Execute the update
    const response = await putsubServiceclinic({
        url: "/api/subServiceclinic/" + id,
        method: "PUT",
        data
    });
    if (response && response.status === 200) {
        console.log(response);
        console.log("put done");

    } else {

        throw new Error('Failed to update data');
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
                <Image src="./images/logo-default.png" width={'200px'} className="m-3" alt="picture1" />
                <div className="d-flex justify-content-center">
                  <div className="btn btn-primary btn-rounded">
                    <label className="form-label text-white m-1" htmlFor="customFile1">picture1</label>
                    <input type="file" className="form-control d-none" id="customFile1" />
                  </div>
                </div>
                <Image src="./images/logo-default.png" width={'200px'} className="m-3" alt="picture2" />
                <div className="d-flex justify-content-center">
                  <div className="btn btn-primary btn-rounded">
                    <label className="form-label text-white m-1" htmlFor="customFile1">picture2</label>
                    <input type="file" className="form-control d-none" id="customFile1" />
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
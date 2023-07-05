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
import { Serviceclinic } from '@prisma/client';



const serviceclinic: React.FC = () => {
 const [{ data }, getServiceclinic,] = useAxios({
    url: `/api/serviceclinic`,
    method: "GET",
  });
      // const [title, settitle] = useState([]);
      // const [subtitle, setsubtitle] = useState([]);
      // const [catategory, catagory] = useState([]);
      useEffect(() => {
        // if (data?.services?.length) {
        //     console.log("33", data?.services[0])
            
        // }
        console.log(data)


    }, [data]);


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
            serviceclinic
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
                      <Form.Control type="text" placeholder="title" />
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>subtitle</Form.Label>
                      <Form.Control type="text" placeholder="subtitle" />
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>category</Form.Label>
                      <Form.Control type="text" placeholder="category" />
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
              <Button className="ms-2 btn" bsPrefix="icon">
                ยืนยัน
              </Button>
            </span>
          </Card.Footer>
        </Card>
      </div>
    </LayOut>
  );
}
export default serviceclinic;
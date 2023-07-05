import React, { useEffect, useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Button, Card, Col,Form, Image,  Row } from "react-bootstrap";
import EditModal from "@/components/modal/EditModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import { Contactclinic ,  } from '@prisma/client';



const Contactclinic: React.FC = () => {

  const [{ data }, contactclinic,] = useAxios({
    url: `/api/contactclinic`,
    method: "GET",
});

      const [title, settitle] = useState<string>("");
      const [subtitle, setsubtitle] = useState<string>("");
      const [detail1, setdetail1] = useState<string>("");
      const [detail2, setdetail2] = useState<string>("");
      const [picture1, setpicture1] = useState<string>("");
      const [picture2, setpicture2] = useState<string>("");

      useEffect(() => {
        if (data?.contactclinic?.length) {
            console.log("10", data?.contactclinic[0])
            
            settitle(data?.contactclinic?.title || "");
            console.log(title[0])

            setsubtitle(data?.contactclinic?.subtitle || "");
            console.log(subtitle[0])

            setdetail1(data?.contactclinic?.detail1 || "");
            console.log(detail1[0])

            setdetail2(data?.contactclinic?.detail2 || "");
            console.log(detail2[0])

            setpicture1(data?.contactclinic?.picture1 || "");
            console.log(picture1[0])

            setpicture2(data?.contactclinic?.picture2 || "");
            console.log(picture2)
        }
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
              Contact
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
                      <Form.Label>detail1</Form.Label>
                      <Form.Control type="text" placeholder="detail1" />
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>detail2</Form.Label>
                      <Form.Control type="text" placeholder="detail2" />
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
export default Contactclinic;
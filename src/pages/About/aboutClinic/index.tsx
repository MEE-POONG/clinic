import React, { useEffect, useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Button, Card, Col,Form, Image,  Row } from "react-bootstrap";
import { FaPen, FaSearch } from "react-icons/fa";
import Link from "next/link";
import useAxios from "axios-hooks";
import PageSelect from "@/components/PageSelect";
import { bankMap } from "@/test";
import PartnerViewMemberModal from "@/container/Partner/ViewModal";
import DeleteModal from "@/components/modal/DeleteModal";
import { AboutClinic } from "@prisma/client";
import PartnerAddPartnerModal from "@/container/Partner/AddPartnerModal";




const PartnerPage: React.FC = () => {

  const [title, setTitle] = useState<string>("");
  const [subtitel, setSubtitel] = useState<string>("");
  const [detail1, setdetail1] = useState<string>("");
  const [img, setimg] = useState<string>("");
  const [detail2, setdetail2] = useState<string>("");
  const [img2, setimg2] = useState<string>("");


  const [{ data: aboutClinicsData }, getAboutClinic,] = useAxios({
    url: `/api/Aboutclinic`,
    method: "GET",
  });

  const [{ loading: deleteMemberLoading, error: deleteMemberError }, executeMemberDelete,] = useAxios({}, { manual: true });

  const [filteredMembersData, setFilteredMembersData] = useState<AboutClinic[]>([]);




  useEffect(() => {
    if (aboutClinicsData && aboutClinicsData.length) {
      setTitle(aboutClinicsData[0]?.Title || "");
      console.log("setTitle : ", title);
      
      setSubtitel(aboutClinicsData[0]?.Subtitel || "");
      console.log("setSubtitel : ", subtitel);
     
      setdetail1(aboutClinicsData[0]?.detail1 || "");
      console.log("setdetail1 : ", detail1);
      
      setimg(aboutClinicsData[0]?.img || "");
      console.log("setimg : ", img);
      
      setdetail2(aboutClinicsData[0]?.detail2 || "");
      console.log("setdetail2 : ", detail2);
      
      setimg2(aboutClinicsData[0]?.img2 || "");
      console.log("setimg2 : ", img2);

  
}

      // if (data?.data) {
      //   setTitle(data?.data?.title || "");
      //   setSubtitel(data?.data?.subtitel || "");
      //   setdetail1(data?.data?.detail1 || "");
      //   setimg(data?.data?.img || "");
      //   setdetail2(data?.data?.detail2 || "");
      //   setimg2(data?.data?.img2 || "");
      //   console.log(title, subtitel, detail1, img, detail2, img2);

    
  }, [aboutClinicsData]);



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
              ติดต่อเรา
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
                <Image src="./images/logo-default.png" width={'200px'} className="m-3" alt="img1" />
                <div className="d-flex justify-content-center">
                  <div className="btn btn-primary btn-rounded">
                    <label className="form-label text-white m-1" htmlFor="customFile1">img1</label>
                    <input type="file" className="form-control d-none" id="customFile1" />
                  </div>
                </div>
                <Image src="./images/logo-default.png" width={'200px'} className="m-3" alt="img2" />
                <div className="d-flex justify-content-center">
                  <div className="btn btn-primary btn-rounded">
                    <label className="form-label text-white m-1" htmlFor="customFile1">img2</label>
                    <input type="file" className="form-control d-none" id="customFile1" />
                  </div>
                </div>
              </Col>
              <Col lg="9" >
                <Row>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Title</Form.Label>
                      <Form.Control type="text" placeholder="Title" />
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Subtitel</Form.Label>
                      <Form.Control type="text" placeholder="Subtitel" />
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>detail1 </Form.Label>
                      <Form.Control type="text" placeholder="detail1" />
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>detail2  </Form.Label>
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
export default PartnerPage;
import React, { useEffect, useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Button, Card, Col, Form, Image, Row } from "react-bootstrap";
import EditModal from "@/components/modal/EditModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import handler from "@/pages/api/aboutclinic";

const Contactclinic: React.FC = () => {

  const [id, setid] = useState<string>("");
  const [title, settitle] = useState<string>("");
  const [subtitle, setsubtitle] = useState<string>("");
  const [detail1, setdetail1] = useState<string>("");
  const [detail2, setdetail2] = useState<string>("");
  const [picture1, setpicture1] = useState<string>("");
  const [picture2, setpicture2] = useState<string>("");


  const [{ data: contactclinicData }, getContactclinic,] = useAxios({
    url: '/api/contactclinic',
    method: "GET",
  });

  const [{ loading: updateMemberLoading, error: updateMemberError }, putContactclinic,] = useAxios({
  }, { manual: true });

  useEffect(() => {

    setid(contactclinicData?.contactclinics?.id)
    settitle(contactclinicData?.contactclinics?.title)
    setsubtitle(contactclinicData?.contactclinics?.subtitle)
    setdetail1(contactclinicData?.contactclinics?.detail1)
    setdetail2(contactclinicData?.contactclinics?.detail2)
    setpicture1(contactclinicData?.contactclinics?.picture1)
    setpicture2(contactclinicData?.contactclinics?.picture2)

    /* console.log(contactclinicData?.contactclinics?.picture2);*/
  }, [contactclinicData]);



  useEffect(() => {

    console.log(contactclinicData?.contactclinics?.title);

  }, [title]);


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const splittedString = base64String.split(",")[1]; // ตัดส่วน "data:image/png;base64," ออก
        if (event.target.id === "customFile1") {
          setpicture1(splittedString);
        } else if (event.target.id === "customFile2") {
          setpicture2(splittedString);
        }
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
    const response1 = await putContactclinic({
      url: "/api/contactclinic/" + id,
      method: "PUT",
      data: {
        title,
        subtitle,
        detail1,
        detail2,
        picture1,

      },
    });
    if (response1 && response1.status === 200) {
      console.log("Image 1 uploaded successfully");
    } else {
      throw new Error("Failed to update image 1");
    }

    // อัพโหลดรูปภาพ img2
    const response2 = await putContactclinic({
      url: "/api/contactclinic/" + id,
      method: "PUT",
      data: {
        picture2,
      },
    });
    if (response2 && response2.status === 200) {
      console.log("Image 2 uploaded successfully");
    } else {
      throw new Error("Failed to update image 2");
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
              รวมเกม
            </h4>
            <span>
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
          </Card.Header>
          <Card.Body>
            <Row>
              <Col lg="3" className="text-center">
                <Image src={`data:image/png;base64, ${picture1}`} width="300px" height="200px" alt="Article Image" thumbnail />
                <div className="d-flex justify-content-center">
                  <div className="btn btn-primary btn-rounded">
                    <label className="form-label text-white m-1" htmlFor="customFile1">picture1</label>
                    <input type="file" className="form-control d-none" id="customFile1" defaultValue={picture1} onChange={handleFileUpload} />
                  </div>
                </div>
                <Image src={`data:image/png;base64, ${picture2}`} width="300px" height="200px" alt="Article Image" thumbnail />
                <div className="d-flex justify-content-center">
                  <div className="btn btn-primary btn-rounded">
                    <label className="form-label text-white m-1" htmlFor="customFile2">picture2</label>
                    <input type="file" className="form-control d-none" id="customFile2" defaultValue={picture2} onChange={handleFileUpload} />
                  </div>

                </div>
              </Col>
              <Col lg="9" >
                <Row>
                  

                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <button className=""><a href="/gamepond/gametogether/game1">เกมจับคู่ภาพ</a></button>
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <button className=""><a href="/gamepond/gametogether/game2">เกมง่ายๆ</a></button>
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <button className=""><a href="/gamepond/gametogether/game3">เกม สุ่มหัวก้อย</a></button>
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <button className=""><a href="/gamepond/gametogether/game4">เกม ไพ่</a></button>
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <button className=""><a href="/gamepond/gametogether/game5">เกม ทายลูกเต๋า</a></button>
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <button className=""><a href="/gamepond/gametogether/game6">เกม ไพ่</a></button>
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <button className=""><a href="/gamepond/gametogether/game7">เกม ไพ่</a></button>
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
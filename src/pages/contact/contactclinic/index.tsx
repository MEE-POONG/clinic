import React, { useEffect, useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Button, Card, Col,Form, Image,  Row } from "react-bootstrap";
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


        const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
          event.preventDefault();
          event.stopPropagation();

          const data = {
              title,
              subtitle,
              detail1,
              detail2,
            
           
            };
    
  
          // Execute the update
          const response = await putContactclinic({
              url: "/api/contactclinic/" + id,
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
              Contact
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
                <Image src="./images/logo-default.png" width={'200px'} className="m-3" alt="picture1" />
                <div className="d-flex justify-content-center">
                  <div className="btn btn-primary btn-rounded">
                    <label className="form-label text-white m-1" htmlFor="customFile1">picture1</label>
                    <input type="file" className="form-control d-none" id="customFile1" defaultValue={picture1}/>
                  </div>
                </div>
                <Image src="./images/logo-default.png" width={'200px'} className="m-3" alt="picture2" />
                <div className="d-flex justify-content-center">
                  <div className="btn btn-primary btn-rounded">
                    <label className="form-label text-white m-1" htmlFor="customFile1">picture2</label>
                    <input type="file" className="form-control d-none" id="customFile1" defaultValue={picture2} />
                  </div>
                </div>
              </Col>
              <Col lg="9" >
                <Row>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>title</Form.Label>
                      <Form.Control type="text" placeholder="title" defaultValue={title} onChange={e=>{settitle(e.target.value)}}/>
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>subtitle</Form.Label>
                      <Form.Control type="text" placeholder="subtitle" defaultValue={subtitle} onChange={e=>{setsubtitle(e.target.value)}}/>
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>detail1</Form.Label>
                      <Form.Control type="text" placeholder="detail1" defaultValue={detail1} onChange={e=>{setdetail1(e.target.value)}}/>
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>detail2</Form.Label>
                      <Form.Control type="text" placeholder="detail2" defaultValue={detail2} onChange={e=>{setdetail2(e.target.value)}}/>
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
import React, { useEffect, useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Button, Card, Col,Form, Image,  Row } from "react-bootstrap";
import EditModal from "@/components/modal/EditModal";
import useAxios from "axios-hooks";
import Link from "next/link";
import handler from "@/pages/api/aboutclinic";

const ContactSocialMedia: React.FC = () => {

  const [id, setid] = useState<string>(""); 
  const [facebook, setfacebook] = useState<string>("");
  const [line, setline] = useState<string>("");
  const [instagram, setinstagram] = useState<string>("");
  const [twitter, settwitter] = useState<string>("");
  const [youtube, setyoutube] = useState<string>("");
 
  

  const [{ data: contactsocialmediaData }, getcontactsocialmedia,] = useAxios({
    url: '/api/contactsocialmedia',
    method: "GET",
});
     
const [{ loading: updateMemberLoading, error: updateMemberError }, putcontactsocialmedia,] = useAxios({
}, { manual: true });

        useEffect(() => {
        
          setid(contactsocialmediaData?.contactsocialmedia?.id)
          setfacebook(contactsocialmediaData?.contactsocialmedia?.facebook)
          setline(contactsocialmediaData?.contactsocialmedia?.line)
          setinstagram(contactsocialmediaData?.contactsocialmedia?.instagram)
          settwitter(contactsocialmediaData?.contactsocialmedia?.twitter)
          setyoutube(contactsocialmediaData?.contactsocialmedia?.youtube)
         

         /* console.log(contactclinicData?.contactclinics?.picture2);*/
        }, [contactsocialmediaData]);



        useEffect(() => {
         
         console.log(contactsocialmediaData?.contactsocialmedia?.title);
     
        }, [facebook]);


        const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
          event.preventDefault();
          event.stopPropagation();

          const data = {
              facebook,
              line,
              instagram,
              twitter,
              youtube,
           
            };
    
  
          // Execute the update
          const response = await putcontactsocialmedia({
              url: "/api/contactsocialmedia/" + id,
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
              
              <Col lg="9" >
                <Row>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Facebook</Form.Label>
                      <Form.Control type="text" placeholder="Facebook" defaultValue={facebook} onChange={e=>{setfacebook(e.target.value)}}/>
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Line</Form.Label>
                      <Form.Control type="text" placeholder="Line" defaultValue={line} onChange={e=>{setline(e.target.value)}}/>
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Instagram</Form.Label>
                      <Form.Control type="text" placeholder="Instagram" defaultValue={instagram} onChange={e=>{setinstagram(e.target.value)}}/>
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Twitter</Form.Label>
                      <Form.Control type="text" placeholder="Twitter" defaultValue={twitter} onChange={e=>{settwitter(e.target.value)}}/>
                    </Form.Group>
                  </Col>
                  <Col lg="4">
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Youtube</Form.Label>
                      <Form.Control type="text" placeholder="Youtube" defaultValue={youtube} onChange={e=>{setyoutube(e.target.value)}}/>
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
export default ContactSocialMedia;
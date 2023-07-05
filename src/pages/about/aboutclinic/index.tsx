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
import { AboutClinic, AboutPersonal } from '@prisma/client';
import { subtle } from "crypto";


const PartnerPage: React.FC = () => {

    const [id, setId] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [subTitle, setSubtitle] = useState<string>("");
    const [detail1, setDetail1] = useState<string>("");
    const [img, setImg] = useState<string>("");
    const [detail2, setDetail2] = useState<string>("");
    const [img2, setImg2] = useState<string>("");


    const [{ data }, getAboutclinic,] = useAxios({
        url: `/api/aboutclinic`,
        method: "GET",
    });


    const [{ loading: updateMemberLoading, error: updateMemberError }, putAboutclinic,] = useAxios({
    }, { manual: true });


    useEffect(() => {
        //console.log("data :",data?.aboutClinics);
        setId(data?.aboutClinics?.id);
        setTitle(data?.aboutClinics?.title);
        setSubtitle(data?.aboutClinics?.subTitle);
        setDetail1(data?.aboutClinics?.detail1);
        setImg(data?.aboutClinics?.img);
        setDetail2(data?.aboutClinics?.detail2);
        setImg2(data?.aboutClinics?.img2);

    }, [data]);




    useEffect(() => {
        //console.log("data :",data?.aboutClinics);
        console.log(subTitle)


    }, [subTitle]);





    const handleSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        event.stopPropagation();
        //let missingFields = [];
        //if (!title) missingFields.push("title");
        //if (!subTitle) missingFields.push("subTitle");

        //console.log(missingFields);


        const data = {
            title,
            subTitle,
            detail1,
            detail2,
         
          };
  

        // Execute the update
        const response = await putAboutclinic({
            url: "/api/aboutclinic/" + id,
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
                                <Image src="./images/logo-default.png" width={'200px'} className="m-3" alt="img " />
                                <div className="d-flex justify-content-center">
                                    <div className="btn btn-primary btn-rounded">
                                        <label className="form-label text-white m-1" htmlFor="customFile1">img </label>
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
                                            <Form.Label>title</Form.Label>
                                            <Form.Control type="text" placeholder="title" defaultValue={title} onChange={e => { setTitle(e.target.value) }} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg="4">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>subTitle</Form.Label>
                                            <Form.Control type="text" placeholder="subTitle" defaultValue={subTitle} onChange={e => { setSubtitle(e.target.value) }} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg="4">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>detail1</Form.Label>
                                            <Form.Control type="text" placeholder="detail1" defaultValue={detail1} onChange={e => { setDetail1(e.target.value) }} />
                                        </Form.Group>
                                    </Col>
                                    <Col lg="4">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>detail2</Form.Label>
                                            <Form.Control type="text" placeholder="detail2" defaultValue={detail2} onChange={e => { setDetail2(e.target.value) }} />
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
export default PartnerPage;
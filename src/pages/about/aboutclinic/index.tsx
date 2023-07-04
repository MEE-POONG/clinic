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


const PartnerPage: React.FC = () => {

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


    useEffect(() => {
        if (data?.aboutClinics?.length) {
            console.log("33", data?.aboutClinics[0])
            
            setTitle(data?.aboutClinics?.title || "");
            console.log(title)

            setSubtitle(data?.aboutClinics?.subTitle || "");
            console.log(subTitle)

            setDetail1(data?.aboutClinics?.detail1 || "");
            console.log(detail1)

            setImg(data?.aboutClinics?.img || "");
            console.log(img)

            setDetail2(data?.aboutClinics?.detail2 || "");
            console.log(detail2)

            setImg2(data?.aboutClinics?.img2 || "");
            console.log(img2)
        }


    }, [data]);


    //useEffect(() => {
    // if (aboutclinicsData && aboutclinicsData.length > 0) {
    //   console.log(aboutclinicsData);
    //   console.log(aboutclinicsData.title);
    // }

    //     if(aboutclinicsData && aboutclinicsData.length)
    //     {
    //         console.log(aboutclinicsData[0])
    //         console.log("dsadsad")
    //     }
    //   }, [aboutclinicsData]);




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
                                            <Form.Control type="text" placeholder="title" />
                                        </Form.Group>
                                    </Col>
                                    <Col lg="4">
                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                            <Form.Label>subTitle</Form.Label>
                                            <Form.Control type="text" placeholder="subTitle" />
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
export default PartnerPage;
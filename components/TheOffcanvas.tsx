import React, { useState } from 'react';
import { Offcanvas, Button, Nav, Image, Dropdown, NavDropdown } from 'react-bootstrap';
import { FaBars, FaRegEnvelope, FaShoppingBag, FaTachometerAlt, FaUserEdit } from 'react-icons/fa';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ContactSocialMedia, AboutClinic } from '@prisma/client';

interface TheOffcanvasProps {
    show: boolean;
    onToggleShow: () => void;
}

const TheOffcanvas: React.FC<TheOffcanvasProps> = ({ show, onToggleShow }) => {
    const handleClose = () => onToggleShow();
    const { asPath } = useRouter();
    const [checkClickPath, setCheckClickPath] = useState<string>('/');
    useEffect(() => {
        setCheckClickPath(asPath);
    }, [asPath])
    const handlePath = (valPath: string): void => { checkClickPath === valPath ? setCheckClickPath('') : setCheckClickPath(valPath) };

    return (
        <>
            <Offcanvas show={show} onHide={handleClose} placement="start" backdrop={false} scroll={true} >
                <Offcanvas.Body className='ps-0 pe-2'>
                    <Link href="/" className={asPath === "/" ? "nav-link active" : "nav-link"}>
                        <i >
                            <FaTachometerAlt />
                        </i>
                        <span className="ms-2">Home</span>
                    </Link>
                    <div id="partner" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/partner')} className={asPath === "/partner" || asPath === "/partner/agent" || asPath === "/partner/member" || asPath === "/partner/member/add" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">Partner</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/partner" || checkClickPath === "/partner/agent" || checkClickPath === "/partner/member" || asPath === "/partner/member/add"} >
                            <Link href="/partner" className={asPath === "/partner" || asPath === "/partner/agent" ? "nav-link active" : "nav-link"}>
                                <span>Master</span>
                            </Link>
                            <Link href="/partner/member" className={asPath === "/partner/member" || asPath === "/partner/member/add" ? "nav-link active" : "nav-link"}>
                                <span>Member</span>
                            </Link>
                        </Dropdown.Menu>
                    </div>
                    <div id="bot-auto" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/bot')} className={asPath === "/bot" || asPath === "/bot/agent" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">Bot Auto</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/bot" || checkClickPath === "/bot/agent" || checkClickPath === "/bot/listname"} >
                            <Link href="/bot" className={asPath === "/bot" || asPath === "/bot/agent" ? "nav-link active" : "nav-link"}>
                                <span>ได้เสียลูกค้า</span>
                            </Link>
                            <Link href="/bot" className={asPath === "/bot" || asPath === "/bot/agent" ? "nav-link active" : "nav-link"}>
                                <span>ได้เสียเอเย่น</span>
                            </Link>
                            <Link href="/bot" className={asPath === "/bot" || asPath === "/bot/agent" ? "nav-link active" : "nav-link"}>
                                <span>ได้เสียมาสเตอร์</span>
                            </Link>
                        </Dropdown.Menu>
                    </div>
                    <div id="income" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/income')} className={asPath === "/income" || asPath === "/income/agent" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">income Auto</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/income" || checkClickPath === "/income/agent" || checkClickPath === "/income/listname"} >
                            <Link href="/income" className={asPath === "/income" || asPath === "/income/agent" ? "nav-link active" : "nav-link"}>
                                <span>ได้เสียลูกค้า</span>
                            </Link>
                            <Link href="/income" className={asPath === "/income" || asPath === "/income/agent" ? "nav-link active" : "nav-link"}>
                                <span>ได้เสียเอเย่น</span>
                            </Link>
                            <Link href="/income" className={asPath === "/income" || asPath === "/income/agent" ? "nav-link active" : "nav-link"}>
                                <span>ได้เสียมาสเตอร์</span>
                            </Link>
                        </Dropdown.Menu>
                    </div>
                    <div id="setting" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/setting')} className={asPath === "/setting" || asPath === "/setting/admin" || asPath === "/setting/admin/team" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">Setting</span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/setting" || checkClickPath === "/setting/admin" || checkClickPath === "/setting/admin/team"} >
                            <Link href="/setting" className={asPath === "/setting" ? "nav-link active" : "nav-link"}>
                                <span>ติดต่อเรา</span>
                            </Link>
                            <Link href="/setting/admin" className={asPath === "/setting/admin" || asPath === "/setting/admin/team" ? "nav-link active" : "nav-link"}>
                                <span>แอดมิน</span>
                            </Link>

                        </Dropdown.Menu>
                    </div>




                    <div id="about" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/about')} className={asPath === "/about" || asPath === "/about/aboutclinic" || asPath === "/about/aboutpersonal" || asPath === "/about/aboutpersonal/add" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">about</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/about" || checkClickPath === "/about/aboutclinic" || checkClickPath === "/about/aboutpersonal" || asPath === "/about/aboutpersonal/add"} >
                            <Link href="/about/aboutclinic" className={asPath === "/about" || asPath === "/about/aboutclinic" ? "nav-link active" : "nav-link"}>
                                <span>aboutclinic</span>
                            </Link>
                            <Link href="/about/aboutpersonal" className={asPath === "/about/aboutpersonal" || asPath === "/about/aboutpersonal/add" ? "nav-link active" : "nav-link"}>
                                <span>aboutpersonal</span>
                            </Link>
                        </Dropdown.Menu>
                    </div>





                    <div id="Contact" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/contact')} className={asPath === "/contact" || asPath === "/contact/contactclinic" || asPath === "/contact/ContactSocialMedia" || asPath === "/contact/ContactSocialMedia/add" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">Contact</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/contact" || checkClickPath === "/contact/contactclinic" || checkClickPath === "/contact/ContactSocialMedia" || asPath === "/contact/ContactSocialMedia/add"} >
                            <Link href="/contact/contactclinic" className={asPath === "/contact" || asPath === "/contact/contactclinic" ? "nav-link active" : "nav-link"}>
                                <span>ContactClinic</span>
                            </Link>
                            <Link href="/contact/ContactSocialMedia" className={asPath === "/contact/ContactSocialMedia" || asPath === "/contact/ContactSocialMedia/add" ? "nav-link active" : "nav-link"}>
                                <span>ContactSocialMedia</span>
                            </Link>
                        </Dropdown.Menu>
                    </div>

                    <div id="service" className='select-page'>
                        <Dropdown.Toggle onClick={() => handlePath('/service')} className={asPath === "/service" || asPath === "/service/serviceclinic" || asPath === "/service/subserviceclinnic" || asPath === "/service/subserviceclinnic/add" ? "nav-item nav-link active" : "nav-item nav-link"} id="dropdown-custom-components" >
                            <i >
                                <FaTachometerAlt />
                            </i>
                            <span className="ms-2">service</span>
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="bg-transparent border-0" show={checkClickPath === "/service" || checkClickPath === "/service/serviceclinic" || checkClickPath === "/service/Subserviceclinnic" || asPath === "/service/Subserviceclinnic/add"} >
                            <Link href="/service/serviceclinic" className={asPath === "/service" || asPath === "/service/serviceclinic" ? "nav-link active" : "nav-link"}>
                                <span>serviceclinic</span>
                            </Link>
                            <Link href="/service/subserviceclinnic" className={asPath === "/service/subserviceclinnic" || asPath === "/service/subserviceclinnic/add" ? "nav-link active" : "nav-link"}>
                                <span>Subserviceclinnic</span>
                            </Link>
                        </Dropdown.Menu>
                    </div>


                </Offcanvas.Body>
            </Offcanvas>

        </>
    );
};
const TheButtonOffcanvas: React.FC<TheOffcanvasProps> = ({ show, onToggleShow }) => {
    const handleShow = () => onToggleShow();
    return (
        <Button onClick={handleShow} bsPrefix={`slide-toggle-icon ${show ? 'active' : ''} me-auto`}>
            <FaBars />
        </Button>
    );
}
export { TheButtonOffcanvas };
export default TheOffcanvas;

import React, { useEffect, useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Badge, Card, Button,Image, Form, InputGroup, Table } from "react-bootstrap";
import { FaPen, FaSearch } from "react-icons/fa";
import Link from "next/link";
import useAxios from "axios-hooks";
import PageSelect from "@/components/PageSelect";
import { bankMap } from "@/test";
import AdminmasterViewAdminmasterModal from "@/container/Adminmaster/ViewAdminmasterModal";
import DeleteModal from "@/components/modal/DeleteModal";
import AdminmasterAddAdminmasterModal from "@/container/Adminmaster/AddAdminmaster";
import { Adminmaster } from '@prisma/client';

interface Params {
  page: number;
  pageSize: number;
  searchTerm: string;
  totalPages: number;
}
const Adminmaster: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchTerm: "",
    totalPages: 1,
  });

  const [{ data: AdminmasterData }, getadminmaster,] = useAxios({
    url: `/api/adminmaster?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchTerm}`,
    method: "GET",
  });

  const [{ loading: deleteadminmasterLoading, error: deleteadminmasterError }, executeadminmasterDelete,] = useAxios({}, { manual: true });

  const [filteredadminmasterData, setfilteredadminmasterData] = useState<Adminmaster[]>([]);



  useEffect(() => {
    setfilteredadminmasterData(AdminmasterData?.adminmaster ?? []);
    console.log(AdminmasterData);

  }, [AdminmasterData]);



  const deleteadminmaster = (id: string): Promise<any> => {
    return executeadminmasterDelete({
      url: "/api/adminmaster/" + id,
      method: "DELETE",
    }).then(() => {
      setfilteredadminmasterData(prevadminmasters => prevadminmasters.filter(adminmaster => adminmaster.id !== id));
    });
  };


  const handleChangePage = (page: number) => {
    setParams(prevParams => ({
      ...prevParams,
      page: page,
    }));
  };

  const handleChangePageSize = (size: number) => {
    setParams(prevParams => ({
      ...prevParams,
      page: 1,
      pageSize: size,
    }));
  };

  const handleChangeSearchTerm = (search: string) => {
    setParams(prevParams => ({
      ...prevParams,
      searchTerm: search,
    }));
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
      <div className='partner-page h-100'>
        <Card className="h-100">
          <Card.Header className="d-flex space-between">
            <h4 className="mb-0 py-1">
            Adminmaster
            </h4>
            <InputGroup className="w-auto" bsPrefix="input-icon">
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                onChange={e => handleChangeSearchTerm(e.target.value)}
                placeholder="ค้นหาโปรโมชั่น"
                aria-label="Fullname"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            {/* <AddListName /> */}
            <Link href="/promotion/addPromotion" className="ms-2 btn icon icofn-primary">
              เพิ่มโปรโมชั่น
            </Link>
          </Card.Header>
          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="no">No</th>
                  <th className="title">ยูเซอร์ แอดมิน</th>
                  <th className="subtitle">รหัสผ่าน แอดมิน</th>
                  <th>เพศ</th>
                  <th>เบอร์โทร</th>
                  <th>อีเมลล์</th>
                  <th>สังกัด</th>
                  <th>จัดการ</th>

                </tr>
              </thead>


              <tbody className="text-center">
                {filteredadminmasterData.map((adminmaster, index) => (
                  <tr key={adminmaster.id}>
                    <td>{index + 1}</td>
                    <td>{adminmaster.adminUsername}</td>
                    <td>{adminmaster.adminPassword}</td>
                    <td>{adminmaster.sex}</td>
                    <td>{adminmaster.tel}</td>
                    <td>{adminmaster.email}</td>
                    {/* <td>{adminmaster.User}</td> */}
                    {/* <td>{adminmaster.sex}</td> */}
                    {/* <td><Image src={`data:image/png;base64, ${adminmaster.img}`} alt="adminmaster imge" thumbnail /></td> */}

                    {/* <img src={promotion.img} alt="Promotion" /> */}
                    <td> 
                      <AdminmasterAddAdminmasterModal data={adminmaster} />
                      {/* <EditpromotionModal data={promotion} apiEdit={() => editpromotion(editList)} /> */}
                      <Link href={`/admin/editadminmaster/${adminmaster.id}`} className="mx-1 btn info icon icon-primary">
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Link>
                      <DeleteModal data={adminmaster} apiDelete={() => deleteadminmaster(adminmaster.id)} />
                    </td>




                  </tr>
                ))}


              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <PageSelect page={params.page} totalPages={AdminmasterData?.pagination?.total} onChangePage={handleChangePage} onChangePageSize={handleChangePageSize} />
          </Card.Footer>
        </Card>

      </div>
    </LayOut>
  );
}
export default Adminmaster;
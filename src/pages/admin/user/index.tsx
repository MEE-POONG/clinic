import React, { useEffect, useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Badge, Card, Button,Image, Form, InputGroup, Table } from "react-bootstrap";
import { FaPen, FaSearch } from "react-icons/fa";
import Link from "next/link";
import useAxios from "axios-hooks";
import PageSelect from "@/components/PageSelect";
import { bankMap } from "@/test";
// import userViewuserModal from "@/container/user/ViewuserModal";
import DeleteModal from "@/components/modal/DeleteModal";
import UserAddUserModal from "@/container/User/AddUser";
import { User as PrismaUser , Adminmaster as PrismaAdminmaster } from '@prisma/client';


interface User extends PrismaUser {
}

interface Adminmaster extends PrismaAdminmaster {
  User: User[];
}

interface Params {
  page: number;
  pageSize: number;
  searchTerm: string;
  totalPages: number;
}
const user: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchTerm: "",
    totalPages: 1,
  });

  const [{ data: userData }, getuser,] = useAxios({
    url: `/api/user?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchTerm}`,
    method: "GET",
  });
  

  const [{ loading: deleteuserLoading, error: deleteuserError }, executeuserDelete,] = useAxios({}, { manual: true });

  const [filtereduserData, setfiltereduserData] = useState<User>([]);



  useEffect(() => {
    setfiltereduserData(userData?.user ?? []);
    console.log(userData.Adminmaster);

  }, [userData]);



  const deleteuser = (id: string): Promise<any> => {
    return executeuserDelete({
      url: "/api/user/" + id,
      method: "DELETE",
    }).then(() => {
      setfiltereduserData(prevusers => prevusers.filter(user => user.id !== id));
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
            user
            </h4>
            <InputGroup className="w-auto" bsPrefix="input-icon">
              <InputGroup.Text id="basic-addon1">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                onChange={e => handleChangeSearchTerm(e.target.value)}
                placeholder="ค้นหายูเซอร์"
                aria-label="Fullname"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
            {/* <AddListName /> */}
            <Link href="/admin/user/adduser" className="ms-2 btn icon icofn-primary">
              เพิ่มยูเซอร์
            </Link>
          </Card.Header>
          <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
              <thead>
                <tr>
                  <th className="no">No</th>
                  <th className="fname">ชื่อ</th>
                  <th className="lname">นามสกุล</th>
                  <th className="nickname">ชื่อเล่น</th>
                  <th className="sex">เพศ</th>
                  <th className="username">ยูเซอร์</th>
                  <th className="password">รหัสผ่าน</th>
                  <th>อีเมลล์</th>
                  <th>ไลน์</th>
                  <th>เบอร์โทร</th>
                  <th>สังกัด</th>
                  <th>จัดการ</th>

                </tr>
              </thead>


              <tbody className="text-center">
                {filtereduserData.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.fname}</td>
                    <td>{user.lname}</td>
                    <td>{user.nickname}</td>
                    <td>{user.sex}</td>
                    <td>{user.username}</td>
                    <td>{user.password}</td>
                    <td>{user.email}</td>
                    <td>{user.line}</td>
                    <td>{user.tel}</td>
                    {/* <td>{user.}</td> */}
                 
                     <td> 
                      <UserAddUserModal data={user} />
                      {/* <EditpromotionModal data={promotion} apiEdit={() => editpromotion(editList)} />  */}
                      <Link href={`/admin/user/edituser/${user.id}`} className="mx-1 btn info icon icon-primary">
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Link>
                      <DeleteModal data={user} apiDelete={() => deleteuser(user.id)} />
                    </td> 




                  </tr>
                ))}


              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <PageSelect page={params.page} totalPages={userData?.pagination?.total} onChangePage={handleChangePage} onChangePageSize={handleChangePageSize} />
          </Card.Footer>
        </Card>

      </div>
    </LayOut>
  );
}
export default user;
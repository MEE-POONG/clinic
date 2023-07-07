import React, { useEffect, useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Badge, Card, Button,Image, Form, InputGroup, Table } from "react-bootstrap";
import { FaPen, FaSearch } from "react-icons/fa";
import Link from "next/link";
import useAxios from "axios-hooks";
import PageSelect from "@/components/PageSelect";
import { bankMap } from "@/test";
import DeleteModal from "@/components/modal/DeleteModal";
import PromotionAddPromotionModal from "@/container/Promotion/AddPromotion";
import { Promotion } from '@prisma/client';

interface Params {
  page: number;
  pageSize: number;
  searchTerm: string;
  totalPages: number;
}
const Promotion: React.FC = () => {
  const [params, setParams] = useState<Params>({
    page: 1,
    pageSize: 10,
    searchTerm: "",
    totalPages: 1,
  });

  const [{ data: PromotionData }, getpromotion,] = useAxios({
    url: `/api/promotion?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchTerm}`,
    method: "GET",
  });

  const [{ loading: deletepromotionLoading, error: deletepromotionError }, executepromotionDelete,] = useAxios({}, { manual: true });

  const [filteredpromotionsData, setFilteredpromotionsData] = useState<Promotion[]>([]);



  useEffect(() => {
    setFilteredpromotionsData(PromotionData?.data ?? []);
    console.log(PromotionData);

  }, [PromotionData]);



  const deletepromotion = (id: string): Promise<any> => {
    return executepromotionDelete({
      url: "/api/promotion/" + id,
      method: "DELETE",
    }).then(() => {
      setFilteredpromotionsData(prevpromotions => prevpromotions.filter(promotion => promotion.id !== id));
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
              Promotion
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
                  <th className="title">ชื่อโปรโมชั่น</th>
                  <th className="subtitle">คำอธิบายย่อย</th>
                  <th>รายละเอียด</th>
                  <th>รูปภาพ</th>
                  <th>จัดการ</th>
                  <th>จัดการ</th>
                </tr>
              </thead>


              <tbody className="text-center">
                {filteredpromotionsData.map((promotion, index) => (
                  <tr key={promotion.id}>
                    <td>{index + 1}</td>
                    <td>{promotion.title}</td>
                    <td>{promotion.subtitle}</td>
                    <td>{promotion.detail}</td>
                    <td><Image src={`data:image/png;base64, ${promotion.img}`} alt="Promotion imge" thumbnail /></td>

                    {/* <img src={promotion.img} alt="Promotion" /> */}
                    



                    <td> 
                      <PromotionAddPromotionModal data={promotion} />
                      {/* <EditMemberModal data={member} apiEdit={() => editMember(editList)} /> */}
                      <Link href={`/promotion/edit/${promotion.id}`} className="mx-1 btn info icon icon-primary">
                        <FaPen />
                        <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                      </Link>
                      <DeleteModal data={promotion} apiDelete={() => deletepromotion(promotion.id)} />
                    </td>

                  </tr>
                ))}


              </tbody>
            </Table>
          </Card.Body>
          <Card.Footer>
            <PageSelect page={params.page} totalPages={PromotionData?.pagination?.total} onChangePage={handleChangePage} onChangePageSize={handleChangePageSize} />
          </Card.Footer>
        </Card>

      </div>
    </LayOut>
  );
}
export default Promotion;
import React, { useEffect, useState } from "react";
import Head from 'next/head';
import LayOut from "@/components/LayOut";
import { Badge, Card, Form, InputGroup, Table } from "react-bootstrap";
import { FaPen, FaSearch } from "react-icons/fa";
import Link from "next/link";
import useAxios from "axios-hooks";
import PageSelect from "@/components/PageSelect";
import { bankMap } from "@/test";
import DeleteModal from "@/components/modal/DeleteModal";
import { Promotion } from "@prisma/client";
/*import promotion from "../api/promotion";*/

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

     
        const [{ data: promotionData }, getpromotion,] = useAxios({
            url: '/api/promotion?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchTerm},',
            method: "GET",
        });   
        

    const [id, setid] = useState<string>("");
    const [title, settitle] = useState<string>("");
    const [subtitle, setsubtitle] = useState<string>("");
    const [detail, setdetail] = useState<string>("");
    const [img, setimg] = useState<string>("");

     

    const [{ loading: deletearticleLoading, error: deletearticleError }, executearticleDelete,] = useAxios({}, { manual: true });

    const [filteredpromotionData, setfilteredpromotionData] = useState<Promotion[]>([]);

   /* useEffect(() => {
        setid(promotionData?.promotion?.id)
        settitle(promotionData?.promotion?.title)
        setsubtitle(promotionData?.promotion?.subtitle)
        setdetail(promotionData?.promotion?.detail)

        console.log(promotionData?.promotion?.title);
        setfilteredpromotionData(promotionData?.promotion ?? []);
        console.log(title);
    
       }, [promotionData]);*/

       useEffect(() => {
        setfilteredpromotionData(promotionData?.promotion ?? []);
        console.log(promotionData);
    
      }, [promotionData]);


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
    
                {/* <AddListName /> */}
    
              </Card.Header>
              <Card.Body className="p-0">
              <Table striped bordered hover className="scroll">
      <thead>
        <tr>
          <th className=" ml-[20px]">id</th>
          <th>title</th>
          <th>subtitle</th>
          <th>detail</th>
          <th>img</th>
          <th>edit</th>
        </tr>
      </thead>
      <tbody>
        {filteredpromotionData.map((promotion,index) => (
          <tr key={promotion.id}>
            <tr>{index+1}</tr>
            <td>{promotion.title}</td>
            <td>{promotion.subtitle}</td>
            <td>{promotion.detail}</td>
            <td>{promotion.img}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    
              </Card.Body>
              <Card.Footer>
            <PageSelect page={params.page} totalPages={promotionData?.pagination?.total} onChangePage={handleChangePage} onChangePageSize={handleChangePageSize} />
          </Card.Footer>
            </Card>
    
          </div>
        </LayOut>
      );
    
}
export default Promotion;
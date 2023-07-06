  import React, { useEffect, useState } from "react";
  import Head from 'next/head';
  import LayOut from "@/components/LayOut";
  import ModalOffOn from '@/container/Setting/ModalOffOn';
  import {Alert, Button, Card, Image, Form, InputGroup, Tooltip, OverlayTrigger, Table } from "react-bootstrap";
  import { FaKey, FaPen, FaPowerOff, FaRegEye, FaSearch, FaToolbox, FaTrashAlt} from "react-icons/fa";
  import Link from "next/link";
  import useAxios from "axios-hooks";
  import PageSelect from "@/components/PageSelect";
  import { bankMap } from "@/test";
  import PartnerViewarticleModal from "@/container/Partner/ViewModal";
  import DeleteModal from "@/components/modal/DeleteModal";
  import { Article } from "@prisma/client";
  import PartnerAddPartnerModal from "@/container/Partner/AddPartnerModal";
  import ArticleAdd from "@/container/article/ArticleAdd";
  import ArticleEdit from "@/container/article/ArticleEdit";
  

  interface Params {
    page: number;
    pageSize: number;
    searchTerm: string;
    totalPages: number;
  }
  const articlePage: React.FC = () => {
    const [params, setParams] = useState<Params>({
      page: 1,
      pageSize: 10,
      searchTerm: "",
      totalPages: 1,
    });
    const [{ data: articlesData }, getarticle,] = useAxios({
      url: `/api/article?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchTerm}`,
      method: "GET",
    });

     const [{ loading: deletearticleLoading, error: deletearticleError }, executearticleDelete,] = useAxios({}, { manual: true });

    const [filteredarticlesData, setFilteredarticlesData] = useState<Article[]>([]);

    useEffect(() => {
      setFilteredarticlesData(articlesData?.articles ?? []);
      console.log(articlesData);

    }, [articlesData]);

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


    const deleteArticle = (id: string): Promise<any> => {
      return executearticleDelete({
        url: "/api/article/" + id, 
        method: "DELETE",
      }).then(() => {
        setFilteredarticlesData(prevArticle => prevArticle.filter(article => article.id !== id));
      });
    };



    // const handleDeleteArticle = async (articleId: string) => {
    //   try {
    //     // ส่งคำขอ DELETE ไปยัง API
    //     const response = await executearticleDelete({
    //       url: `/api/article/${articleId}`,
    //       method: "DELETE",
    //     });
    //     if (response && response.status === 200) {
    //       console.log("Delete successful");
    //       // ทำการรีเฟรชหน้าหลังจากลบข้อมูลสำเร็จ (หรือจะอัปเดตข้อมูลที่แสดงอีกครั้ง)
    //       window.location.reload();
    //     } else {
    //       console.error("Delete failed");
    //     }
    //   } catch (error) {
    //     console.error("Delete failed", error);
    //   }
    // };


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
                Partner - article
              </h4>
              <ArticleAdd/>
                              
              {/* <AddListName /> */}
              
            </Card.Header>
            <Card.Body className="p-0">
            <Table striped bordered hover className="scroll">
    <thead>
      <tr>
        <th>id</th>
        <th>title</th>
        <th>img</th>
        <th>detail</th>
        <th>createdAt</th>
      </tr>
    </thead>
    <tbody className="text-center">
      {filteredarticlesData.map((article,index) => (
        <tr key={article.id}>
          <td>{index+1}</td>
          <td>{article.title}</td>
          <td><Image src={`data:image/png;base64, ${article.img}`} alt="Article Image" thumbnail /></td>
          <td>{article.detail}</td>
          <td>{article.createdAt}</td>
          <td>
          <Link href={`/article/edit/${article.id}`} className="mx-1 btn info icon icon-primary">
                          <FaPen />
                          <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                        </Link>
                        
                        <DeleteModal data={article} apiDelete={() => deleteArticle(article.id)} />
                      </td>
        </tr>
      ))}
    </tbody>
  </Table>

            </Card.Body>
            <Card.Footer>
              <PageSelect page={params.page} totalPages={articlesData?.pagination?.total} onChangePage={handleChangePage} onChangePageSize={handleChangePageSize} />
            </Card.Footer>
          </Card>
          
        </div>
      </LayOut>
    );
  }
  export default articlePage;
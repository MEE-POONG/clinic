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
import { Review } from '@prisma/client';
import ReviewAddReviewModal from "@/container/Review/AddReview";
/*import review from "../api/review";*/

interface Params {
    page: number;
    pageSize: number;
    searchTerm: string;
    totalPages: number;
  }

const Review: React.FC = () => {
    const [params, setParams] = useState<Params>({
        page: 1,
        pageSize: 10,
        searchTerm: "",
        totalPages: 1,
      });
// ใช้ซิงเกิลแบบนี้ไม่ได้
// `/api/partner?page=${params.page}&pageSize=${params.pageSize}`
        const [{ data: reviewData }, getReview,] = useAxios({
            url: "/api/review?page=${params.page}&pageSize=${params.pageSize}&searchTerm=${params.searchTerm}"  ,
            method: "GET",
        });   
        

    const [id, setid] = useState<string>("");
    const [title, settitle] = useState<string>("");
    const [title2, settitle2] = useState<string>("");
    const [category, setcategory] = useState<string>("");
    const [subTitle, setsubTitle] = useState<string>("");
    const [reviewDetail, setreviewDetail] = useState<string>("");
    const [reviewerName, setreviewerName] = useState<string>("");
     

    const [{ loading: deletereviewLoading, error: deletereviewError }, executereviewDelete,] = useAxios({}, { manual: true });

    const [filteredreviewData, setfilteredreviewData] = useState<Review[]>([]);

   useEffect(() => {
        setid(reviewData?.reviewls?.id)
        settitle(reviewData?.reviewls?.title)
        settitle2(reviewData?.reviewls?.title2)
        setcategory(reviewData?.reviewls?.category)
        setsubTitle(reviewData?.reviewls?.Title)
        setreviewDetail(reviewData?.reviewls?.reviewDetail)
        setreviewerName(reviewData?.reviewls?.reviewerName)



        console.log(reviewData?.reviewls?.title);
        setfilteredreviewData(reviewData?.reviewls ?? []);
        console.log(title);
    
       }, [reviewData]);

       useEffect(() => {
        setfilteredreviewData(reviewData?.reviewls?? []);
        console.log(reviewData);
    
      }, [reviewData]);

      const deletereview = (id: string): Promise<any> => {
        return executereviewDelete({
          url: "/api/review/" + id,
          method: "DELETE",
        }).then(() => {
            setfilteredreviewData(prevreviews => prevreviews.filter(review => review.id !== id));
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
                Review
                </h4>
    
                {/* <AddListName /> */}
    
              </Card.Header>
              <Card.Body className="p-0">
              <Table striped bordered hover className="scroll">
      <thead>
        <tr>
          <th className=" text-center">id</th>
          <th>title</th>
          <th>title2</th>
          <th>category</th>
          <th>subTitle</th>
          <th>reviewDetail</th>
          <th>reviewerName</th>
          <th>edit</th>

        </tr>
      </thead>
      <tbody className="text-center" >
        {filteredreviewData.map((review,index) => (
          <tr key={review.id}>
            <tr>{index+1}</tr>
            <td>{review.title}</td>
            <td>{review.title2}</td>
            <td>{review.category}</td>
            <td>{review.subTitle}</td>
            <td>{review.reviewDetail}</td>
            <td>{review.reviewerName}</td>

            <td>

                        <ReviewAddReviewModal data={review} />
                        {/* <EditMemberModal data={member} apiEdit={() => editMember(editList)} /> */}
                        <Link href={`/review/edit/${review.id}`} className="mx-1 btn info icon icon-primary">
                          <FaPen />
                          <span className="h-tooltiptext">แก้ไขข้อมูล</span>
                        </Link>
                        <DeleteModal data={review} apiDelete={() => deletereview(review.id)} />
                      </td>

            
            
          </tr>
        ))}
      </tbody>
    </Table>
    
              </Card.Body>
              <Card.Footer>
            <PageSelect page={params.page} totalPages={reviewData?.pagination?.total} onChangePage={handleChangePage} onChangePageSize={handleChangePageSize} />
          </Card.Footer>
            </Card>
    
          </div>
        </LayOut>
      );
    
}
export default Review;
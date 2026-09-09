"use client"
import SchoolFeesTable from "./school-fees-table"
import { useQueryClient , useQuery } from "@tanstack/react-query";
import { getSchoolFeesDetails } from "@/api/schoolfees";

const PaymentPage = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["schoolfeesparent"],
    queryFn: getSchoolFeesDetails,
  });

  if(error){
    return(
      <>
      Error: {error.message}
      </>
    )
  }

  console.log("Page "+ data)
  return (
    <div className="min-h-dvh p-3">
      PaymentPage
      {data && (<SchoolFeesTable data={data}></SchoolFeesTable>)
     }
    </div>
  )
}

export default PaymentPage

import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "@/components/meetups/MeetupList.js";

function HomePage(props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="브라우저 밋업"></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
}

//요청이 들어올 때마다 실행해서 페이지를 업데이트한다.
// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// 페이지를 바로 렌더링 하는게 아닌 반환된 JSX 스냅샷을 HTML 콘텐츠로 사용한다.
// 데이터를 받아드릴 때까지 기다린 후 이 컴포넌트 함수에서 사용할 props를 반환한다.
// 사전 렌더링으로 데이터 가져오기
export async function getStaticProps() {
  //이 안에 다른 번들이 import 된다면 그것은 서버에만 작동한다 클라이언트에 작동하는게 아니라.
  //항상 객체를 반환한다.
  const client = await MongoClient.connect("mongodb+srv://seungdu:dltmdwns52@cluster0.uzksuzz.mongodb.net/?retryWrites=true&w=majority");
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  fetch("/api/meetups");
  return {
    props: {
      meetups: meetups.map((meetups) => ({
        title: meetups.title,
        address: meetups.address,
        image: meetups.image,
        id: meetups._id.toString(),
      })),
    },
    //서버에서 데이터가 들어오면 몇 초마다 페이지를 다시 생성하는지
    revalidate: 10,
  };
}

export default HomePage;

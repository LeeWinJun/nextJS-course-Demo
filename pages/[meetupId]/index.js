import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "@/components/meetups/MeetupDetail.js";
import Head from "next/head";

function MeetupDetails(props) {
  return (
    <>
      <Head>
        {/* 동적인 값이 필요한 헤더에는 이런 식으로 변수를 넣어서 작성하자. */}
        <title>{props.meetupData.title}</title>
        <meta name="description" content={props.meetupData.description}></meta>
      </Head>
      <MeetupDetail image={props.meetupData.image} title={props.meetupData.title} address={props.meetupData.address} description={props.meetupData.description} />
    </>
  );
}

//
export async function getStaticPaths() {
  //몽고DB의 데이터에서 데이터 값 가져오기
  const client = await MongoClient.connect("mongodb+srv://seungdu:dltmdwns52@cluster0.uzksuzz.mongodb.net/?retryWrites=true&w=majority");
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();
  return {
    fallback: false,
    paths: meetups.map((meetups) => ({
      //이런 식으로 코드를 적으면 몽고DB에서 자동으로 생성된 id의 값을 얻는다
      params: { meetupId: meetups._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect("mongodb+srv://seungdu:dltmdwns52@cluster0.uzksuzz.mongodb.net/?retryWrites=true&w=majority");
  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  //아이디의 경우 글자가 막 있는 이상한 객체라서 ObjectId로 감싸줘야 찾을 수 있다.
  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetails;

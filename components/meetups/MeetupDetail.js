import classes from './MeetupDetail.module.css';

function MeetupDetail(props) {
  return (
    <section className={classes.detail}>
      <img src={props.image} alt={props.title}></img>
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
}


export async function getStaticProps() {
  return {
    props: {
      meetupData: {
        image: "https://img.sbs.co.kr/newimg/news/20230319/201763192_500.jpg",
        id: 'm1'
      }
    }
  }
}


export default MeetupDetail;
import { useRouter } from "next/router.js";
import NewMeetupForm from "../../components/meetups/NewMeetupForm.js";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredmeetupdata) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredmeetupdata),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    console.log(data);

    router.push('/');
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}
export default NewMeetupPage;

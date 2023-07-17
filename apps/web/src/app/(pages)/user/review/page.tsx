import {getServerSession} from "next-auth";
import {options} from "../../../api/auth/[...nextauth]/options";
import {redirect} from "next/navigation";

export default async function Assessment() {
    const data = await getServerSession(options);

    if (!data) {
        redirect("/");
    }

    return (
      <div>การประเมิน</div>
    );
}

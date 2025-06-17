import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import CompanionList from "@/components/ui/CompanionList";
import { getUserCompanion, getUserSession } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server"
import Image from "next/image";
import { redirect } from "next/navigation";

const MyJourneyPage = async () => {
    const user = await currentUser()

    if (!user) redirect('/sign-in');

    const compnaion = await getUserCompanion(user.id);
    const sessionHistory = await getUserSession(user.id);

    return (
        <main className="min-lg:w-3/4">
            <section className="flex justify-between gap-4 max-sm:flex-col items-center">
                <div className="flex gap-4 items-center">
                    <Image src={user.imageUrl} alt={user.firstName!} width={110} height={110} />
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
                        <p className="text-sm text-muted-foreground">{user.emailAddresses[0].emailAddress}</p>
                    </div>
                </div>
                <div className="flex gap-4">
                    <div className="border border-black rounded-md p-3 gap-2 flex flex-col h-fit shadow-lg">
                        <div className="flex gap-2 item-center">
                             <p className="text-2xl font-bold">{sessionHistory.length}</p>
                             <Image src="/icons/check.svg" alt="checkmamrk" width={22} height={22}/>
                        </div>
                        <div>Lessons Completed</div>
                    </div>
                     <div className="border border-black rounded-md p-3 gap-2 flex flex-col h-fit shadow-lg">
                        <div className="flex gap-2 item-center ">
                             <p className="text-2xl font-bold">{compnaion.length}</p>
                             <Image src="/icons/cap.svg" alt="checkmamrk" width={22} height={22}/>
                        </div>
                        <div>Companions Created</div>
                    </div>
                </div>
            </section>

            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Recent Sessions</AccordionTrigger>
                    <AccordionContent>
                        <CompanionList title="Recent Sessions" companions={sessionHistory} />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-1">
                    <AccordionTrigger>My Companions</AccordionTrigger>
                    <AccordionContent>
                        <CompanionList title="My Companions" companions={compnaion} />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </main>
    )
}

export default MyJourneyPage


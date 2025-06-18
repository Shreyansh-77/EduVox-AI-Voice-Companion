import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { subjects } from "@/constants";
import { cn, getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { boolean } from "zod/v4-mini";

interface CompanionListProps {
    title: string;
    companions: Companion[];
    className?: string;
}

const CompanionList = ({ title, companions, className }: CompanionListProps) => {
    return (
        <article className={cn(`companion-list`, className)}>
            <h2 className="text-3xl font-bold">{title}</h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg w-2/3">Lessons</TableHead>
                        <TableHead className="text-lg">Subject</TableHead>
                        <TableHead className="text-lg text-right">duration</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {companions.map(({ id, subject, name, topic, duration }) => (
                        <TableRow key={id}>
                            <TableCell>
                                <Link href={`/companions/${id}`}>
                                    <div className="flex items-center gap-2">
                                        <div className="size-[60px] flex items-center justify-center rounded-lg max-md:hidden" style={{ backgroundColor: getSubjectColor(subject) }}>
                                            <Image
                                                src={`/icons/${subject}.svg`}
                                                alt={subject}
                                                width={35}
                                                height={35}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <p className="text-bold taxt-2xl">
                                                {name}
                                            </p>
                                            <p className="text-lg">
                                                {topic}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </TableCell>
                            <TableCell>
                                <div className="subject-badge w-fit max-md:hidden">
                                    {subject}
                                </div>
                                <div className="flex items-center justify-center rounded-lg w-fit p-2 md:hidden" style={{ backgroundColor: getSubjectColor(subject) }}>
                                    <Image
                                        src={`/icons/${subject}.svg`}
                                        alt={subject}
                                        width={20}
                                        height={20}
                                    />
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 w-full justify-end">
                                    <p className="text-xl">
                                        {duration} {' '}
                                        <span className="max-md:hidden">mins</span>
                                    </p>
                                    <Image
                                        src="/icons/clock.svg"
                                        alt=""
                                        width={14}
                                        height={14}
                                        className="md:hidden"
                                    />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </article>
    )
}

export default CompanionList
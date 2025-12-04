import { useState } from "react";
import { Card, CardBody, Chip, Tabs, Tab } from "@heroui/react";
import { AGENDA } from "../data";

export default function Schedule() {
    const [selectedTab, setSelectedTab] = useState("pre-devfest");

    const renderScheduleDay = (day: typeof AGENDA.schedule[0]) => (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <h3 className="text-3xl font-black uppercase bg-black text-white px-4 py-2 transform -rotate-2 shadow-neo">{day.day}</h3>
                <Chip className="bg-white border-2 border-black font-bold rounded-none shadow-neo-sm" variant="flat">{day.date}</Chip>
            </div>

            <div className="space-y-6">
                {day.sessions.map((session, sessionIndex) => (
                    <Card key={sessionIndex} className="w-full bg-white border-4 border-black rounded-none shadow-neo hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-200">
                        <CardBody className="flex flex-col md:flex-row gap-6 p-6">
                            <div className="md:w-48 flex-shrink-0 border-b-4 md:border-b-0 md:border-r-4 border-black pb-4 md:pb-0 md:pr-6 flex flex-col justify-center">
                                <p className="font-mono text-xl font-black">{session.time}</p>
                                {"track" in session && (
                                    <Chip size="sm" className="mt-2 bg-devfest-green text-white border-2 border-black rounded-none font-bold">
                                        {(session as any).track}
                                    </Chip>
                                )}
                            </div>
                            <div className="flex-grow flex flex-col justify-center">
                                <h4 className="text-2xl font-black uppercase mb-2 leading-tight">{session.title}</h4>
                                <p className="text-devfest-blue font-bold text-lg">{session.speaker}</p>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );

    return (
        <section id="schedule" className="py-20 bg-devfest-yellow border-b-4 border-black dark:border-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-black mb-4 uppercase text-black">Event Schedule</h2>
                    <p className="text-black font-bold text-xl max-w-2xl mx-auto bg-white p-4 border-4 border-black shadow-neo">
                        Two days of inspiring talks, hands-on workshops, and networking opportunities.
                    </p>
                </div>

                <Tabs
                    selectedKey={selectedTab}
                    onSelectionChange={(key) => setSelectedTab(key as string)}
                    classNames={{
                        tabList: "bg-white border-4 border-black shadow-neo rounded-none p-0 gap-0 w-full md:w-fit mx-auto flex-wrap md:flex-nowrap",
                        tab: "rounded-none font-black uppercase px-3 md:px-6 py-3 md:py-4 border-r-4 border-black last:border-r-0 data-[selected=true]:bg-devfest-blue data-[selected=true]:text-white text-xs md:text-base flex-1 md:flex-initial",
                        cursor: "rounded-none bg-devfest-blue",
                        panel: "pt-8"
                    }}
                    aria-label="Event Days"
                    size="lg"
                    variant="underlined"
                >
                    <Tab key="pre-devfest" title="Pre-DevFest">
                        {renderScheduleDay(AGENDA.schedule[0])}
                    </Tab>
                    <Tab key="day1" title="Day 1 Workshops">
                        {renderScheduleDay(AGENDA.schedule[1])}
                    </Tab>
                    <Tab key="day2" title="Day 2 Conference">
                        {renderScheduleDay(AGENDA.schedule[2])}
                    </Tab>
                </Tabs>
            </div>
        </section>
    );
}

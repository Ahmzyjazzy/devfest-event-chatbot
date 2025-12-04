import { useState } from "react";
import { Card, CardBody, CardFooter, Image, Tabs, Tab } from "@heroui/react";
import { SPEAKERS } from "../data";

export default function Speakers() {
    const [selectedTab, setSelectedTab] = useState("pre-devfest");

    // Categorize speakers by track
    const preDevFestSpeakers = SPEAKERS.speakers.filter(s => s.track === "Pre-DevFest Series");
    const day1Speakers = SPEAKERS.speakers.filter(s => s.track === "Day 1 - Workshop");
    const day2Speakers = SPEAKERS.speakers.filter(s => s.track === "Day 2 - Main Conference");

    const renderSpeakers = (speakers: typeof SPEAKERS.speakers) => (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {speakers.map((speaker, index) => (
                <Card key={index} className="border-4 border-black bg-white rounded-none shadow-neo hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-none transition-all duration-200">
                    <CardBody className="p-0 overflow-hidden rounded-none border-b-4 border-black">
                        <Image
                            alt={speaker.name}
                            className="w-full object-cover aspect-[3/4] rounded-none grayscale hover:grayscale-0 transition-all duration-300"
                            src={speaker.image_url}
                            width="100%"
                        />
                    </CardBody>
                    <CardFooter className="flex-col items-start px-4 py-4 bg-white">
                        <h3 className="font-black text-xl uppercase">{speaker.name}</h3>
                        <p className="text-sm text-devfest-blue font-bold uppercase mt-1">{speaker.role}</p>
                        <p className="text-xs text-black font-medium mt-2 border-t-2 border-black pt-2 w-full">{speaker.organization}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );

    return (
        <section id="speakers" className="py-20 bg-devfest-blue border-b-4 border-black dark:border-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-black mb-4 uppercase text-white text-stroke-black">World-Class Speakers</h2>
                    <p className="text-black font-bold text-xl max-w-2xl mx-auto bg-white p-4 border-4 border-black shadow-neo">
                        Learn from industry experts, Google Developer Experts, and thought leaders shaping the future of technology.
                    </p>
                </div>

                <Tabs
                    selectedKey={selectedTab}
                    onSelectionChange={(key) => setSelectedTab(key as string)}
                    classNames={{
                        tabList: "bg-white border-4 border-black shadow-neo rounded-none p-0 gap-0 w-full md:w-fit mx-auto justify-center flex-wrap md:flex-nowrap",
                        tab: "rounded-none font-black uppercase px-3 md:px-6 py-3 md:py-4 border-r-4 border-black last:border-r-0 data-[selected=true]:bg-devfest-yellow data-[selected=true]:text-black text-xs md:text-base flex-1 md:flex-initial",
                        cursor: "rounded-none bg-devfest-yellow",
                        panel: "pt-8"
                    }}
                    aria-label="Speaker Categories"
                    size="lg"
                    variant="underlined"
                >
                    <Tab key="pre-devfest" title="Pre-DevFest">
                        {renderSpeakers(preDevFestSpeakers)}
                    </Tab>
                    <Tab key="day1" title="Day 1 Workshop">
                        {renderSpeakers(day1Speakers)}
                    </Tab>
                    <Tab key="day2" title="Day 2 Conference">
                        {renderSpeakers(day2Speakers)}
                    </Tab>
                </Tabs>
            </div>
        </section>
    );
}
